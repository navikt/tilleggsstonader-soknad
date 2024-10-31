import React, { useState } from 'react';

import { Heading, Label } from '@navikt/ds-react';

import { AnnenUtdanning } from './AnnenUtdanning';
import { HarFunksjonsnedsettelse } from './HarFunksjonsnedsettelse';
import { LesMerHvilkenAktivitet } from './LesMerHvilkenAktivitet';
import { finnDokumentasjonsbehov } from './læremidlerDokumentUtils';
import { MottarUtstyrsstipend } from './MottarUtstyrsstipend';
import {
    feilAnnenUtdanning,
    feilHarFunksjonsnedsettelse,
    feilMottarUtstyrsstipend,
    feilValgtAktivitet,
} from './validering';
import ArbeidsrettedeAktiviteter from '../../../components/Aktivitet/ArbeidsrettedeAktiviteter';
import {
    skalTaStillingTilAnnenAktivitet,
    skalTaStillingTilRegisterAktiviteter,
} from '../../../components/Aktivitet/registerAktivitetUtil';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { usePerson } from '../../../context/PersonContext';
import { useRegisterAktiviteter } from '../../../context/RegisterAktiviteterContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';
import { AnnenUtdanningType } from '../../typer/søknad';

const Utdanning = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { utdanning, settUtdanning, settDokumentasjonsbehov } = useLæremidlerSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const { registerAktiviteter } = useRegisterAktiviteter();

    const [valgteAktiviteter, settValgteAktiviteter] = useState<
        EnumFlereValgFelt<string> | undefined
    >(utdanning ? utdanning.aktiviteter : undefined);

    const [annenUtdanning, settAnnenUtdanning] = useState<EnumFelt<AnnenUtdanningType> | undefined>(
        utdanning ? utdanning.annenUtdanning : undefined
    );
    const [mottarUtstyrsstipend, settMottarUtstyrsstipend] = useState<EnumFelt<JaNei> | undefined>(
        utdanning ? utdanning.mottarUtstyrsstipend : undefined
    );
    const [harFunksjonsnedsettelse, settHarFunksjonsnedsettelse] = useState<
        EnumFelt<JaNei> | undefined
    >(utdanning ? utdanning.harFunksjonsnedsettelse : undefined);

    const oppdaterUtdanningISøknad = () => {
        settUtdanning({
            aktiviteter: valgteAktiviteter,
            annenUtdanning: annenUtdanning,
            mottarUtstyrsstipend: mottarUtstyrsstipend,
            harFunksjonsnedsettelse: harFunksjonsnedsettelse,
        });
        settDokumentasjonsbehov(finnDokumentasjonsbehov(harFunksjonsnedsettelse));
    };

    const oppdaterAnnenAktivitet = (verdi: EnumFelt<AnnenUtdanningType>) => {
        settAnnenUtdanning(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            annenAktivitet: undefined,
        }));
    };

    const oppdaterMottarUtstyrsstipend = (verdi: EnumFelt<JaNei>) => {
        settMottarUtstyrsstipend(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            mottarUtstyrsstipend: undefined,
        }));
    };

    const oppdaterHarFunksjonsnedsettelse = (verdi: EnumFelt<JaNei>) => {
        settHarFunksjonsnedsettelse(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            harFunksjonsnedsettelse: undefined,
        }));
    };

    const nullstillAnnenAktivitet = (valgteAktiviteter: EnumFlereValgFelt<string>) => {
        if (!skalTaStillingTilAnnenAktivitet(valgteAktiviteter)) {
            settAnnenUtdanning(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                annenUtdanning: undefined,
            }));
        }
    };

    const oppdaterValgteAktiviteter = (nyeValgteAktiviteter: EnumFlereValgFelt<string>) => {
        settValgteAktiviteter(nyeValgteAktiviteter);
        if (nyeValgteAktiviteter.verdier.length > 0) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                valgteAktiviteter: undefined,
            }));
        }
        nullstillAnnenAktivitet(nyeValgteAktiviteter);
    };

    if (!registerAktiviteter) {
        // ønsker ikke å vise siden før man har hentet aktivteter fra backend
        return null;
    }

    const skalViseArbeidsrettedeAktiviteter =
        skalTaStillingTilRegisterAktiviteter(registerAktiviteter);
    const skalViseAnnenAktivitet =
        !skalViseArbeidsrettedeAktiviteter || skalTaStillingTilAnnenAktivitet(valgteAktiviteter);
    const skalViseMottarUtstyrsstipend = person.alder < 21;

    const kanFortsette = (): boolean => {
        let feil: Valideringsfeil = {};

        const verdierValgteAktiviteter = valgteAktiviteter?.verdier ?? [];
        if (skalViseArbeidsrettedeAktiviteter && verdierValgteAktiviteter.length === 0) {
            feil = feilValgtAktivitet(feil, locale);
        }
        if (skalViseAnnenAktivitet && annenUtdanning === undefined) {
            feil = feilAnnenUtdanning(feil, locale);
        }
        if (skalViseMottarUtstyrsstipend && mottarUtstyrsstipend === undefined) {
            feil = feilMottarUtstyrsstipend(feil, locale);
        }
        if (harFunksjonsnedsettelse === undefined) {
            feil = feilHarFunksjonsnedsettelse(feil, locale);
        }

        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette} oppdaterSøknad={oppdaterUtdanningISøknad}>
            <Heading size={'medium'}>
                <LocaleTekst tekst={utdanningTekster.tittel} />
            </Heading>
            <PellePanel poster>
                <LocaleTekstAvsnitt tekst={utdanningTekster.guide_innhold} />
            </PellePanel>
            {skalViseArbeidsrettedeAktiviteter && (
                <ArbeidsrettedeAktiviteter
                    spørsmål={utdanningTekster.hvilken_aktivitet.spm}
                    lesMer={
                        <LesMerHvilkenAktivitet
                            header={utdanningTekster.hvilken_aktivitet.les_mer.header}
                        />
                    }
                    registerAktiviteter={registerAktiviteter}
                    valgteAktiviteter={valgteAktiviteter}
                    oppdaterValgteAktiviteter={oppdaterValgteAktiviteter}
                    feilmelding={valideringsfeil.valgteAktiviteter}
                />
            )}
            {!skalViseArbeidsrettedeAktiviteter && (
                <>
                    <div>
                        <Label>
                            <LocaleTekst
                                tekst={utdanningTekster.ingen_registrerte_aktiviterer_overskrift}
                            ></LocaleTekst>
                        </Label>
                        <LesMerHvilkenAktivitet
                            header={
                                utdanningTekster.hvilken_aktivitet.les_mer
                                    .header_ingen_registrerte_aktiviteter
                            }
                        />
                    </div>
                </>
            )}
            {skalViseAnnenAktivitet && (
                <AnnenUtdanning
                    annenUtdanning={annenUtdanning}
                    oppdaterAnnenAktivitet={oppdaterAnnenAktivitet}
                    feilmelding={valideringsfeil.annenUtdanning}
                />
            )}
            {skalViseMottarUtstyrsstipend && (
                <MottarUtstyrsstipend
                    mottarUtstyrsstipend={mottarUtstyrsstipend}
                    oppdaterMottarUtstyrsstipend={oppdaterMottarUtstyrsstipend}
                    feilmelding={valideringsfeil.mottarUtstyrsstipend}
                />
            )}
            <HarFunksjonsnedsettelse
                harFunksjonsnedsettelse={harFunksjonsnedsettelse}
                oppdaterHarFunksjonsnedsettelse={oppdaterHarFunksjonsnedsettelse}
                feilmelding={valideringsfeil.harFunksjonsnedsettelse}
            />
        </Side>
    );
};
export default Utdanning;

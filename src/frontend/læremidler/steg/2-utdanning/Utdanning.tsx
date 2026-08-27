import React, { useState } from 'react';

import { GuidePanel, Label } from '@navikt/ds-react';

import { AnnenUtdanning } from './AnnenUtdanning';
import { HarFunksjonsnedsettelse } from './HarFunksjonsnedsettelse';
import { HarTidligereFullførtVgs } from './HarTidligereFullførtVgs';
import { LesMerHvilkenAktivitet } from './LesMerHvilkenAktivitet';
import { TarOpplæringVgsSamtidig } from './TarOpplæringVgsSamtidig';
import { harValgtAktivitetPåVgsNivå } from './UtdanningUtils';
import {
    feilAnnenUtdanning,
    feilErLærlingEllerLiknende,
    feilHarFunksjonsnedsettelse,
    feilHarTidligereFullførtVgs,
    feilTarOpplæringVgsSamtidig,
    feilValgtAktivitet,
} from './validering';
import { ArbeidsrettedeAktiviteter } from '../../../components/Aktivitet/ArbeidsrettedeAktiviteter';
import { ErLærlingEllerLiknende } from '../../../components/Aktivitet/ErLærlingEllerLiknende';
import {
    skalTaStillingTilAnnenAktivitet,
    skalTaStillingTilRegisterAktiviteter,
} from '../../../components/Aktivitet/registerAktivitetUtil';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { usePerson } from '../../../context/PersonContext';
import { useRegisterAktiviteter } from '../../../context/RegisterAktiviteterContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { erProd } from '../../../utils/miljø';
import { useLæremidlerSøknad } from '../../context/LæremidlerSøknadContext';
import { utdanningTekster } from '../../tekster/utdanning';
import { AnnenUtdanningType } from '../../typer/søknad';

export const Utdanning = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { utdanning, settUtdanning } = useLæremidlerSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const { registerAktiviteter } = useRegisterAktiviteter();

    const [valgteAktiviteter, settValgteAktiviteter] = useState<
        EnumFlereValgFelt<string> | undefined
    >(utdanning ? utdanning.aktiviteter : undefined);

    const [annenUtdanning, settAnnenUtdanning] = useState<EnumFelt<AnnenUtdanningType> | undefined>(
        utdanning ? utdanning.annenUtdanning : undefined
    );
    const [harFunksjonsnedsettelse, settHarFunksjonsnedsettelse] = useState<
        EnumFelt<JaNei> | undefined
    >(utdanning ? utdanning.harFunksjonsnedsettelse : undefined);
    const [erLærlingEllerLiknende, setterLærlingEllerLiknende] = useState<
        EnumFelt<JaNei> | undefined
    >(utdanning ? utdanning.harRettTilUtstyrsstipend.erLærlingEllerLiknende : undefined);
    const [harTidligereFullførtVgs, settHarTidligereFullførtVgs] = useState<
        EnumFelt<JaNei> | undefined
    >(utdanning ? utdanning.harRettTilUtstyrsstipend.harTidligereFullførtVgs : undefined);
    const [tarOpplæringVgsSamtidig, settTarOpplæringVgsSamtidig] = useState<
        EnumFelt<JaNei> | undefined
    >(utdanning ? utdanning.harRettTilUtstyrsstipend.tarOpplæringVgsSamtidig : undefined);

    const oppdaterUtdanningISøknad = () => {
        settUtdanning({
            aktiviteter: valgteAktiviteter,
            annenUtdanning: annenUtdanning,
            harRettTilUtstyrsstipend: {
                erLærlingEllerLiknende: erLærlingEllerLiknende,
                harTidligereFullførtVgs: harTidligereFullførtVgs,
                tarOpplæringVgsSamtidig: tarOpplæringVgsSamtidig,
            },
            harFunksjonsnedsettelse: harFunksjonsnedsettelse,
        });
    };

    const oppdaterAnnenUtdanning = (nyAnnenUtdanning: EnumFelt<AnnenUtdanningType>) => {
        settAnnenUtdanning(nyAnnenUtdanning);
        if (!harValgtAktivitetPåVgsNivå(valgteAktiviteter, registerAktiviteter, nyAnnenUtdanning)) {
            setterLærlingEllerLiknende(undefined);
            settHarTidligereFullførtVgs(undefined);
            settTarOpplæringVgsSamtidig(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                erLærlingEllerLiknende: undefined,
                harTidligereFullførtVgs: undefined,
                tarOpplæringVgsSamtidig: undefined,
            }));
        }
        settValideringsfeil((prevState) => ({
            ...prevState,
            annenUtdanning: undefined,
        }));
    };

    const oppdaterHarFunksjonsnedsettelse = (verdi: EnumFelt<JaNei>) => {
        settHarFunksjonsnedsettelse(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            harFunksjonsnedsettelse: undefined,
        }));
    };

    const oppdatererLærlingEllerLiknende = (verdi: EnumFelt<JaNei>) => {
        setterLærlingEllerLiknende(verdi);
        if (verdi.verdi === 'JA') {
            settHarTidligereFullførtVgs(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                harTidligereFullførtVgs: undefined,
            }));
        } else {
            settTarOpplæringVgsSamtidig(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                tarOpplæringVgsSamtidig: undefined,
            }));
        }
        settValideringsfeil((prevState) => ({
            ...prevState,
            erLærlingEllerLiknende: undefined,
        }));
    };

    const oppdaterHarTidligereFullførtVgs = (verdi: EnumFelt<JaNei>) => {
        settHarTidligereFullførtVgs(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            harTidligereFullførtVgs: undefined,
        }));
    };

    const oppdaterTarOpplæringVgsSamtidig = (verdi: EnumFelt<JaNei>) => {
        settTarOpplæringVgsSamtidig(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            tarOpplæringVgsSamtidig: undefined,
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
        if (
            !harValgtAktivitetPåVgsNivå(nyeValgteAktiviteter, registerAktiviteter, annenUtdanning)
        ) {
            setterLærlingEllerLiknende(undefined);
            settHarTidligereFullførtVgs(undefined);
            settTarOpplæringVgsSamtidig(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                erLærlingEllerLiknende: undefined,
                harTidligereFullførtVgs: undefined,
                tarOpplæringVgsSamtidig: undefined,
            }));
        }
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
    const skalViseHarRettTilUtstyrsstipend =
        person.alder < 21 &&
        harValgtAktivitetPåVgsNivå(valgteAktiviteter, registerAktiviteter, annenUtdanning);

    const kanFortsette = (): boolean => {
        let feil: Valideringsfeil = {};

        const verdierValgteAktiviteter = valgteAktiviteter?.verdier ?? [];
        if (skalViseArbeidsrettedeAktiviteter && verdierValgteAktiviteter.length === 0) {
            feil = feilValgtAktivitet(feil, locale);
        }
        if (skalViseAnnenAktivitet && annenUtdanning === undefined) {
            feil = feilAnnenUtdanning(feil, locale);
        }
        if (skalViseHarRettTilUtstyrsstipend && erLærlingEllerLiknende === undefined) {
            feil = feilErLærlingEllerLiknende(feil, locale);
        }
        if (
            skalViseHarRettTilUtstyrsstipend &&
            erLærlingEllerLiknende?.verdi === 'NEI' &&
            harTidligereFullførtVgs === undefined
        ) {
            feil = feilHarTidligereFullførtVgs(feil, locale);
        }
        // TODO Fjerne erProd-sjekk når vi har orientert SBer om endringen
        if (
            !erProd() &&
            skalViseHarRettTilUtstyrsstipend &&
            erLærlingEllerLiknende?.verdi === 'JA' &&
            tarOpplæringVgsSamtidig === undefined
        ) {
            feil = feilTarOpplæringVgsSamtidig(feil, locale);
        }
        if (harFunksjonsnedsettelse === undefined) {
            feil = feilHarFunksjonsnedsettelse(feil, locale);
        }

        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette} oppdaterSøknad={oppdaterUtdanningISøknad}>
            <LocaleHeading tekst={utdanningTekster.tittel} size="medium" level="2" />
            <GuidePanel poster>
                <LocaleTekstAvsnitt tekst={utdanningTekster.guide_innhold} />
            </GuidePanel>
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
                    oppdaterAnnenUtdanning={oppdaterAnnenUtdanning}
                    feilmelding={valideringsfeil.annenUtdanning}
                />
            )}
            {skalViseHarRettTilUtstyrsstipend && (
                <UnderspørsmålContainer>
                    <ErLærlingEllerLiknende
                        erLærlingEllerLiknende={erLærlingEllerLiknende}
                        oppdatererLærlingEllerLiknende={oppdatererLærlingEllerLiknende}
                        feilmelding={valideringsfeil.erLærlingEllerLiknende}
                    />

                    {erLærlingEllerLiknende?.verdi === 'NEI' && (
                        <HarTidligereFullførtVgs
                            harTidligereFullførtVgs={harTidligereFullførtVgs}
                            oppdaterHarTidligereFullførtVgs={oppdaterHarTidligereFullførtVgs}
                            feilmelding={valideringsfeil.harTidligereFullførtVgs}
                        />
                    )}

                    {/* TODO Fjerne erProd-sjekk når vi har orientert SBer om endringen */}
                    {!erProd() && erLærlingEllerLiknende?.verdi === 'JA' && (
                        <TarOpplæringVgsSamtidig
                            tarOpplæringVgsSamtidig={tarOpplæringVgsSamtidig}
                            oppdaterTarOpplæringVgsSamtidig={oppdaterTarOpplæringVgsSamtidig}
                            feilmelding={valideringsfeil.tarOpplæringVgsSamtidig}
                        />
                    )}
                </UnderspørsmålContainer>
            )}
            <HarFunksjonsnedsettelse
                harFunksjonsnedsettelse={harFunksjonsnedsettelse}
                oppdaterHarFunksjonsnedsettelse={oppdaterHarFunksjonsnedsettelse}
                feilmelding={valideringsfeil.harFunksjonsnedsettelse}
            />
        </Side>
    );
};

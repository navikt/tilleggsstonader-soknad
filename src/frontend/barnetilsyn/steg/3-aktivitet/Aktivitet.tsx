import React, { useState } from 'react';

import { Alert, Heading, Label, List, VStack } from '@navikt/ds-react';

import { AnnenArbeidsrettetAktivitet } from './AnnenArbeidsrettetAktivitet';
import { LesMerHvilkenAktivitet } from './LesMerHvilkenAktivitet';
import { LønnetTiltak } from './LønnetTiltak';
import { skalTaStillingTilLønnetTiltak } from './utils';
import { feilAnnenAktivitet, feilLønnetAktivitet, feilValgtAktivitet } from './validering';
import ArbeidsrettedeAktiviteter from '../../../components/Aktivitet/ArbeidsrettedeAktiviteter';
import {
    skalTaStillingTilAnnenAktivitet,
    skalTaStillingTilRegisterAktiviteter,
} from '../../../components/Aktivitet/registerAktivitetUtil';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { useRegisterAktiviteter } from '../../../context/RegisterAktiviteterContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const { aktivitet, settAktivitet } = usePassAvBarnSøknad();
    const { registerAktiviteter } = useRegisterAktiviteter();

    const [valgteAktiviteter, settValgteAktiviteter] = useState<
        EnumFlereValgFelt<string> | undefined
    >(aktivitet ? aktivitet.aktiviteter : undefined);

    const [annenAktivitet, setAnnenAktivitet] = useState<EnumFelt<AnnenAktivitetType> | undefined>(
        aktivitet ? aktivitet.annenAktivitet : undefined
    );

    const [lønnetAktivitet, setLønnetAktivitet] = useState<EnumFelt<JaNei> | undefined>(
        aktivitet ? aktivitet.lønnetAktivitet : undefined
    );

    const oppdaterAktivitetISøknad = () => {
        settAktivitet({
            aktiviteter: valgteAktiviteter,
            annenAktivitet: annenAktivitet,
            lønnetAktivitet: lønnetAktivitet,
        });
    };

    const nullstillLønnetAktivitet = (
        valgteAktiviteter: EnumFlereValgFelt<string> | undefined,
        annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined
    ) => {
        const skalIkkeTaStilling = !skalTaStillingTilLønnetTiltak(
            valgteAktiviteter,
            annenAktivitet,
            registerAktiviteter
        );
        if (lønnetAktivitet && skalIkkeTaStilling) {
            setLønnetAktivitet(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                lønnetAktivitet: undefined,
            }));
        }
    };

    const nullstillAnnenAktivitet = (valgteAktiviteter: EnumFlereValgFelt<string>) => {
        if (!skalTaStillingTilAnnenAktivitet(valgteAktiviteter)) {
            setAnnenAktivitet(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                annenAktivitet: undefined,
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
        nullstillLønnetAktivitet(nyeValgteAktiviteter, annenAktivitet);
    };

    const oppdaterAnnenAktivitet = (verdi: EnumFelt<AnnenAktivitetType>) => {
        setAnnenAktivitet(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            annenAktivitet: undefined,
        }));
        nullstillLønnetAktivitet(valgteAktiviteter, verdi);
    };

    const oppdaterLønnetAktivitet = (verdi: EnumFelt<JaNei>) => {
        setLønnetAktivitet(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            lønnetAktivitet: undefined,
        }));
    };

    const skalViseAnnenAktivitet = skalTaStillingTilAnnenAktivitet(valgteAktiviteter);
    const skalViseLønnetTiltak = skalTaStillingTilLønnetTiltak(
        valgteAktiviteter,
        annenAktivitet,
        registerAktiviteter
    );
    if (!registerAktiviteter) {
        // ønsker ikke å vise siden før man har hentet aktivteter fra backend
        return null;
    }
    const skalViseArbeidsrettedeAktiviteter =
        skalTaStillingTilRegisterAktiviteter(registerAktiviteter);

    const kanFortsette = (): boolean => {
        let feil: Valideringsfeil = {};
        const verdierValgteAktiviteter = valgteAktiviteter?.verdier ?? [];
        if (skalViseArbeidsrettedeAktiviteter && verdierValgteAktiviteter.length === 0) {
            feil = feilValgtAktivitet(feil, locale);
        }
        if (skalViseLønnetTiltak && lønnetAktivitet?.verdi === undefined) {
            feil = feilLønnetAktivitet(feil, locale);
        }
        if (
            (skalViseAnnenAktivitet || !skalViseArbeidsrettedeAktiviteter) &&
            annenAktivitet === undefined
        ) {
            feil = feilAnnenAktivitet(feil, locale);
        }
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette} oppdaterSøknad={oppdaterAktivitetISøknad}>
            <Heading size={'medium'}>
                <LocaleTekst tekst={aktivitetTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={aktivitetTekster.guide_innhold} />
            </PellePanel>
            {skalViseArbeidsrettedeAktiviteter && (
                <ArbeidsrettedeAktiviteter
                    spørsmål={aktivitetTekster.hvilken_aktivitet.spm}
                    lesMer={
                        <LesMerHvilkenAktivitet
                            header={aktivitetTekster.hvilken_aktivitet.les_mer.header}
                        />
                    }
                    registerAktiviteter={registerAktiviteter}
                    oppdaterValgteAktiviteter={oppdaterValgteAktiviteter}
                    valgteAktiviteter={valgteAktiviteter}
                    feilmelding={valideringsfeil.valgteAktiviteter}
                />
            )}
            {!skalViseArbeidsrettedeAktiviteter && (
                <>
                    <div>
                        <Label>
                            <LocaleTekst
                                tekst={aktivitetTekster.ingen_registrerte_aktiviterer_overskrift}
                            ></LocaleTekst>
                        </Label>
                        <LesMerHvilkenAktivitet
                            header={
                                aktivitetTekster.hvilken_aktivitet.les_mer
                                    .header_ingen_registrerte_aktiviteter
                            }
                        />
                    </div>
                    <AnnenArbeidsrettetAktivitet
                        tekst={aktivitetTekster.radio_annet_uten_registeraktivitet}
                        oppdaterAnnenAktivitet={oppdaterAnnenAktivitet}
                        annenAktivitet={annenAktivitet}
                        feilmelding={valideringsfeil.annenAktivitet}
                    />
                </>
            )}
            {(skalViseAnnenAktivitet || skalViseLønnetTiltak) && (
                <UnderspørsmålContainer>
                    <VStack gap={'6'}>
                        {skalViseAnnenAktivitet && (
                            <AnnenArbeidsrettetAktivitet
                                tekst={aktivitetTekster.radio_annet}
                                oppdaterAnnenAktivitet={oppdaterAnnenAktivitet}
                                annenAktivitet={annenAktivitet}
                                feilmelding={valideringsfeil.annenAktivitet}
                            />
                        )}
                        {skalViseLønnetTiltak && (
                            <LønnetTiltak
                                lønnetAktivitet={lønnetAktivitet}
                                oppdaterLønnetAktivitet={oppdaterLønnetAktivitet}
                                feilmelding={valideringsfeil.lønnetAktivitet}
                            />
                        )}
                    </VStack>
                </UnderspørsmålContainer>
            )}
            {annenAktivitet?.verdi === AnnenAktivitetType.INGEN_AKTIVITET && (
                <Alert variant={'info'}>
                    <Heading size="small">
                        <LocaleTekst tekst={aktivitetTekster.ingen_aktivitet_infoalert_title} />
                    </Heading>
                    <LocaleTekstAvsnitt
                        tekst={aktivitetTekster.ingen_aktivitet_infoalert_innhold.del1}
                    />
                    <List>
                        {aktivitetTekster.ingen_aktivitet_infoalert_innhold.del2_lenker.map(
                            (lenke, indeks) => (
                                <List.Item key={indeks}>
                                    <LocaleInlineLenke tekst={lenke} />
                                </List.Item>
                            )
                        )}
                    </List>
                </Alert>
            )}
        </Side>
    );
};
export default Aktivitet;

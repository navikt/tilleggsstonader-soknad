import React, { useEffect, useState } from 'react';

import { Alert, BodyLong, Heading, List, VStack } from '@navikt/ds-react';

import { AnnenArbeidsrettetAktivitet } from './AnnenArbeidsrettetAktivitet';
import ArbeidsrettedeAktiviteter from './ArbeidsrettedeAktiviteter';
import { LønnetTiltak } from './LønnetTiltak';
import {
    mapTilRegisterAktiviteterObjektMedLabel,
    skalTaStillingTilAnnenAktivitet,
    skalTaStillingTilLønnetTiltak,
    skalTaStillingTilRegisterAktiviteter,
} from './utils';
import { feilAnnenAktivitet, feilLønnetAktivitet, feilValgtAktivitet } from './validering';
import { hentArbeidsrettedeAktiviteter } from '../../../api/api';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { locale } = useSpråk();
    const { aktivitet, settAktivitet, valideringsfeil, settValideringsfeil } = useSøknad();
    const [valgteAktiviteter, settValgteAktiviteter] = useState<
        EnumFlereValgFelt<string> | undefined
    >(aktivitet ? aktivitet.aktiviteter : undefined);
    const [registerAktiviteter, settRegisterAktiviteter] =
        useState<Record<string, RegisterAktivitetMedLabel>>();

    const [annenAktivitet, setAnnenAktivitet] = useState<EnumFelt<AnnenAktivitetType> | undefined>(
        aktivitet ? aktivitet.annenAktivitet : undefined
    );

    const [lønnetAktivitet, setLønnetAktivitet] = useState<EnumFelt<JaNei> | undefined>(
        aktivitet ? aktivitet.lønnetAktivitet : undefined
    );
    useEffect(() => {
        hentArbeidsrettedeAktiviteter()
            .then((arbeidsrettedeAktiviteter) =>
                settRegisterAktiviteter(
                    // {}
                    mapTilRegisterAktiviteterObjektMedLabel(arbeidsrettedeAktiviteter)
                )
            )
            .catch(() => settRegisterAktiviteter({}));
    }, []);

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
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            validerSteg={kanFortsette}
            oppdaterSøknad={oppdaterAktivitetISøknad}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={aktivitetTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={aktivitetTekster.guide_innhold} />
            </PellePanel>
            {skalViseArbeidsrettedeAktiviteter && (
                <ArbeidsrettedeAktiviteter
                    registerAktiviteter={registerAktiviteter}
                    oppdaterValgteAktiviteter={oppdaterValgteAktiviteter}
                    locale={locale}
                    valgteAktiviteter={valgteAktiviteter}
                    feilmelding={valideringsfeil.valgteAktiviteter}
                />
            )}
            {!skalViseArbeidsrettedeAktiviteter && (
                <>
                    <div>
                        <BodyLong weight={'semibold'}>
                            <LocaleTekst
                                tekst={aktivitetTekster.ingen_registrerte_aktiviterer_overskrift}
                            ></LocaleTekst>
                        </BodyLong>
                        <LocaleReadMoreMedChildren
                            header={
                                aktivitetTekster.hvilken_aktivitet.les_mer
                                    .header_ingen_registrerte_aktiviteter
                            }
                        >
                            <LocaleTekstAvsnitt
                                tekst={aktivitetTekster.hvilken_aktivitet.les_mer.del1}
                            />
                            <List>
                                {aktivitetTekster.hvilken_aktivitet.les_mer.del2_lenker.map(
                                    (lenke, indeks) => (
                                        <List.Item key={indeks}>
                                            <LocaleInlineLenke tekst={lenke} />
                                        </List.Item>
                                    )
                                )}
                            </List>
                            <LocaleInlineLenke
                                tekst={aktivitetTekster.hvilken_aktivitet.les_mer.del3}
                            />
                        </LocaleReadMoreMedChildren>
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

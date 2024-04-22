import React, { useEffect, useState } from 'react';

import { Alert, Heading, VStack } from '@navikt/ds-react';

import { AnnenArbeidsrettetAktivitet } from './AnnenArbeidsrettetAktivitet';
import ArbeidsrettedeAktiviteter from './ArbeidsrettedeAktiviteter';
import { LønnetTiltak } from './LønnetTiltak';
import {
    mapTIlArbeidsrettedeAktiviteterObjektMedLabel,
    skalTaStillingTilAnnenAktivitet,
} from './utils';
import { hentArbeidsrettedeAktiviteter } from '../../../api/api';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { ArbeidsrettetAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { locale } = useSpråk();
    const { aktivitet, settAktivitet, valideringsfeil, settValideringsfeil } = useSøknad();
    const [utdanning, settUtdanning] = useState<EnumFelt<JaNei> | undefined>(
        aktivitet ? aktivitet.utdanning : undefined
    );
    const [valgteAktiviteter, settValgteAktiviteter] = useState<
        EnumFlereValgFelt<string> | undefined
    >(aktivitet ? aktivitet.aktivitet : undefined);
    const [arbeidsrettedeAktiviteter, settArbeidsrettedeAktiviteter] =
        useState<Record<string, ArbeidsrettetAktivitetMedLabel>>();

    const [annenAktivitet, setAnnenAktivitet] = useState<EnumFelt<AnnenAktivitetType> | undefined>(
        aktivitet ? aktivitet.annenAktivitet : undefined
    );

    const [lønnetAktivitet, setLønnetAktivitet] = useState<EnumFelt<JaNei> | undefined>(
        aktivitet ? aktivitet.lønnetAktivitet : undefined
    );
    useEffect(() => {
        hentArbeidsrettedeAktiviteter()
            .then((arbeidsrettedeAktiviteter) =>
                settArbeidsrettedeAktiviteter(
                    // {}
                    mapTIlArbeidsrettedeAktiviteterObjektMedLabel(arbeidsrettedeAktiviteter)
                )
            )
            .catch(() => settArbeidsrettedeAktiviteter({}));
    }, []);

    const oppdaterAktivitetISøknad = () => {
        if (utdanning !== undefined) {
            settAktivitet({
                utdanning: utdanning,
                aktivitet: valgteAktiviteter,
                annenAktivitet: annenAktivitet,
                lønnetAktivitet: lønnetAktivitet,
            });
        }
    };

    const oppdaterValgteAktiviteter = (verdier: string[]) => {
        if (!arbeidsrettedeAktiviteter) return;
        const valgteVerdier = verdier.map((verdi) => {
            if (verdi === 'ANNET') {
                return {
                    label: aktivitetTekster.hvilken_aktivitet.checkboks_annet_tekst[locale],
                    verdi: 'ANNET',
                };
            }
            const valgtAktivitet = arbeidsrettedeAktiviteter[verdi];

            return { label: valgtAktivitet.label, verdi: verdi };
        });
        settValgteAktiviteter({
            label: aktivitetTekster.hvilken_aktivitet.spm[locale],
            verdier: valgteVerdier,
            alternativer: Object.values(arbeidsrettedeAktiviteter).map((a) => a.label),
        });
        if (valgteVerdier.length > 0) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                valgteAktiviteter: undefined,
            }));
        }
    };

    const oppdaterAnnenAktivitet = (verdi: EnumFelt<AnnenAktivitetType>) => {
        setAnnenAktivitet(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            annenAktivitet: undefined,
        }));
    };

    const oppdaterLønnetAktivitet = (verdi: EnumFelt<JaNei>) => {
        setLønnetAktivitet(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            lønnetAktivitet: undefined,
        }));
    };

    const arbeidsrettedeAktiviteterMedLabeler: ArbeidsrettetAktivitetMedLabel[] | undefined =
        arbeidsrettedeAktiviteter ? Object.values(arbeidsrettedeAktiviteter) : undefined;

    const skalTaStillingTilLønnetTiltak = () => {
        if (annenAktivitet?.verdi === 'TILTAK') {
            return true;
        }
        if (!arbeidsrettedeAktiviteter || !valgteAktiviteter) return false;
        return valgteAktiviteter.verdier.some((valgtAktivitet) => {
            const aktivitet = arbeidsrettedeAktiviteter[valgtAktivitet.verdi];
            return aktivitet && !aktivitet.erUtdanning;
        });
    };

    const skalViseAnnenAktivitet = skalTaStillingTilAnnenAktivitet(valgteAktiviteter);
    const skalViseLønnetTiltak = skalTaStillingTilLønnetTiltak();
    if (!arbeidsrettedeAktiviteter) {
        // ønsker ikke å vise siden før man har hentet aktivteter fra backend
        return null;
    }
    const skalViseArbeidsrettedeAktiviteter: boolean =
        Object.keys(arbeidsrettedeAktiviteter).length > 0;

    const kanFortsette = (): boolean => {
        let feil: Valideringsfeil = {};
        const verdierValgteAktiviteter = valgteAktiviteter?.verdier ?? [];
        if (skalViseArbeidsrettedeAktiviteter && verdierValgteAktiviteter.length === 0) {
            feil = {
                ...feil,
                valgteAktiviteter: {
                    id: '1',
                    melding: aktivitetTekster.checkbox_velge_aktivitet_feilmelding[locale],
                },
            };
        }
        if (skalViseLønnetTiltak && lønnetAktivitet?.verdi === undefined) {
            feil = {
                ...feil,
                lønnetAktivitet: {
                    id: '2',
                    melding: aktivitetTekster.radio_lønnet_tiltak_feilmelding[locale],
                },
            };
        }
        if (
            (skalViseAnnenAktivitet || !skalViseArbeidsrettedeAktiviteter) &&
            annenAktivitet === undefined
        ) {
            feil = {
                ...feil,
                annenAktivitet: {
                    id: '3',
                    melding: aktivitetTekster.radio_annet_feilmelding[locale],
                },
            };
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
                    arbeidsrettedeAktiviteterMedLabeler={arbeidsrettedeAktiviteterMedLabeler}
                    oppdaterValgteAktiviteter={oppdaterValgteAktiviteter}
                    locale={locale}
                    valgteAktiviteter={valgteAktiviteter}
                    feilmelding={valideringsfeil.valgteAktiviteter}
                />
            )}
            {!skalViseArbeidsrettedeAktiviteter && (
                <AnnenArbeidsrettetAktivitet
                    tekst={aktivitetTekster.radio_annet_uten_registeraktivitet}
                    oppdaterAnnenAktivitet={oppdaterAnnenAktivitet}
                    annenAktivitet={annenAktivitet}
                    feilmelding={valideringsfeil.annenAktivitet}
                />
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
            <LocaleRadioGroup
                id={valideringsfeil.barnepassPgaUtdanning?.id}
                tekst={aktivitetTekster.radio_utdanning}
                value={utdanning?.verdi || ''}
                onChange={(verdi) => {
                    settUtdanning(verdi);
                    settValideringsfeil({});
                }}
                error={valideringsfeil.barnepassPgaUtdanning?.melding}
            >
                <LocaleReadMore tekst={aktivitetTekster.radio_utdanning_lesmer} />
            </LocaleRadioGroup>
            {utdanning?.verdi === 'NEI' && (
                <Alert variant={'info'}>
                    <Heading size="small">
                        <LocaleTekst tekst={aktivitetTekster.feil_utdanning_infoalert_title} />
                    </Heading>
                    <LocaleTekstAvsnitt tekst={aktivitetTekster.feil_utdanning_infoalert_innhold} />
                </Alert>
            )}
        </Side>
    );
};
export default Aktivitet;

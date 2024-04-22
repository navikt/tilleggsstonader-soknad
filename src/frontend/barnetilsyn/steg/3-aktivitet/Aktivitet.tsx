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
                    mapTIlArbeidsrettedeAktiviteterObjektMedLabel(arbeidsrettedeAktiviteter)
                )
            )
            .catch(); // TODO noe bedre håndtering?
    }, []);

    const kanFortsette = (barnepassPgaUtdanning?: JaNei): boolean => {
        let feil: Valideringsfeil = {};
        if (barnepassPgaUtdanning === undefined) {
            feil = {
                ...feil,
                barnepassPgaUtdanning: { id: '1', melding: 'Du må velge et alternativ' },
            };
        }
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

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
        settValgteAktiviteter({
            label: aktivitetTekster.hvilken_aktivitet.spm[locale],
            verdier: verdier.map((verdi) => {
                if (verdi === 'ANNET') {
                    return {
                        label: aktivitetTekster.hvilken_aktivitet.checkboks_annet_tekst[locale],
                        verdi: 'ANNET',
                    };
                }
                const valgtAktivitet = arbeidsrettedeAktiviteter[verdi];

                return { label: valgtAktivitet.label, verdi: verdi };
            }),
            alternativer: Object.values(arbeidsrettedeAktiviteter).map((a) => a.label),
        });
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
    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            validerSteg={() => kanFortsette(utdanning?.verdi)}
            oppdaterSøknad={oppdaterAktivitetISøknad}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={aktivitetTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={aktivitetTekster.guide_innhold} />
            </PellePanel>
            <ArbeidsrettedeAktiviteter
                arbeidsrettedeAktiviteterMedLabeler={arbeidsrettedeAktiviteterMedLabeler}
                oppdaterValgteAktiviteter={oppdaterValgteAktiviteter}
                locale={locale}
                valgteAktiviteter={valgteAktiviteter}
            />
            {(skalViseAnnenAktivitet || skalViseLønnetTiltak) && (
                <UnderspørsmålContainer>
                    <VStack gap={'6'}>
                        {skalViseAnnenAktivitet && (
                            <AnnenArbeidsrettetAktivitet
                                setAnnenTypeArbeidsrettetAktivitet={setAnnenAktivitet}
                                annenTypeArbeidsrettetAktivitet={annenAktivitet}
                            />
                        )}
                        {skalViseLønnetTiltak && (
                            <LønnetTiltak
                                lønnetAktivitet={lønnetAktivitet}
                                setLønnetAktivitet={setLønnetAktivitet}
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

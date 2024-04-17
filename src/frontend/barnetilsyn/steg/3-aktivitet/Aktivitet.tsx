import React, { useEffect, useState } from 'react';

import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

import { Alert, Heading } from '@navikt/ds-react';

import ArbeidsrettedeAktiviteter from './ArbeidsrettedeAktiviteter';
import { hentArbeidsrettedeAktiviteter } from '../../../api/api';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { ArbeidsrettetAktivitetMedLabel } from '../../../typer/arbeidsrettetAktivitet';
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
    const [feilmelding, settFeilmelding] = useState<string>();
    const tilDato = (dato: string | Date): Date =>
        typeof dato === 'string' ? parseISO(dato) : dato;

    //TODO: Legge til støtte for flere Locales enn Norsk Bokmål (nb)
    const tilTekstligDato = (dato: string) => {
        return format(tilDato(dato), 'd. MMMM yyyy', { locale: nb });
    };

    useEffect(() => {
        hentArbeidsrettedeAktiviteter()
            .then((arbeidsrettedeAktiviteter) =>
                settArbeidsrettedeAktiviteter(
                    arbeidsrettedeAktiviteter.reduce(
                        (acc, curr) => ({
                            ...acc,
                            [curr.id]: {
                                ...curr,
                                label:
                                    curr.typeNavn +
                                    ': ' +
                                    tilTekstligDato(curr.fom) +
                                    ' - ' +
                                    tilTekstligDato(curr.tom),
                            },
                        }),
                        {} as Record<string, ArbeidsrettetAktivitetMedLabel>
                    )
                )
            )
            .catch(() => settFeilmelding('Feiltet henting av arbeidsrettede aktiviteter')); // TODO noe bedre håndtering?
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
        if (utdanning !== undefined && valgteAktiviteter) {
            settAktivitet({ utdanning: utdanning, aktivitet: valgteAktiviteter });
        }
    };

    const oppdaterValgteAktiviteter = (verdier: string[]) => {
        if (!arbeidsrettedeAktiviteter) return;
        settValgteAktiviteter({
            label: aktivitetTekster.hvilken_aktivitet_spm[locale],
            verdier: verdier.map((verdi) => {
                if (verdi === 'ANNET') {
                    return { label: aktivitetTekster.checkboks_annet_tekst[locale], verdi: 'ANNET' };
                }
                const valgtAktivitet = arbeidsrettedeAktiviteter[verdi];

                return { label: valgtAktivitet.label, verdi: verdi };
            }),
            alternativer: Object.values(arbeidsrettedeAktiviteter).map((a) => a.label),
        });
    };

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
                arbeidsrettedeAktiviteter={arbeidsrettedeAktiviteter}
                oppdaterValgteAktiviteter={oppdaterValgteAktiviteter}
                locale={locale}
            />
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

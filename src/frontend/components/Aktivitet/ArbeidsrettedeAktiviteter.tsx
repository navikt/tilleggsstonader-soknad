import React, { ReactNode, useMemo } from 'react';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

import { aktivitetTekster } from '../../barnetilsyn/tekster/aktivitet';
import { RegisterAktivitetMedLabel } from '../../typer/registerAktivitet';
import { EnumFlereValgFelt } from '../../typer/skjema';
import { Locale, TekstElement } from '../../typer/tekst';
import { Feilmelding } from '../../typer/validering';

interface Props {
    spørsmål: TekstElement<string>;
    lesMer: ReactNode;
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>;
    oppdaterValgteAktiviteter: (verdier: EnumFlereValgFelt<string>) => void;
    locale: Locale;
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined;
    feilmelding: Feilmelding | undefined;
}

const ArbeidsrettedeAktiviteter: React.FC<Props> = ({
    spørsmål,
    lesMer,
    registerAktiviteter,
    oppdaterValgteAktiviteter,
    locale,
    valgteAktiviteter,
    feilmelding,
}) => {
    const registerAktiviteterListe = useMemo(
        () => Object.values(registerAktiviteter),
        [registerAktiviteter]
    );

    const onChange = (verdier: string[]) => {
        if (!registerAktiviteter) return;
        const valgteVerdier = verdier.map((verdi) => {
            if (verdi === 'ANNET') {
                return {
                    label: aktivitetTekster.hvilken_aktivitet.checkboks_annet_tekst[locale],
                    verdi: 'ANNET',
                };
            }
            const valgtAktivitet = registerAktiviteter[verdi];

            return { label: valgtAktivitet.label, verdi: verdi };
        });
        const nyeValgteAktiviteter = {
            label: spørsmål[locale],
            verdier: valgteVerdier,
            alternativer: Object.values(registerAktiviteter).map((a) => a.label),
        };
        oppdaterValgteAktiviteter(nyeValgteAktiviteter);
    };

    return (
        <CheckboxGroup
            id={feilmelding?.id}
            legend={spørsmål[locale]}
            onChange={onChange}
            value={valgteAktiviteter?.verdier?.map((verdi) => verdi.verdi) || []}
            error={feilmelding?.melding}
        >
            {lesMer}
            {registerAktiviteterListe.map((aktivitet) => (
                <Checkbox key={aktivitet.id} value={aktivitet.id}>
                    {aktivitet ? aktivitet.label : ''}
                </Checkbox>
            ))}
            <Checkbox value="ANNET">
                {aktivitetTekster.hvilken_aktivitet.checkboks_annet_tekst[locale]}
            </Checkbox>
        </CheckboxGroup>
    );
};

export default ArbeidsrettedeAktiviteter;

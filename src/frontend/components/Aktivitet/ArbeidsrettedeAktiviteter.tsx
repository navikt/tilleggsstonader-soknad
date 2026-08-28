import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import type React from 'react';
import { type ReactNode, useMemo } from 'react';

import { useSpråk } from '../../context/SpråkContext';
import { tekstArbeidsrettedeAktiviteter } from '../../tekster/aktivitet';
import type { RegisterAktivitetMedLabel } from '../../typer/registerAktivitet';
import type { EnumFlereValgFelt } from '../../typer/skjema';
import type { TekstElement } from '../../typer/tekst';
import type { Feilmelding } from '../../typer/validering';

interface Props {
    spørsmål: TekstElement<string>;
    lesMer: ReactNode;
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>;
    oppdaterValgteAktiviteter: (verdier: EnumFlereValgFelt<string>) => void;
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined;
    feilmelding: Feilmelding | undefined;
}

export const ArbeidsrettedeAktiviteter: React.FC<Props> = ({
    spørsmål,
    lesMer,
    registerAktiviteter,
    oppdaterValgteAktiviteter,
    valgteAktiviteter,
    feilmelding
}) => {
    const { locale } = useSpråk();
    const registerAktiviteterListe = useMemo(
        () => Object.values(registerAktiviteter),
        [registerAktiviteter]
    );

    const onChange = (verdier: string[]) => {
        if (!registerAktiviteter) return;
        const valgteVerdier = verdier.map((verdi) => {
            if (verdi === 'ANNET') {
                return {
                    label: tekstArbeidsrettedeAktiviteter.checkboks_annet_tekst[locale],
                    verdi: 'ANNET'
                };
            }
            const valgtAktivitet = registerAktiviteter[verdi];

            return { label: valgtAktivitet.label, verdi: verdi };
        });
        const nyeValgteAktiviteter = {
            label: spørsmål[locale],
            verdier: valgteVerdier,
            alternativer: Object.values(registerAktiviteter).map((a) => a.label)
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
                {tekstArbeidsrettedeAktiviteter.checkboks_annet_tekst[locale]}
            </Checkbox>
        </CheckboxGroup>
    );
};

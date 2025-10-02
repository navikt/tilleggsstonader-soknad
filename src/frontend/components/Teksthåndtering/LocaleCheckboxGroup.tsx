import React from 'react';

import {
    CheckboxGroupProps as AkselCheckboxGroupProps,
    CheckboxGroup,
    Checkbox,
} from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { EnumFlereValgFelt, VerdiFelt } from '../../typer/skjema';
import { CheckboxGruppe } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekstUtils';

interface CheckboxGroupProps<T extends string>
    extends Omit<AkselCheckboxGroupProps, 'onChange' | 'legend' | 'children'> {
    tekst: CheckboxGruppe<T>;
    onChange: (enumFelt: EnumFlereValgFelt<T>) => void;
    children?: React.ReactNode;
    argument0?: string;
    value: VerdiFelt<T>[];
}

function LocaleCheckboxGroup<T extends string>({
    children,
    tekst,
    argument0,
    onChange,
    value,
    ...props
}: CheckboxGroupProps<T>) {
    const { locale } = useSpråk();

    const legend = argument0
        ? hentBeskjedMedEttParameter(argument0, tekst.legend[locale])
        : tekst.legend[locale];

    const oppdaterValgteVerdier = (values: T[]) => {
        const verdier: VerdiFelt<T>[] = values.map((verdi) => ({
            verdi,
            label: tekst.alternativer[verdi][locale],
        }));

        onChange({
            label: legend,
            verdier: verdier,
            alternativer: Object.keys(tekst.alternativer).map(
                (key) => tekst.alternativer[key as T][locale]
            ),
        });
    };

    return (
        <CheckboxGroup
            value={value.map((v) => v.verdi)}
            legend={legend}
            description={
                tekst.beskrivelse &&
                (argument0
                    ? hentBeskjedMedEttParameter(argument0, tekst.beskrivelse[locale])
                    : tekst.beskrivelse[locale])
            }
            onChange={oppdaterValgteVerdier}
            {...props}
        >
            {children}
            {Object.keys(tekst.alternativer).map((key) => (
                <Checkbox value={key} key={key}>
                    {tekst.alternativer[key as T][locale]}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
}

export default LocaleCheckboxGroup;

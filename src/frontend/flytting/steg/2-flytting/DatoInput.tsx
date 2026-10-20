import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { useSpråk } from '../../../context/SpråkContext';
import { VerdiFelt } from '../../../typer/skjema';
import { InputFelt } from '../../../typer/tekst';
import { nullableTilDato, tilLocaleDateString } from '../../../utils/formateringUtils';

interface Props {
    id: string;
    tekst: InputFelt;
    verdi?: VerdiFelt<string>;
    onChange: (verdi: VerdiFelt<string> | undefined) => void;
    error?: string;
}

export const DatoInput = ({ id, tekst, verdi, onChange, error }: Props) => {
    const { locale } = useSpråk();
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: nullableTilDato(verdi?.verdi),
        onDateChange: (dato) =>
            onChange(
                dato ? { verdi: tilLocaleDateString(dato), label: tekst.label[locale] } : undefined
            ),
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                id={id}
                label={tekst.label[locale]}
                description={tekst.description?.[locale]}
                error={error}
            />
        </DatePicker>
    );
};

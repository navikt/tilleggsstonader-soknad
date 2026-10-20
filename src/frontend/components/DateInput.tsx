import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { nullableTilDato, tilLocaleDateString } from '../utils/formateringUtils';

interface Props {
    id?: string;
    label: string;
    description?: string;
    value?: string;
    error?: string;
    onChange: (value?: string) => void;
}

export const DateInput = ({ id, label, description, value, error, onChange }: Props) => {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: nullableTilDato(value),
        onDateChange: (date) => onChange(date ? tilLocaleDateString(date) : undefined),
    });

    return (
        <DatePicker {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                id={id}
                label={label}
                description={description}
                error={error}
            />
        </DatePicker>
    );
};

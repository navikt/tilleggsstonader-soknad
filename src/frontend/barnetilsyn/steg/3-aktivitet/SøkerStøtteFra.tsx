import React from 'react';

import { DatePicker, Label, useDatepicker } from '@navikt/ds-react';

import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { TekstElement } from '../../../typer/tekst';
import { nullableTilDato, tilLocaleDateString } from '../../../utils/formatering';
import { aktivitetTekster } from '../../tekster/aktivitet';

export const SøkerStøtteFra: React.FC<{
    søkerFraDato?: string;
    oppdaterSøkerFraDato: (søkerFraDato?: string) => void;
    valideringsfeil?: TekstElement<string>;
    resettFeilmelding: () => void;
}> = ({ oppdaterSøkerFraDato, søkerFraDato, valideringsfeil, resettFeilmelding }) => {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: nullableTilDato(søkerFraDato),
        onDateChange: (val) => {
            oppdaterSøkerFraDato(val ? tilLocaleDateString(val) : val);
            resettFeilmelding();
        },
    });

    const søkerFraLabel = <LocaleTekst tekst={aktivitetTekster.søker_fra_label} />;

    return (
        <>
            <Label>{søkerFraLabel}</Label>
            <LocaleReadMore tekst={aktivitetTekster.søker_fra_lesmer} />
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    label={søkerFraLabel}
                    hideLabel
                    error={valideringsfeil && <LocaleTekst tekst={valideringsfeil} />}
                />
            </DatePicker>
        </>
    );
};

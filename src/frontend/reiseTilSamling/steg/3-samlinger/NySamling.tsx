import React from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, DatePicker, useDatepicker, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import { errorKeyFom, errorKeyTom } from './validering';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Samling } from '../../../typer/søknad';
import { nullableTilDato, tilLocaleDateString } from '../../../utils/formateringUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { samlingerTekster } from '../../tekster/samlinger';

const SamlingBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

const NySamling: React.FC<{
    samling: Samling;
    oppdater: (id: number, key: keyof Samling, verdi: unknown) => void;
}> = ({ samling, oppdater }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (harVerdi(verdi)) {
            settValideringsfeil((prevState) => ({ ...prevState, [errorKey]: undefined }));
        }
    };

    const { datepickerProps: dpPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(samling.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? {
                      label: samlingerTekster.startdato_label[locale],
                      verdi: tilLocaleDateString(val),
                  }
                : undefined;
            oppdater(samling._id, 'fom', verdi);
            nullstillFeil(verdi?.verdi, errorKeyFom);
        },
    });

    const { datepickerProps: dpPropsTom, inputProps: inputPropsTom } = useDatepicker({
        defaultSelected: nullableTilDato(samling.tom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? {
                      label: samlingerTekster.sluttdato_label[locale],
                      verdi: tilLocaleDateString(val),
                  }
                : undefined;
            oppdater(samling._id, 'tom', verdi);
            nullstillFeil(verdi?.verdi, errorKeyTom);
        },
    });

    return (
        <SamlingBoks>
            <VStack gap="space-16">
                <DatePicker {...dpPropsFom}>
                    <DatePicker.Input
                        id={valideringsfeil[errorKeyFom]?.id}
                        label={samlingerTekster.startdato_label[locale]}
                        error={valideringsfeil[errorKeyFom]?.melding}
                        {...inputPropsFom}
                    />
                </DatePicker>
                <DatePicker {...dpPropsTom}>
                    <DatePicker.Input
                        id={valideringsfeil[errorKeyTom]?.id}
                        label={samlingerTekster.sluttdato_label[locale]}
                        error={valideringsfeil[errorKeyTom]?.melding}
                        {...inputPropsTom}
                    />
                </DatePicker>
                <Alert variant="info">
                    <BodyShort weight="semibold">
                        {samlingerTekster.vedlegg_alert_tittel[locale]}
                    </BodyShort>
                    <BodyShort>{samlingerTekster.vedlegg_alert_innhold[locale]}</BodyShort>
                </Alert>
            </VStack>
        </SamlingBoks>
    );
};

export default NySamling;

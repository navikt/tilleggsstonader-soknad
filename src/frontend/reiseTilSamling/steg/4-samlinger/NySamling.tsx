import React from 'react';

import styled from 'styled-components';

import { MinusIcon } from '@navikt/aksel-icons';
import {
    BodyShort,
    Button,
    DatePicker,
    HStack,
    InlineMessage,
    useDatepicker,
    VStack,
} from '@navikt/ds-react';
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

export const NySamling: React.FC<{
    samling: Samling;
    oppdater: (id: number, key: keyof Samling, verdi: unknown) => void;
    onSlett?: () => void;
    visValideringsfeil?: boolean;
}> = ({ samling, oppdater, onSlett, visValideringsfeil = true }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const keyFom = errorKeyFom(samling._id);
    const keyTom = errorKeyTom(samling._id);

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (visValideringsfeil && harVerdi(verdi)) {
            settValideringsfeil((prevState) => ({ ...prevState, [errorKey]: undefined }));
        }
    };

    const feilFom = visValideringsfeil ? valideringsfeil[keyFom] : undefined;
    const feilTom = visValideringsfeil ? valideringsfeil[keyTom] : undefined;

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
            nullstillFeil(verdi?.verdi, keyFom);
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
            nullstillFeil(verdi?.verdi, keyTom);
        },
    });

    return (
        <SamlingBoks>
            <VStack gap="space-16">
                <DatePicker {...dpPropsFom}>
                    <DatePicker.Input
                        id={feilFom?.id}
                        label={samlingerTekster.startdato_label[locale]}
                        error={feilFom?.melding}
                        {...inputPropsFom}
                    />
                </DatePicker>
                <DatePicker {...dpPropsTom}>
                    <DatePicker.Input
                        id={feilTom?.id}
                        label={samlingerTekster.sluttdato_label[locale]}
                        error={feilTom?.melding}
                        {...inputPropsTom}
                    />
                </DatePicker>
                <InlineMessage status="info">
                    <BodyShort>{samlingerTekster.vedlegg_alert_innhold[locale]}</BodyShort>
                </InlineMessage>
                {onSlett && (
                    <HStack>
                        <Button variant="tertiary" onClick={onSlett} icon={<MinusIcon />}>
                            {samlingerTekster.knapp_slett[locale]}
                        </Button>
                    </HStack>
                )}
            </VStack>
        </SamlingBoks>
    );
};

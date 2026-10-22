import React from 'react';

import styled from 'styled-components';

import { MinusIcon } from '@navikt/aksel-icons';
import { Button, DatePicker, Heading, HStack, VStack, useDatepicker } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import { errorKeyFom, errorKeyTom, errorKeyTypeReise } from './validering';
import { Reisemåte } from '../../../components/Reisemåte/Reisemåte';
import { Skillelinje } from '../../../components/Skillelinje';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Reisemåte as ReisemåteType } from '../../../typer/reisemåte';
import { EnumFelt, VerdiFelt } from '../../../typer/skjema';
import { nullableTilDato, tilLocaleDateString } from '../../../utils/formateringUtils';
import { reiseinfoTekster } from '../../tekster/reiseinfo';
import { ReiseInfoReiseOppstartAvslutningHjemreise, TypeReise } from '../../typer/søknad';

const ReiseBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

export const NyReise: React.FC<{
    reise: ReiseInfoReiseOppstartAvslutningHjemreise;
    oppdater: (
        id: number,
        key: keyof ReiseInfoReiseOppstartAvslutningHjemreise,
        verdi: unknown
    ) => void;
    onSlett?: () => void;
    visValideringsfeil?: boolean;
}> = ({ reise, oppdater, onSlett, visValideringsfeil = true }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const keyTypeReise = errorKeyTypeReise(reise._id);
    const keyFom = errorKeyFom(reise._id);
    const keyTom = errorKeyTom(reise._id);

    const nullstillFeil = (errorKeys: string[]) => {
        settValideringsfeil((prev) =>
            errorKeys.reduce((acc, key) => ({ ...acc, [key]: undefined }), prev)
        );
    };

    const oppdaterFom = (verdi: VerdiFelt<string> | undefined) => {
        oppdater(reise._id, 'fom', verdi);
        if (verdi?.verdi) {
            nullstillFeil([keyFom]);
        }
    };

    const oppdaterTom = (verdi: VerdiFelt<string> | undefined) => {
        oppdater(reise._id, 'tom', verdi);
        if (verdi?.verdi) {
            nullstillFeil([keyTom]);
        }
    };

    const settReisemåte: React.Dispatch<React.SetStateAction<ReisemåteType | undefined>> = (
        verdi
    ) => {
        const nesteReisemåte = typeof verdi === 'function' ? verdi(reise.reisemåte) : verdi;
        oppdater(reise._id, 'reisemåte', nesteReisemåte);
    };

    const feilTypeReise = visValideringsfeil ? valideringsfeil[keyTypeReise] : undefined;
    const feilFom = visValideringsfeil ? valideringsfeil[keyFom] : undefined;
    const feilTom = visValideringsfeil ? valideringsfeil[keyTom] : undefined;

    const {
        datepickerProps: datepickerPropsFom,
        inputProps: inputPropsFom,
        setSelected: setFomSelected,
    } = useDatepicker({
        defaultSelected: nullableTilDato(reise.fom?.verdi),
        onDateChange: (val) =>
            oppdaterFom(
                val
                    ? {
                          label:
                              reise.typeReise?.verdi === 'HJEMREISE'
                                  ? reiseinfoTekster.dato_periode.fom[locale]
                                  : reiseinfoTekster.dato_enkelt.label[locale],
                          verdi: tilLocaleDateString(val),
                      }
                    : undefined
            ),
    });

    const {
        datepickerProps: datepickerPropsTom,
        inputProps: inputPropsTom,
        setSelected: setTomSelected,
    } = useDatepicker({
        defaultSelected: nullableTilDato(reise.tom?.verdi),
        onDateChange: (val) =>
            oppdaterTom(
                val
                    ? {
                          label: reiseinfoTekster.dato_periode.tom[locale],
                          verdi: tilLocaleDateString(val),
                      }
                    : undefined
            ),
    });

    const oppdaterTypeReise = (felt: EnumFelt<TypeReise>) => {
        oppdater(reise._id, 'typeReise', felt);
        setFomSelected(undefined);
        setTomSelected(undefined);
        oppdater(reise._id, 'fom', undefined);
        oppdater(reise._id, 'tom', undefined);
        nullstillFeil([keyTypeReise, keyFom, keyTom]);
    };

    return (
        <ReiseBoks>
            <VStack gap="space-24">
                <LocaleRadioGroup
                    id={feilTypeReise?.id}
                    tekst={reiseinfoTekster.radio_type_reise}
                    value={reise.typeReise?.verdi ?? ''}
                    onChange={oppdaterTypeReise}
                    error={feilTypeReise?.melding}
                />
                {(reise.typeReise?.verdi === 'OPPSTART' ||
                    reise.typeReise?.verdi === 'AVSLUTNING') && (
                    <DatePicker {...datepickerPropsFom}>
                        <DatePicker.Input
                            id={feilFom?.id}
                            label={reiseinfoTekster.dato_enkelt.label[locale]}
                            error={feilFom?.melding}
                            {...inputPropsFom}
                        />
                    </DatePicker>
                )}
                {reise.typeReise?.verdi === 'HJEMREISE' && (
                    <VStack gap="space-16">
                        <Heading level="3" size="small">
                            <LocaleTekst tekst={reiseinfoTekster.dato_periode.label} />
                        </Heading>
                        <DatePicker {...datepickerPropsFom}>
                            <DatePicker.Input
                                id={feilFom?.id}
                                label={reiseinfoTekster.dato_periode.fom[locale]}
                                error={feilFom?.melding}
                                {...inputPropsFom}
                            />
                        </DatePicker>
                        <DatePicker {...datepickerPropsTom}>
                            <DatePicker.Input
                                id={feilTom?.id}
                                label={reiseinfoTekster.dato_periode.tom[locale]}
                                error={feilTom?.melding}
                                {...inputPropsTom}
                            />
                        </DatePicker>
                    </VStack>
                )}

                {reise.typeReise?.verdi && (
                    <>
                        <Skillelinje />
                        <Reisemåte
                            samlingId={reise._id}
                            reisemåte={reise.reisemåte}
                            settReisemåte={settReisemåte}
                            tekster={reiseinfoTekster.reisemåte}
                        />
                    </>
                )}
                {onSlett && (
                    <HStack>
                        <Button variant="tertiary" onClick={onSlett} icon={<MinusIcon />}>
                            {reiseinfoTekster.knapp_slett[locale]}
                        </Button>
                    </HStack>
                )}
            </VStack>
        </ReiseBoks>
    );
};

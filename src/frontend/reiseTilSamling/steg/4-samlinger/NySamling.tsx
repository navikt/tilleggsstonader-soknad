import React, { useState } from 'react';

import styled from 'styled-components';

import { MinusIcon } from '@navikt/aksel-icons';
import {
    Button,
    DatePicker,
    Heading,
    HStack,
    InlineMessage,
    useDatepicker,
    VStack,
} from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import { erReiseavstandUnder30km } from './util';
import {
    adresseFeilIderForSamling,
    errorKeyAntallKm,
    errorKeyBrukSammeAdresse,
    errorKeyErObligatorisk,
    errorKeyFom,
    errorKeyTom,
} from './validering';
import { AdresseVelger } from '../../../components/AdresseVelger/AdresseVelger';
import { AlertIkkeRett } from '../../../components/AlertIkkeRett';
import { Skillelinje } from '../../../components/Skillelinje';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTextField } from '../../../components/Teksthåndtering/LocaleTextField';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Adresse, Samling } from '../../../typer/søknad';
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
    erFørste: boolean;
    oppdater: (id: number, key: keyof Samling, verdi: unknown) => void;
    onSlett?: () => void;
    visValideringsfeil?: boolean;
}> = ({ samling, erFørste, oppdater, onSlett, visValideringsfeil = true }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const keyFom = errorKeyFom(samling._id);
    const keyTom = errorKeyTom(samling._id);
    const keyErObligatorisk = errorKeyErObligatorisk(samling._id);
    const keyBrukSammeAdresse = errorKeyBrukSammeAdresse(samling._id);
    const keyAntallKm = errorKeyAntallKm(samling._id);
    const adresseFeilIder = adresseFeilIderForSamling(samling._id);

    const [visAdvarselKmAvstand, setVisAdvarselKmAvstand] = useState(false);

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (visValideringsfeil && harVerdi(verdi)) {
            settValideringsfeil((prevState) => ({ ...prevState, [errorKey]: undefined }));
        }
    };

    const feilFom = visValideringsfeil ? valideringsfeil[keyFom] : undefined;
    const feilTom = visValideringsfeil ? valideringsfeil[keyTom] : undefined;
    const feilErObligatorisk = visValideringsfeil ? valideringsfeil[keyErObligatorisk] : undefined;
    const feilBrukSammeAdresse = visValideringsfeil
        ? valideringsfeil[keyBrukSammeAdresse]
        : undefined;

    const feilAntallKm = visValideringsfeil ? valideringsfeil[keyAntallKm] : undefined;

    const oppdaterAdresse = (felt: Partial<Adresse>) =>
        oppdater(samling._id, 'adresse', { ...samling.adresse, ...felt });

    const håndterAdresseEndring = (felt: Partial<Adresse>, feltNavn: keyof Adresse) => {
        oppdaterAdresse(felt);
        nullstillFeil(felt[feltNavn]?.verdi, adresseFeilIder[feltNavn]);
    };

    const gjenbrukerAdresse = !erFørste && samling._brukSammeAdresseSomForrige?.verdi === 'JA';

    const { datepickerProps: dpPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(samling.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? {
                      label: samlingerTekster.dato.fom[locale],
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
                      label: samlingerTekster.dato.tom[locale],
                      verdi: tilLocaleDateString(val),
                  }
                : undefined;
            oppdater(samling._id, 'tom', verdi);
            nullstillFeil(verdi?.verdi, keyTom);
        },
    });

    return (
        <SamlingBoks>
            <VStack gap="space-40">
                <VStack gap="space-24">
                    <DatePicker {...dpPropsFom}>
                        <DatePicker.Input
                            id={feilFom?.id}
                            label={samlingerTekster.dato.fom[locale]}
                            error={feilFom?.melding}
                            description={samlingerTekster.dato.description_fom?.[locale]}
                            {...inputPropsFom}
                        />
                    </DatePicker>
                    <DatePicker {...dpPropsTom}>
                        <DatePicker.Input
                            id={feilTom?.id}
                            label={samlingerTekster.dato.tom[locale]}
                            error={feilTom?.melding}
                            {...inputPropsTom}
                        />
                    </DatePicker>
                </VStack>

                <VStack gap="space-16">
                    <LocaleRadioGroup
                        tekst={samlingerTekster.radio_samling_obligatorisk}
                        value={samling.erObligatorisk?.verdi || ''}
                        onChange={(verdi) => {
                            oppdater(samling._id, 'erObligatorisk', verdi);
                            nullstillFeil(verdi?.verdi, keyErObligatorisk);
                        }}
                        error={feilErObligatorisk?.melding}
                    />

                    {samling.erObligatorisk?.verdi === 'JA' && (
                        <InlineMessage status="info">
                            {samlingerTekster.samling_obligatorisk_alert_dokumentasjon[locale]}
                        </InlineMessage>
                    )}

                    {samling.erObligatorisk?.verdi === 'NEI' && (
                        <AlertIkkeRett
                            beskrivelse={samlingerTekster.samling_obligatorisk_alert_ikke_rett}
                        />
                    )}
                </VStack>

                <VStack gap="space-16">
                    <LocaleTextField
                        id={feilAntallKm?.id}
                        tekst={samlingerTekster.antall_km}
                        inputMode="numeric"
                        value={samling.antallKilometerEnVei?.verdi ?? ''}
                        error={feilAntallKm?.melding}
                        onChange={(e) => {
                            const verdi = e.target.value;
                            oppdater(samling._id, 'antallKilometerEnVei', {
                                label: samlingerTekster.antall_km.label[locale],
                                verdi,
                            });
                            nullstillFeil(verdi, keyAntallKm);
                        }}
                        onBlur={() => setVisAdvarselKmAvstand(true)}
                        htmlSize={5}
                    />

                    {visAdvarselKmAvstand && erReiseavstandUnder30km(samling) && (
                        <AlertIkkeRett beskrivelse={samlingerTekster.advarsel_antall_km_for_lav} />
                    )}
                </VStack>

                <Skillelinje />

                {!erFørste && (
                    <LocaleRadioGroup
                        id={feilBrukSammeAdresse?.id}
                        tekst={samlingerTekster.radio_brukSammeAdresseSomForrige}
                        value={samling._brukSammeAdresseSomForrige?.verdi || ''}
                        onChange={(verdi) => {
                            oppdater(samling._id, '_brukSammeAdresseSomForrige', verdi);
                            nullstillFeil(verdi?.verdi, keyBrukSammeAdresse);
                        }}
                        error={feilBrukSammeAdresse?.melding}
                    />
                )}
                {!gjenbrukerAdresse && (
                    <VStack gap="space-16">
                        <Heading size="small">{samlingerTekster.adresse_tittel[locale]}</Heading>
                        <AdresseVelger
                            adresse={samling.adresse}
                            onChange={håndterAdresseEndring}
                            tekster={samlingerTekster.adresse_spørsmål}
                            feil={visValideringsfeil ? valideringsfeil : undefined}
                            feilIder={adresseFeilIder}
                        />
                    </VStack>
                )}

                <Skillelinje />

                {/* TODO: Spørsmål om reisemåte inn her */}

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

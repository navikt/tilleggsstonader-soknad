import { MinusIcon } from '@navikt/aksel-icons';
import {
    Alert,
    BodyShort,
    Button,
    DatePicker,
    Heading,
    HStack,
    InlineMessage,
    TextField,
    useDatepicker,
    VStack
} from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';
import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Landvelger } from '../../../components/Landvelger/Landvelger';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import type { Adresse, Samling } from '../../../typer/søknad';
import { nullableTilDato, tilLocaleDateString } from '../../../utils/formateringUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { samlingerTekster } from '../../tekster/samlinger';
import {
    errorKeyAntallKm,
    errorKeyBrukSammeAdresse,
    errorKeyErObligatorisk,
    errorKeyFom,
    errorKeyGateadresse,
    errorKeyHarBruktEkstraReiseDager,
    errorKeyLand,
    errorKeyPostnummer,
    errorKeyPoststed,
    errorKeyTom
} from './validering';

const SamlingBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

const PostnummerFelt = styled(TextField)`
    max-width: 6rem;
`;

const KmFelt = styled(TextField)`
    input {
        width: 6rem;
    }
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
    const keyHarBruktEkstraReiseDager = errorKeyHarBruktEkstraReiseDager(samling._id);
    const keyBrukSammeAdresse = errorKeyBrukSammeAdresse(samling._id);
    const keyLand = errorKeyLand(samling._id);
    const keyGateadresse = errorKeyGateadresse(samling._id);
    const keyPostnummer = errorKeyPostnummer(samling._id);
    const keyPoststed = errorKeyPoststed(samling._id);
    const keyAntallKm = errorKeyAntallKm(samling._id);

    const [visAdvarsel, setVisAdvarsel] = useState(false);

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (visValideringsfeil && harVerdi(verdi)) {
            settValideringsfeil((prevState) => ({ ...prevState, [errorKey]: undefined }));
        }
    };

    const feilFom = visValideringsfeil ? valideringsfeil[keyFom] : undefined;
    const feilTom = visValideringsfeil ? valideringsfeil[keyTom] : undefined;
    const feilErObligatorisk = visValideringsfeil ? valideringsfeil[keyErObligatorisk] : undefined;
    const feilHarBruktEkstraReiseDager = visValideringsfeil
        ? valideringsfeil[keyHarBruktEkstraReiseDager]
        : undefined;
    const feilBrukSammeAdresse = visValideringsfeil
        ? valideringsfeil[keyBrukSammeAdresse]
        : undefined;
    const feilLand = visValideringsfeil ? valideringsfeil[keyLand] : undefined;
    const feilGateadresse = visValideringsfeil ? valideringsfeil[keyGateadresse] : undefined;
    const feilPostnummer = visValideringsfeil ? valideringsfeil[keyPostnummer] : undefined;
    const feilPoststed = visValideringsfeil ? valideringsfeil[keyPoststed] : undefined;
    const feilAntallKm = visValideringsfeil ? valideringsfeil[keyAntallKm] : undefined;

    const oppdaterAdresse = (felt: Partial<Adresse>) =>
        oppdater(samling._id, 'adresse', { ...samling.adresse, ...felt });

    const gjenbrukerAdresse = !erFørste && samling._brukSammeAdresseSomForrige?.verdi === 'JA';

    const km = samling.antallKilometerEnVei?.verdi;
    const visAdvarselForLavAvstand =
        visAdvarsel && !Number.isNaN(Number(km)) && Number(km) > 0 && Number(km) < 30;

    const { datepickerProps: dpPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(samling.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? {
                      label: samlingerTekster.startdato_label[locale],
                      verdi: tilLocaleDateString(val)
                  }
                : undefined;
            oppdater(samling._id, 'fom', verdi);
            nullstillFeil(verdi?.verdi, keyFom);
        }
    });

    const { datepickerProps: dpPropsTom, inputProps: inputPropsTom } = useDatepicker({
        defaultSelected: nullableTilDato(samling.tom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? {
                      label: samlingerTekster.sluttdato_label[locale],
                      verdi: tilLocaleDateString(val)
                  }
                : undefined;
            oppdater(samling._id, 'tom', verdi);
            nullstillFeil(verdi?.verdi, keyTom);
        }
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
                        <BodyShort weight="semibold">
                            {samlingerTekster.adresse_tittel[locale]}
                        </BodyShort>
                        <Landvelger
                            id={feilLand?.id}
                            label={samlingerTekster.velg_land_label}
                            value={samling.adresse?.land?.verdi}
                            onChange={(verdi) => {
                                oppdaterAdresse({ land: verdi });
                                nullstillFeil(verdi.verdi, keyLand);
                            }}
                            medNorskeOmråder={true}
                            error={feilLand?.melding}
                            defaultNorge
                        />
                        <TextField
                            id={feilGateadresse?.id}
                            label={samlingerTekster.gateadresse_label[locale]}
                            value={samling.adresse?.gateadresse?.verdi ?? ''}
                            error={feilGateadresse?.melding}
                            onChange={(e) => {
                                const verdi = e.target.value;
                                oppdaterAdresse({
                                    gateadresse: {
                                        label: samlingerTekster.gateadresse_label[locale],
                                        verdi
                                    }
                                });
                                nullstillFeil(verdi, keyGateadresse);
                            }}
                        />
                        <PostnummerFelt
                            id={feilPostnummer?.id}
                            label={samlingerTekster.postnummer_label[locale]}
                            value={samling.adresse?.postnummer?.verdi ?? ''}
                            error={feilPostnummer?.melding}
                            inputMode="numeric"
                            onChange={(e) => {
                                const verdi = e.target.value;
                                oppdaterAdresse({
                                    postnummer: {
                                        label: samlingerTekster.postnummer_label[locale],
                                        verdi
                                    }
                                });
                                nullstillFeil(verdi, keyPostnummer);
                            }}
                        />
                        <TextField
                            id={feilPoststed?.id}
                            label={samlingerTekster.poststed_label[locale]}
                            value={samling.adresse?.poststed?.verdi ?? ''}
                            error={feilPoststed?.melding}
                            onChange={(e) => {
                                const verdi = e.target.value;
                                oppdaterAdresse({
                                    poststed: {
                                        label: samlingerTekster.poststed_label[locale],
                                        verdi
                                    }
                                });
                                nullstillFeil(verdi, keyPoststed);
                            }}
                        />
                        <KmFelt
                            id={feilAntallKm?.id}
                            label={samlingerTekster.antall_km_label[locale]}
                            description={samlingerTekster.antall_km_beskrivelse[locale]}
                            inputMode="numeric"
                            value={samling.antallKilometerEnVei?.verdi ?? ''}
                            error={feilAntallKm?.melding}
                            onChange={(e) => {
                                const verdi = e.target.value;
                                oppdater(samling._id, 'antallKilometerEnVei', {
                                    label: samlingerTekster.antall_km_label[locale],
                                    verdi
                                });
                                nullstillFeil(verdi, keyAntallKm);
                            }}
                            onBlur={() => setVisAdvarsel(true)}
                        />
                        {visAdvarselForLavAvstand && (
                            <Alert variant="info">
                                <Heading size="small">
                                    {samlingerTekster.advarsel_antall_km_for_lav_tittel[locale]}
                                </Heading>
                                {samlingerTekster.advarsel_antall_km_for_lav[locale]}
                            </Alert>
                        )}
                    </VStack>
                )}
                <LocaleRadioGroup
                    tekst={samlingerTekster.radio_samling_obligatorisk}
                    value={samling.erObligatorisk?.verdi || ''}
                    onChange={(verdi) => {
                        oppdater(samling._id, 'erObligatorisk', verdi);
                        nullstillFeil(verdi?.verdi, keyErObligatorisk);
                    }}
                    error={feilErObligatorisk?.melding}
                />
                <LocaleRadioGroup
                    tekst={samlingerTekster.radio_ekstra_reisedag}
                    value={samling.harBruktEkstraReiseDager?.verdi || ''}
                    onChange={(verdi) => {
                        oppdater(samling._id, 'harBruktEkstraReiseDager', verdi);
                        nullstillFeil(verdi?.verdi, keyHarBruktEkstraReiseDager);
                    }}
                    error={feilHarBruktEkstraReiseDager?.melding}
                />
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

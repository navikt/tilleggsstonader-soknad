import React from 'react';

import { DatePicker, HStack, Label, Select, VStack, useDatepicker } from '@navikt/ds-react';

import { landkoder } from './landkoder';
import LocaleCheckboxGroup from '../../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { OppholdUtenforNorge, ÅrsakOppholdUtenforNorge } from '../../../../typer/søknad';
import { Locale } from '../../../../typer/tekst';
import { nullableTilDato, tilLocaleDateString } from '../../../../utils/formatering';
import { harVerdi } from '../../../../utils/typer';
import { OppholdUtenforNorgeInnhold } from '../../../tekster/hovedytelse';

const Opphold: React.FC<{
    opphold: OppholdUtenforNorge;
    oppdater: <T extends OppholdUtenforNorge, K extends keyof T>(
        id: number,
        key: K,
        verdi: T[K]
    ) => void;
    tekster: OppholdUtenforNorgeInnhold;
    locale: Locale;
}> = ({ opphold, oppdater, tekster, locale }) => {
    const { datepickerProps: datepickerPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(opphold.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? { label: tekster.dato.fom[locale], verdi: tilLocaleDateString(val) }
                : undefined;
            oppdater(opphold._id, 'fom', verdi);
            //resettFeilmelding();
        },
    });

    const { datepickerProps: datepickerPropsTom, inputProps: inputPropsTom } = useDatepicker({
        defaultSelected: nullableTilDato(opphold.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? { label: tekster.dato.tom[locale], verdi: tilLocaleDateString(val) }
                : undefined;
            oppdater(opphold._id, 'tom', verdi);
            //resettFeilmelding();
        },
    });

    const oppdatertHvilketLandOppholdUtenforNorge = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (harVerdi(e.target.value)) {
            oppdater(opphold._id, 'land', {
                label: tekster.select_hvilket_land[locale],
                verdi: e.target.value,
                svarTekst: landkoder[e.target.value] || 'Finner ikke mapping',
            });
        } else {
            oppdater(opphold._id, 'land', undefined);
        }
    };

    return (
        <>
            <Select
                //id={valideringsfeil.hvilketLandOppholdUtenforNorge?.id}
                label={tekster.select_hvilket_land[locale]}
                onChange={oppdatertHvilketLandOppholdUtenforNorge}
                value={opphold.land?.verdi || ''}
                //error={valideringsfeil.hvilketLandOppholdUtenforNorge?.melding}
            >
                <option value="">Velg land</option>
                {Object.entries(landkoder).map(([kode, tekst]) => (
                    <option value={kode}>{tekst}</option>
                ))}
            </Select>
            <LocaleCheckboxGroup
                //id={valideringsfeil.oppholdUtenforNorgeÅrsak?.id}
                tekst={tekster.checkbox_årsak}
                value={opphold.årsak?.verdier || []}
                onChange={(verdi: EnumFlereValgFelt<ÅrsakOppholdUtenforNorge>) =>
                    oppdater(opphold._id, 'årsak', verdi)
                }
                //error={valideringsfeil.oppholdUtenforNorgeÅrsak?.melding}
            />
            <VStack>
                <Label>{tekster.dato.label[locale]}</Label>
                <HStack gap={'4'}>
                    <DatePicker {...datepickerPropsFom}>
                        <DatePicker.Input
                            {...inputPropsFom}
                            label={tekster.dato.fom[locale]}
                            //error={valideringsfeil && <LocaleTekst tekst={valideringsfeil} />}
                        />
                    </DatePicker>
                    <DatePicker {...datepickerPropsTom}>
                        <DatePicker.Input
                            {...inputPropsTom}
                            label={tekster.dato.tom[locale]}
                            //error={valideringsfeil && <LocaleTekst tekst={valideringsfeil} />}
                        />
                    </DatePicker>
                </HStack>
            </VStack>
        </>
    );
};

export default Opphold;

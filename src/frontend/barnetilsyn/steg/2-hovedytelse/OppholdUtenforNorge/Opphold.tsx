import React from 'react';

import { DatePicker, HStack, Label, Select, VStack, useDatepicker } from '@navikt/ds-react';

import { landkoder } from './landkoder';
import { OppdatertOppholdFelt } from './typer';
import LocaleCheckboxGroup from '../../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { OppholdUtenforNorge, ÅrsakOppholdUtenforNorge } from '../../../../typer/søknad';
import { Locale } from '../../../../typer/tekst';
import { nullableTilDato, tilLocaleDateString } from '../../../../utils/formatering';
import { OppholdUtenforNorgeInnhold } from '../../../tekster/hovedytelse';
import { errorKeyFom, errorKeyLand, errorKeyTom, errorKeyÅrsak } from '../validering';

const Opphold: React.FC<{
    opphold: OppholdUtenforNorge;
    oppdater: OppdatertOppholdFelt;
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
        oppdater(opphold._id, 'land', {
            label: tekster.select_hvilket_land[locale],
            verdi: e.target.value || '',
            svarTekst: landkoder[e.target.value] || '',
        });
    };

    return (
        <>
            <Select
                id={errorKeyLand(opphold)}
                label={tekster.select_hvilket_land[locale]}
                onChange={oppdatertHvilketLandOppholdUtenforNorge}
                value={opphold.land?.verdi || ''}
                //error={vali}
            >
                <option value="">Velg land</option>
                {Object.entries(landkoder).map(([kode, tekst]) => (
                    <option value={kode}>{tekst}</option>
                ))}
            </Select>
            <LocaleCheckboxGroup
                id={errorKeyÅrsak(opphold)}
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
                            id={errorKeyFom(opphold)}
                            label={tekster.dato.fom[locale]}
                            //error={valideringsfeil && <LocaleTekst tekst={valideringsfeil} />}
                            {...inputPropsFom}
                        />
                    </DatePicker>
                    <DatePicker {...datepickerPropsTom}>
                        <DatePicker.Input
                            id={errorKeyTom(opphold)}
                            label={tekster.dato.tom[locale]}
                            //error={valideringsfeil && <LocaleTekst tekst={valideringsfeil} />}
                            {...inputPropsTom}
                        />
                    </DatePicker>
                </HStack>
            </VStack>
        </>
    );
};

export default Opphold;

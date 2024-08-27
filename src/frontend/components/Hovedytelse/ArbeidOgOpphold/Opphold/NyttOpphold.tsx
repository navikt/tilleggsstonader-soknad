import React from 'react';

import { DatePicker, HStack, Label, useDatepicker, VStack } from '@navikt/ds-react';

import { OppdatertOppholdFelt } from './typer';
import { errorKeyFom, errorKeyLand, errorKeyTom, errorKeyÅrsak } from './validering';
import { OppholdInnhold } from '../../../../barnetilsyn/tekster/opphold';
import { SelectFelt, EnumFlereValgFelt } from '../../../../typer/skjema';
import {
    ArbeidOgOpphold,
    OppholdUtenforNorge,
    ÅrsakOppholdUtenforNorge,
} from '../../../../typer/søknad';
import { Locale } from '../../../../typer/tekst';
import { Valideringsfeil } from '../../../../typer/validering';
import { nullableTilDato, tilLocaleDateString } from '../../../../utils/formatering';
import { harVerdi } from '../../../../utils/typer';
import Landvelger from '../../../Landvelger/Landvelger';
import LocaleCheckboxGroup from '../../../Teksthåndtering/LocaleCheckboxGroup';

const NyttOpphold: React.FC<{
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >;
    opphold: OppholdUtenforNorge;
    oppdater: OppdatertOppholdFelt;
    tekster: OppholdInnhold;
    locale: Locale;
    valideringsfeil: Valideringsfeil;
    settValideringsfeil: React.Dispatch<React.SetStateAction<Valideringsfeil>>;
}> = ({ keyOpphold, opphold, oppdater, tekster, locale, valideringsfeil, settValideringsfeil }) => {
    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (harVerdi(verdi)) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                [errorKey]: undefined,
            }));
        }
    };

    const { datepickerProps: datepickerPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(opphold.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? { label: tekster.dato.fom[locale], verdi: tilLocaleDateString(val) }
                : undefined;
            oppdater(opphold._id, 'fom', verdi);
            nullstillFeil(verdi?.verdi, errorKeyFom(keyOpphold));
        },
    });

    const { datepickerProps: datepickerPropsTom, inputProps: inputPropsTom } = useDatepicker({
        defaultSelected: nullableTilDato(opphold.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val
                ? { label: tekster.dato.tom[locale], verdi: tilLocaleDateString(val) }
                : undefined;
            oppdater(opphold._id, 'tom', verdi);
            nullstillFeil(verdi?.verdi, errorKeyTom(keyOpphold));
        },
    });

    const oppdatertHvilketLandOppholdUtenforNorge = (verdi: SelectFelt) => {
        oppdater(opphold._id, 'land', verdi);
        nullstillFeil(verdi.verdi, errorKeyLand(keyOpphold));
    };

    const oppdaterÅrsak = (verdi: EnumFlereValgFelt<ÅrsakOppholdUtenforNorge>) => {
        oppdater(opphold._id, 'årsak', verdi);
        if (verdi.verdier.length > 0) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                [errorKeyÅrsak(keyOpphold)]: undefined,
            }));
        }
    };

    return (
        <>
            <Landvelger
                id={valideringsfeil[errorKeyLand(keyOpphold)]?.id}
                label={tekster.select_hvilket_land}
                onChange={oppdatertHvilketLandOppholdUtenforNorge}
                value={opphold.land?.verdi || ''}
                error={valideringsfeil[errorKeyLand(keyOpphold)]?.melding}
                medNorskeOmråder={false}
            />
            <LocaleCheckboxGroup
                id={valideringsfeil[errorKeyÅrsak(keyOpphold)]?.id}
                tekst={tekster.checkbox_årsak}
                value={opphold.årsak?.verdier || []}
                onChange={oppdaterÅrsak}
                error={valideringsfeil[errorKeyÅrsak(keyOpphold)]?.melding}
            />
            <VStack>
                <Label>{tekster.dato.label[locale]}</Label>
                <HStack gap={'4'}>
                    <DatePicker {...datepickerPropsFom}>
                        <DatePicker.Input
                            id={valideringsfeil[errorKeyFom(keyOpphold)]?.id}
                            label={tekster.dato.fom[locale]}
                            error={valideringsfeil[errorKeyFom(keyOpphold)]?.melding}
                            {...inputPropsFom}
                        />
                    </DatePicker>
                    <DatePicker {...datepickerPropsTom}>
                        <DatePicker.Input
                            id={valideringsfeil[errorKeyTom(keyOpphold)]?.id}
                            label={tekster.dato.tom[locale]}
                            error={valideringsfeil[errorKeyTom(keyOpphold)]?.melding}
                            {...inputPropsTom}
                        />
                    </DatePicker>
                </HStack>
            </VStack>
        </>
    );
};

export default NyttOpphold;

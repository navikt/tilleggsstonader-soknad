import React from 'react';

import { HStack, Label, VStack } from '@navikt/ds-react';

import { OppdatertOppholdFelt } from './typer';
import { errorKeyFom, errorKeyLand, errorKeyTom, errorKeyÅrsak } from './validering';
import { useValideringsfeil } from '../../../../context/ValideringsfeilContext';
import { OppholdInnhold } from '../../../../passAvBarn/tekster/opphold';
import { SelectFelt, EnumFlereValgFelt } from '../../../../typer/skjema';
import {
    ArbeidOgOpphold,
    OppholdUtenforNorge,
    ÅrsakOppholdUtenforNorge,
} from '../../../../typer/søknad';
import { Locale } from '../../../../typer/tekst';
import { harVerdi } from '../../../../utils/typeUtils';
import { DateInput } from '../../../DateInput';
import { Landvelger } from '../../../Landvelger/Landvelger';
import { LocaleCheckboxGroup } from '../../../Teksthåndtering/LocaleCheckboxGroup';

export const NyttOpphold: React.FC<{
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >;
    opphold: OppholdUtenforNorge;
    oppdater: OppdatertOppholdFelt;
    tekster: OppholdInnhold;
    locale: Locale;
}> = ({ keyOpphold, opphold, oppdater, tekster, locale }) => {
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (harVerdi(verdi)) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                [errorKey]: undefined,
            }));
        }
    };

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
                label={tekster.select_hvilket_land.label}
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
                <HStack gap="space-16">
                    <DateInput
                        id={valideringsfeil[errorKeyFom(keyOpphold)]?.id}
                        label={tekster.dato.fom[locale]}
                        value={opphold.fom?.verdi}
                        error={valideringsfeil[errorKeyFom(keyOpphold)]?.melding}
                        onChange={(date) => {
                            const verdi = date
                                ? { label: tekster.dato.fom[locale], verdi: date }
                                : undefined;
                            oppdater(opphold._id, 'fom', verdi);
                            nullstillFeil(verdi?.verdi, errorKeyFom(keyOpphold));
                        }}
                    />
                    <DateInput
                        id={valideringsfeil[errorKeyTom(keyOpphold)]?.id}
                        label={tekster.dato.tom[locale]}
                        value={opphold.tom?.verdi}
                        error={valideringsfeil[errorKeyTom(keyOpphold)]?.melding}
                        onChange={(date) => {
                            const verdi = date
                                ? { label: tekster.dato.tom[locale], verdi: date }
                                : undefined;
                            oppdater(opphold._id, 'tom', verdi);
                            nullstillFeil(verdi?.verdi, errorKeyTom(keyOpphold));
                        }}
                    />
                </HStack>
            </VStack>
        </>
    );
};

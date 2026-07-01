import React from 'react';

import { Box, List } from '@navikt/ds-react';

import { aktivitetTekster } from '../../barnetilsyn/tekster/aktivitet';
import { AnnenAktivitetType } from '../../typer/aktivitet';
import { EnumFelt } from '../../typer/skjema';
import { RadiogruppeMedUtvalg } from '../../typer/tekst';
import { Feilmelding } from '../../typer/validering';
import { LocaleInlineLenke } from '../Teksthåndtering/LocaleInlineLenke';
import { LocaleRadioGroup } from '../Teksthåndtering/LocaleRadioGroup';
import {
    LocaleReadMoreMedChildren,
    LocaleReadMoreMedLenke,
} from '../Teksthåndtering/LocaleReadMore';
import { LocaleTekstAvsnitt } from '../Teksthåndtering/LocaleTekstAvsnitt';

interface Props {
    tekst: RadiogruppeMedUtvalg<AnnenAktivitetType>;
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    oppdaterAnnenAktivitet: (verdi: EnumFelt<AnnenAktivitetType>) => void;
    feilmelding: Feilmelding | undefined;
}

export const AnnenArbeidsrettetAktivitet: React.FC<Props> = ({
    tekst,
    annenAktivitet,
    oppdaterAnnenAktivitet,
    feilmelding,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={tekst}
                onChange={oppdaterAnnenAktivitet}
                value={annenAktivitet?.verdi || []}
                error={feilmelding?.melding}
            >
                <LocaleReadMoreMedChildren
                    header={aktivitetTekster.radio_annet_lesmer_hva_betyr_alternativene.header}
                >
                    <LocaleTekstAvsnitt
                        tekst={
                            aktivitetTekster.radio_annet_lesmer_hva_betyr_alternativene.innhold.del1
                        }
                    />
                    <Box marginBlock="space-16" asChild>
                        <List>
                            {aktivitetTekster.radio_annet_lesmer_hva_betyr_alternativene.innhold.del2_lenker.map(
                                (lenke, indeks) => (
                                    <List.Item key={indeks}>
                                        <LocaleInlineLenke tekst={lenke} />
                                    </List.Item>
                                )
                            )}
                        </List>
                    </Box>
                </LocaleReadMoreMedChildren>
            </LocaleRadioGroup>
            <LocaleReadMoreMedLenke tekst={aktivitetTekster.radio_annet_lesmer} />
        </div>
    );
};

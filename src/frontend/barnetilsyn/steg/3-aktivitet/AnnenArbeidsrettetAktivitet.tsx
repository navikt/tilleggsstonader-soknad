import React from 'react';

import { Box, List } from '@navikt/ds-react';

import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import {
    LocaleReadMoreMedChildren,
    LocaleReadMoreMedLenke,
} from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt } from '../../../typer/skjema';
import { Radiogruppe } from '../../../typer/tekst';
import { Feilmelding } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    tekst: Radiogruppe<AnnenAktivitetType>;
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
                        <List data-aksel-migrated-v8>
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

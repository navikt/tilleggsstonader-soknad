import { Box, List } from '@navikt/ds-react';
import type React from 'react';

import type { AktivitetInnhold } from '../../tekster/aktivitet';
import type { AnnenAktivitetType } from '../../typer/aktivitet';
import type { EnumFelt } from '../../typer/skjema';
import type { RadiogruppeMedUtvalg } from '../../typer/tekst';
import type { Feilmelding } from '../../typer/validering';
import { LocaleInlineLenke } from '../Teksthåndtering/LocaleInlineLenke';
import { LocaleRadioGroup } from '../Teksthåndtering/LocaleRadioGroup';
import {
    LocaleReadMoreMedChildren,
    LocaleReadMoreMedLenke
} from '../Teksthåndtering/LocaleReadMore';
import { LocaleTekstAvsnitt } from '../Teksthåndtering/LocaleTekstAvsnitt';

interface Props {
    aktivitetTekster: AktivitetInnhold;
    radioTekst: RadiogruppeMedUtvalg<AnnenAktivitetType>;
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    oppdaterAnnenAktivitet: (verdi: EnumFelt<AnnenAktivitetType>) => void;
    feilmelding: Feilmelding | undefined;
}

export const AnnenArbeidsrettetAktivitet: React.FC<Props> = ({
    aktivitetTekster,
    radioTekst,
    annenAktivitet,
    oppdaterAnnenAktivitet,
    feilmelding
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={radioTekst}
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

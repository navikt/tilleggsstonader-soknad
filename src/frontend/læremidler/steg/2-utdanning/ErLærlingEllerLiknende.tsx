import React from 'react';

import { BodyLong, Box, VStack } from '@navikt/ds-react';

import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    erLærlingEllerLiknende: EnumFelt<JaNei> | undefined;
    oppdatererLærlingEllerLiknende: (verdi: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
}

export const ErLærlingEllerLiknende: React.FC<Props> = ({
    erLærlingEllerLiknende,
    oppdatererLærlingEllerLiknende,
    feilmelding,
}) => {
    return (
        <Box padding="4" background="bg-subtle">
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={utdanningTekster.radio_lærling_etc}
                onChange={oppdatererLærlingEllerLiknende}
                value={erLærlingEllerLiknende?.verdi || []}
                error={feilmelding?.melding}
            >
                <LocaleReadMoreMedChildren header={utdanningTekster.les_mer_lærling_etc.header}>
                    <VStack gap="5">
                        <BodyLong>
                            <LocaleInlineLenke
                                tekst={utdanningTekster.les_mer_lærling_etc.innhold_lærling}
                            />
                        </BodyLong>
                        <BodyLong>
                            <LocaleInlineLenke
                                tekst={
                                    utdanningTekster.les_mer_lærling_etc
                                        .innhold_lærekandidatordningen
                                }
                            />
                        </BodyLong>
                        <BodyLong>
                            <LocaleInlineLenke
                                tekst={
                                    utdanningTekster.les_mer_lærling_etc
                                        .innhold_praksisbrevkandidater
                                }
                            />
                        </BodyLong>
                        <BodyLong>
                            <LocaleInlineLenke
                                tekst={utdanningTekster.les_mer_lærling_etc.innhold_fagbrev_på_jobb}
                            />
                        </BodyLong>
                    </VStack>
                </LocaleReadMoreMedChildren>
            </LocaleRadioGroup>
        </Box>
    );
};

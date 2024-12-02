import React from 'react';

import { BodyLong, VStack } from '@navikt/ds-react';

import { HarTidligereFullførtVgs } from './HarTidligereFullførtVgs';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    erLærlingEllerLiknende: EnumFelt<JaNei> | undefined;
    oppdatererLærlingEllerLiknende: (verdi: EnumFelt<JaNei>) => void;
    feilmeldingErLærlingEllerLiknende: Feilmelding | undefined;
    harTidligereFullførtVgs: EnumFelt<JaNei> | undefined;
    oppdaterHarTidligereFullførtVgs: (verdi: EnumFelt<JaNei>) => void;
    feilmeldingHarTidligereFullførtVgs: Feilmelding | undefined;
}

export const ErLærlingEllerLiknende: React.FC<Props> = ({
    erLærlingEllerLiknende,
    oppdatererLærlingEllerLiknende,
    feilmeldingErLærlingEllerLiknende,
    harTidligereFullførtVgs,
    oppdaterHarTidligereFullførtVgs,
    feilmeldingHarTidligereFullførtVgs,
}) => {
    return (
        <UnderspørsmålContainer>
            <LocaleRadioGroup
                id={feilmeldingErLærlingEllerLiknende?.id}
                tekst={utdanningTekster.radio_lærling_etc}
                onChange={oppdatererLærlingEllerLiknende}
                value={erLærlingEllerLiknende?.verdi || []}
                error={feilmeldingErLærlingEllerLiknende?.melding}
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
            {erLærlingEllerLiknende?.verdi === 'NEI' && (
                <HarTidligereFullførtVgs
                    harTidligereFullførtVgs={harTidligereFullførtVgs}
                    oppdaterHarTidligereFullførtVgs={oppdaterHarTidligereFullførtVgs}
                    feilmelding={feilmeldingHarTidligereFullførtVgs}
                />
            )}
        </UnderspørsmålContainer>
    );
};

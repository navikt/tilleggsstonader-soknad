import React from 'react';

import { BodyLong, VStack } from '@navikt/ds-react';

import { JaNeiTilTekst } from '../../tekster/felles';
import { EnumFelt } from '../../typer/skjema';
import { JaNei } from '../../typer/søknad';
import { InlineLenke, Radiogruppe, TekstElement } from '../../typer/tekst';
import { Feilmelding } from '../../typer/validering';
import { LocaleInlineLenke } from '../Teksthåndtering/LocaleInlineLenke';
import { LocaleRadioGroup } from '../Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedChildren } from '../Teksthåndtering/LocaleReadMore';

interface Props {
    erLærlingEllerLiknende: EnumFelt<JaNei> | undefined;
    oppdatererLærlingEllerLiknende: (verdi: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
}

interface ErLærlingEllerLiknendeTekster {
    radio_lærling_etc: Radiogruppe<JaNei>;
    radio_lærling_feilmelding: TekstElement<string>;
    les_mer_lærling_etc: {
        header: TekstElement<string>;
        innhold_lærling: TekstElement<InlineLenke>;
        innhold_lærekandidatordningen: TekstElement<InlineLenke>;
        innhold_praksisbrevkandidater: TekstElement<InlineLenke>;
        innhold_fagbrev_på_jobb: TekstElement<InlineLenke>;
    };
}

export const erLærlingEllerLiknendeTekster: ErLærlingEllerLiknendeTekster = {
    radio_lærling_etc: {
        header: {
            nb: 'Er du lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb?',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_lærling_feilmelding: {
        nb: 'Du må svare på om du er lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb.',
    },
    les_mer_lærling_etc: {
        header: {
            nb: 'Hva betyr alternativene?',
        },
        innhold_lærling: {
            nb: [
                'Å være ',
                { tekst: 'lærling', style: 'bold' },
                ' betyr at du utdanner deg til et yrke ved å jobbe i en bedrift, hvor du får både opplæring og praksis i ett fag. ',
                {
                    tekst: 'Les mer om lærlinger på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/laerling-6',
                },
                '.',
            ],
        },
        innhold_lærekandidatordningen: {
            nb: [
                { tekst: 'Lærekandidatordningen', style: 'bold' },
                ' er et alternativ med færre kompetansemål for de som tror det kan bli vanskelig å fullføre et fag- eller svennebrev. ',
                {
                    tekst: 'Les mer om lærekandidatordningen på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/laerekandidat-6',
                },
                '.',
            ],
        },
        innhold_praksisbrevkandidater: {
            nb: [
                { tekst: 'Praksisbrevkandidater', style: 'bold' },
                ' går et toårig opplæringsløp på de yrkesfaglige utdanningsprogrammene. Det er en mer praktisk opplæring, hovedsakelig i bedrift. ',
                {
                    tekst: 'Les mer om praksisbrevkandidater på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/praksisbrevkandidat-6',
                },
                '.',
            ],
        },
        innhold_fagbrev_på_jobb: {
            nb: [
                { tekst: '«Fagbrev på jobb»', style: 'bold' },
                ' er for de som er ufaglært og vil ta fagbrev samtidig som de er i lønnet arbeid. ',
                {
                    tekst: 'Les mer om fagbrev på jobb på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/laerling-6',
                },
                '.',
            ],
        },
    },
};

export const ErLærlingEllerLiknende: React.FC<Props> = ({
    erLærlingEllerLiknende,
    oppdatererLærlingEllerLiknende,
    feilmelding,
}) => {
    return (
        <LocaleRadioGroup
            id={feilmelding?.id}
            tekst={erLærlingEllerLiknendeTekster.radio_lærling_etc}
            onChange={oppdatererLærlingEllerLiknende}
            value={erLærlingEllerLiknende?.verdi || []}
            error={feilmelding?.melding}
        >
            <LocaleReadMoreMedChildren
                header={erLærlingEllerLiknendeTekster.les_mer_lærling_etc.header}
            >
                <VStack gap="space-20">
                    <BodyLong>
                        <LocaleInlineLenke
                            tekst={
                                erLærlingEllerLiknendeTekster.les_mer_lærling_etc.innhold_lærling
                            }
                        />
                    </BodyLong>
                    <BodyLong>
                        <LocaleInlineLenke
                            tekst={
                                erLærlingEllerLiknendeTekster.les_mer_lærling_etc
                                    .innhold_lærekandidatordningen
                            }
                        />
                    </BodyLong>
                    <BodyLong>
                        <LocaleInlineLenke
                            tekst={
                                erLærlingEllerLiknendeTekster.les_mer_lærling_etc
                                    .innhold_praksisbrevkandidater
                            }
                        />
                    </BodyLong>
                    <BodyLong>
                        <LocaleInlineLenke
                            tekst={
                                erLærlingEllerLiknendeTekster.les_mer_lærling_etc
                                    .innhold_fagbrev_på_jobb
                            }
                        />
                    </BodyLong>
                </VStack>
            </LocaleReadMoreMedChildren>
        </LocaleRadioGroup>
    );
};

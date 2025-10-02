import React from 'react';

import { BodyLong, Checkbox, GuidePanel, Heading } from '@navikt/ds-react';

import { OppsummeringUke } from './OppsummeringUke';
import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteSider } from '../../kjørelisteSider';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';
import { VedleggOppsummering } from './VedleggOppsummering';

export const Oppsummeringsside = () => {
    const { rammevedtak } = useKjøreliste();

    return (
        <>
            <Heading size={'medium'} level={'2'}>
                Oppsummering
            </Heading>

            <GuidePanel poster>
                <BodyLong spacing>
                    Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du
                    endre opplysningene.
                </BodyLong>
                <BodyLong>
                    Når du har sendt inn søknaden kommer du til en kvitteringsside med informasjon
                    om veien videre. Der kan du også ettersende dokumentasjon som mangler.
                </BodyLong>
            </GuidePanel>

            {rammevedtak.uker.map((uke) => (
                <OppsummeringUke key={uke.ukeNummer} uke={uke} />
            ))}

            <VedleggOppsummering />

            <Checkbox>
                Jeg er kjent med at jeg kan miste retten til stønad hvis jeg oppgir feilaktige
                opplysninger, og jeg er klar over at jeg må betale tilbake hvis jeg får utbetalt mer
                enn jeg har krav på. Jeg aksepterer også at NAV kan innhente opplysninger som er
                nødvendige for å behandle søknaden min.
            </Checkbox>

            <KjørelisteNavigasjonsKnapper
                nesteSide={KjørelisteSider.KVITTERING}
                forrigeSide={KjørelisteSider.VEDLEGG}
            />
        </>
    );
};

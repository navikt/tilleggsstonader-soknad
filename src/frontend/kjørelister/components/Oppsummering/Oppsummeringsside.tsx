import React, { ChangeEvent, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { BodyLong, Checkbox, ErrorMessage, GuidePanel, Heading, HStack } from '@navikt/ds-react';

import { OppsummeringUke } from './OppsummeringUke';
import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';
import { VedleggOppsummering } from './VedleggOppsummering';
import { sendInnKjøreliste } from '../../../api/api';
import { finnPath, KjørelisteRoutes } from '../../kjørelisteRoutes';

export const Oppsummeringsside = () => {
    const navigate = useNavigate();
    const kjørelisteId = useParams<{ kjorelisteId: string }>().kjorelisteId as string;

    const [brukerAkseptererVilkår, settBrukerAkseptererVilkår] = useState(false);
    const [brukerAkseptererIkkeVilkårFeil, settBrukerAkseptererIkkeVilkårfeil] = useState(false);

    const { rammevedtak, kjøreliste } = useKjøreliste();

    const {
        mutate: sendInnKjørelisteMutation,
        isPending: laster,
        error,
    } = useMutation({
        mutationFn: () => sendInnKjøreliste(kjøreliste),
        onSuccess: (res) => {
            navigate(finnPath(kjørelisteId, KjørelisteRoutes.KVITTERING), {
                state: {
                    mottattTidspunkt: res.mottattTidspunkt,
                    saksnummer: res.saksnummer,
                },
            });
        },
    });

    const håndterSendInnKjøreliste = () => {
        if (brukerAkseptererVilkår) {
            sendInnKjørelisteMutation();
        } else {
            settBrukerAkseptererIkkeVilkårfeil(true);
        }
    };

    const håndterBrukerAkseptererVilkår = (event: ChangeEvent<HTMLInputElement>) => {
        settBrukerAkseptererIkkeVilkårfeil(false);
        settBrukerAkseptererVilkår(event.target.checked);
    };

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

            <HStack>
                <Checkbox
                    onChange={håndterBrukerAkseptererVilkår}
                    error={brukerAkseptererIkkeVilkårFeil}
                >
                    Jeg er kjent med at jeg kan miste retten til stønad hvis jeg oppgir feilaktige
                    opplysninger, og jeg er klar over at jeg må betale tilbake hvis jeg får utbetalt
                    mer enn jeg har krav på. Jeg aksepterer også at NAV kan innhente opplysninger
                    som er nødvendige for å behandle søknaden min.
                </Checkbox>
                {brukerAkseptererIkkeVilkårFeil && (
                    <ErrorMessage showIcon={true}>
                        Du må fylle ut: Jeg er kjent med at jeg kan miste retten til stønad hvis jeg
                        oppgir feilaktige opplysninger, og jeg er klar over at jeg må betale tilbake
                        hvis jeg får utbetalt mer enn jeg har krav på. Jeg aksepterer også at NAV
                        kan innhente opplysninger som er nødvendige for å behandle søknaden min.
                    </ErrorMessage>
                )}
            </HStack>

            <KjørelisteNavigasjonsKnapper
                nesteSide={KjørelisteRoutes.KVITTERING}
                forrigeSide={KjørelisteRoutes.VEDLEGG}
                laster={laster}
                sendInnKjøreliste={håndterSendInnKjøreliste}
                innsendingFeilet={!!error}
            />
        </>
    );
};

import React, { ChangeEvent, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { BodyLong, Checkbox, ErrorMessage, GuidePanel, Heading, HStack } from '@navikt/ds-react';

import { OppsummeringUke } from './OppsummeringUke';
import { VedleggOppsummering } from './VedleggOppsummering';
import { sendInnKjøreliste } from '../../../api/api';
import { useKjøreliste } from '../../KjørelisteContext';
import { finnPath, KjørelisteRoutes } from '../../kjørelisteRoutes';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';

export const Oppsummeringsside = () => {
    const navigate = useNavigate();
    const reiseId = useParams<{ reiseId: string }>().reiseId as string;

    const [brukerAkseptererVilkår, settBrukerAkseptererVilkår] = useState(false);
    const [brukerAkseptererIkkeVilkårFeil, settBrukerAkseptererIkkeVilkårfeil] = useState(false);

    const { kjøreliste } = useKjøreliste();

    const {
        mutate: sendInnKjørelisteMutation,
        isPending: laster,
        error,
    } = useMutation({
        mutationFn: () => {
            const kjørelisteMedKjørteDager = {
                ...kjøreliste,
                reisedagerPerUkeAvsnitt: kjøreliste.reisedagerPerUkeAvsnitt.filter((uke) =>
                    uke.reisedager.some((reisedag) => reisedag.harKjørt)
                ),
            };
            return sendInnKjøreliste(kjørelisteMedKjørteDager);
        },
        onSuccess: (res) => {
            navigate(finnPath(reiseId, KjørelisteRoutes.KVITTERING), {
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

            {kjøreliste.reisedagerPerUkeAvsnitt.map((uke) => (
                <OppsummeringUke key={uke.ukeLabel} ukeMedReisedager={uke} />
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

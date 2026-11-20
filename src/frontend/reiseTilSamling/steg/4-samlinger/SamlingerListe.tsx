import React, { useState } from 'react';

import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';

import { LagretSamlingVisning } from './LagretSamlingVisning';
import { NySamling } from './NySamling';
import { oppdaterSamling, opprettSamlingForNesteId, synkroniserGjenbrukAdresser } from './util';
import { nullstillteSamlingsfeil, validerSamlingUnderRedigering } from './validering';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Samling } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { samlingerTekster } from '../../tekster/samlinger';

export const SamlingerListe: React.FC<{
    samlinger: Samling[];
    settSamlinger: React.Dispatch<React.SetStateAction<Samling[]>>;
}> = ({ samlinger, settSamlinger }) => {
    const { locale } = useSpråk();
    const { settValideringsfeil } = useValideringsfeil();
    const [redigerSamlingId, settRedigerSamlingId] = useState<number | undefined>(undefined);

    const ulagretSamling = samlinger.find((s) => !s.lagret);
    const lagredeSamlinger = samlinger.filter((s) => s.lagret);
    const førsteSamlingId = Math.min(...samlinger.map((s) => s._id));
    const kanSletteSamling = (id: number) => id !== førsteSamlingId;

    const oppdaterSamlingFelt = (id: number, key: keyof Samling, verdi: unknown) => {
        settSamlinger((prev) =>
            synkroniserGjenbrukAdresser(
                oppdaterSamling(prev, id, key as keyof Samling, verdi as never)
            )
        );
    };

    const lagreSamling = (samlingId: number) => {
        const samlingSomSkalLagres = samlinger.find((s) => s._id === samlingId);
        if (!samlingSomSkalLagres) {
            return;
        }

        const feil = validerSamlingUnderRedigering(
            samlingSomSkalLagres,
            locale,
            samlingSomSkalLagres._id === førsteSamlingId
        );
        if (inneholderFeil(feil)) {
            settValideringsfeil((prevState) => ({ ...prevState, ...feil }));
            return;
        }

        settSamlinger((prev) =>
            synkroniserGjenbrukAdresser(
                prev.map((samling) =>
                    samling._id === samlingId ? { ...samling, lagret: true } : samling
                )
            )
        );
        settRedigerSamlingId((prev) => (prev === samlingId ? undefined : prev));
    };

    const leggTilSamling = () => {
        const samlingUnderArbeid =
            ulagretSamling ?? samlinger.find((samling) => samling._id === redigerSamlingId);

        if (samlingUnderArbeid) {
            const feil = validerSamlingUnderRedigering(
                samlingUnderArbeid,
                locale,
                samlingUnderArbeid._id === førsteSamlingId
            );
            if (inneholderFeil(feil)) {
                settValideringsfeil((prevState) => ({ ...prevState, ...feil }));
                return;
            }
        }

        settValideringsfeil((prevState) => ({
            ...prevState,
            ...nullstillteSamlingsfeil(samlinger),
        }));
        settSamlinger((prev) =>
            synkroniserGjenbrukAdresser([
                ...prev.map((samling) =>
                    samlingUnderArbeid && samling._id === samlingUnderArbeid._id
                        ? { ...samling, lagret: true }
                        : samling
                ),
                opprettSamlingForNesteId(prev),
            ])
        );
        settRedigerSamlingId(undefined);
    };

    const slettSamling = (id: number) => {
        if (!kanSletteSamling(id)) {
            return;
        }
        settValideringsfeil((prevState) => ({
            ...prevState,
            ...nullstillteSamlingsfeil(samlinger),
        }));
        settSamlinger((prev) => synkroniserGjenbrukAdresser(prev.filter((s) => s._id !== id)));
        settRedigerSamlingId((prev) => (prev === id ? undefined : prev));
    };

    return (
        <VStack gap="space-16">
            <VStack gap="space-40">
                {lagredeSamlinger.map((samling) => (
                    <React.Fragment key={samling._id}>
                        {redigerSamlingId === samling._id ? (
                            <NySamling
                                samling={samling}
                                erFørste={samling._id === førsteSamlingId}
                                oppdater={oppdaterSamlingFelt}
                                onLagre={() => lagreSamling(samling._id)}
                                onSlett={
                                    kanSletteSamling(samling._id)
                                        ? () => slettSamling(samling._id)
                                        : undefined
                                }
                            />
                        ) : (
                            <LagretSamlingVisning
                                samling={samling}
                                visSlett={kanSletteSamling(samling._id)}
                                onRediger={() => settRedigerSamlingId(samling._id)}
                                onSlett={
                                    kanSletteSamling(samling._id)
                                        ? () => slettSamling(samling._id)
                                        : undefined
                                }
                            />
                        )}
                    </React.Fragment>
                ))}
                {ulagretSamling && (
                    <NySamling
                        key={ulagretSamling._id}
                        samling={ulagretSamling}
                        erFørste={ulagretSamling._id === førsteSamlingId}
                        oppdater={oppdaterSamlingFelt}
                        onLagre={() => lagreSamling(ulagretSamling._id)}
                        onSlett={
                            kanSletteSamling(ulagretSamling._id)
                                ? () => slettSamling(ulagretSamling._id)
                                : undefined
                        }
                    />
                )}
            </VStack>
            <HStack>
                <Button variant="tertiary" onClick={leggTilSamling} icon={<PlusIcon aria-hidden />}>
                    {samlingerTekster.knapp_legg_til[locale]}
                </Button>
            </HStack>
        </VStack>
    );
};

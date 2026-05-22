import React from 'react';

import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';

import { NySamling } from './NySamling';
import { oppdaterSamling, opprettSamlingForNesteId } from './util';
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

    const ulagretSamling = samlinger.find((s) => !s.lagret);
    const lagredeSamlinger = samlinger.filter((s) => s.lagret);

    const oppdaterSamlingFelt = (id: number, key: keyof Samling, verdi: unknown) => {
        settSamlinger((prev) => oppdaterSamling(prev, id, key as keyof Samling, verdi as never));
    };

    const leggTilSamling = () => {
        if (ulagretSamling) {
            const feil = validerSamlingUnderRedigering(ulagretSamling, locale);
            if (inneholderFeil(feil)) {
                settValideringsfeil((prevState) => ({ ...prevState, ...feil }));
                return;
            }
        }

        settValideringsfeil((prevState) => ({ ...prevState, ...nullstillteSamlingsfeil }));
        settSamlinger((prev) => [
            ...prev.map((s) => ({ ...s, lagret: true })),
            opprettSamlingForNesteId(prev),
        ]);
    };

    const slettSamling = (id: number) => {
        if (ulagretSamling?._id === id) {
            settValideringsfeil((prevState) => ({ ...prevState, ...nullstillteSamlingsfeil }));
        }
        settSamlinger((prev) => prev.filter((s) => s._id !== id));
    };

    return (
        <VStack gap="space-16">
            {lagredeSamlinger.map((samling) => (
                <NySamling
                    key={samling._id}
                    samling={samling}
                    oppdater={oppdaterSamlingFelt}
                    onSlett={() => slettSamling(samling._id)}
                    visValideringsfeil={false}
                />
            ))}
            {ulagretSamling && (
                <NySamling
                    key={ulagretSamling._id}
                    samling={ulagretSamling}
                    oppdater={oppdaterSamlingFelt}
                />
            )}
            <HStack>
                <Button variant="tertiary" onClick={leggTilSamling} icon={<PlusIcon aria-hidden />}>
                    {samlingerTekster.knapp_legg_til[locale]}
                </Button>
            </HStack>
        </VStack>
    );
};

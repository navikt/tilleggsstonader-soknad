import React from 'react';

import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';

import { NyReise } from './NyReise';
import { oppdaterReise, opprettReiseForNesteId } from './util';
import {
    nullstillteReisefeil,
    nullstillteReisefeilForReise,
    validerReiseUnderRedigering,
} from './validering';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { inneholderFeil } from '../../../typer/validering';
import { reiseinfoTekster } from '../../tekster/reiseinfo';
import { ReiseInfoReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const ReiserListe: React.FC<{
    reiser: ReiseInfoReiseOppstartAvslutningHjemreise[];
    settReiser: React.Dispatch<React.SetStateAction<ReiseInfoReiseOppstartAvslutningHjemreise[]>>;
}> = ({ reiser, settReiser }) => {
    const { locale } = useSpråk();
    const { settValideringsfeil } = useValideringsfeil();

    const ulagretReise = reiser.find((reise) => !reise.lagret);
    const lagredeReiser = reiser.filter((reise) => reise.lagret);
    const førsteReiseId = Math.min(...reiser.map((reise) => reise._id));
    const kanSletteReise = (id: number) => id !== førsteReiseId;

    const oppdaterReiseFelt = (
        id: number,
        key: keyof ReiseInfoReiseOppstartAvslutningHjemreise,
        verdi: unknown
    ) => {
        settReiser((prev) => oppdaterReise(prev, id, key as never, verdi as never));
    };

    const leggTilReise = () => {
        if (ulagretReise) {
            const feil = validerReiseUnderRedigering(ulagretReise, locale);
            if (inneholderFeil(feil)) {
                settValideringsfeil((prev) => ({ ...prev, ...feil }));
                return;
            }
        }

        settValideringsfeil((prev) => ({
            ...prev,
            ...nullstillteReisefeil(reiser),
        }));

        settReiser((prev) => [
            ...prev.map((reise) => ({ ...reise, lagret: true })),
            opprettReiseForNesteId(prev),
        ]);
    };

    const slettReise = (id: number) => {
        if (!kanSletteReise(id)) {
            return;
        }

        settValideringsfeil((prev) => ({
            ...prev,
            ...nullstillteReisefeilForReise(id),
        }));

        settReiser((prev) => prev.filter((reise) => reise._id !== id));
    };

    return (
        <VStack gap="space-16">
            <VStack gap="space-40">
                {lagredeReiser.map((reise) => (
                    <NyReise
                        key={reise._id}
                        reise={reise}
                        oppdater={oppdaterReiseFelt}
                        onSlett={
                            kanSletteReise(reise._id) ? () => slettReise(reise._id) : undefined
                        }
                    />
                ))}
                {ulagretReise && (
                    <NyReise
                        key={ulagretReise._id}
                        reise={ulagretReise}
                        oppdater={oppdaterReiseFelt}
                        onSlett={
                            kanSletteReise(ulagretReise._id)
                                ? () => slettReise(ulagretReise._id)
                                : undefined
                        }
                    />
                )}
            </VStack>
            <HStack>
                <Button variant="tertiary" onClick={leggTilReise} icon={<PlusIcon aria-hidden />}>
                    {reiseinfoTekster.knapp_legg_til[locale]}
                </Button>
            </HStack>
        </VStack>
    );
};

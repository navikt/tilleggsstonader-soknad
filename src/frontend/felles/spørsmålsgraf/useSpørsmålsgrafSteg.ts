import { Dispatch, SetStateAction, useMemo } from 'react';

import {
    filtrerFeilTilAktiveNoder,
    finnAktiveNoder,
    finnInaktiveNoder,
    SpørsmålsgrafNode,
    validerAktiveGrafnoder,
} from './traversering';
import { Locale } from '../../typer/tekst';
import { Valideringsfeil, inneholderFeil } from '../../typer/validering';

type UseSpørsmålsgrafStegProps<State, Context, NodeId extends string> = {
    state: State;
    settState: Dispatch<SetStateAction<State>>;
    valideringsKontekst: Context;
    røtter:
        | SpørsmålsgrafNode<State, Context, NodeId>
        | readonly SpørsmålsgrafNode<State, Context, NodeId>[];
    rensInaktiveSvar: (state: State) => State;
    erSpørsmålNode: (nodeId: string) => nodeId is NodeId;
    settValideringsfeil: Dispatch<SetStateAction<Valideringsfeil>>;
};

const unike = <T>(verdier: T[]): T[] => [...new Set(verdier)];

export const useSpørsmålsgrafSteg = <State, Context, NodeId extends string>({
    state,
    settState,
    valideringsKontekst,
    røtter,
    rensInaktiveSvar,
    erSpørsmålNode,
    settValideringsfeil,
}: UseSpørsmålsgrafStegProps<State, Context, NodeId>) => {
    const rotListe = useMemo(() => (Array.isArray(røtter) ? røtter : [røtter]), [røtter]);

    const aktiveNoder = useMemo(() => {
        const aktive = rotListe.flatMap((rot) => [
            ...finnAktiveNoder(rot, state, valideringsKontekst),
        ]);
        return new Set(aktive);
    }, [rotListe, state, valideringsKontekst]);

    const nullstillFeil = (noder: NodeId | NodeId[]) => {
        const nodeListe = Array.isArray(noder) ? noder : [noder];
        settValideringsfeil((prev) =>
            nodeListe.reduce((acc, nodeId) => ({ ...acc, [nodeId]: undefined }), prev)
        );
    };

    const oppdaterMedGraf = (
        oppdatering: (forrige: State) => State,
        egneFeilnøkler: NodeId[] = []
    ) => {
        const oppdatert = oppdatering(state);
        const renset = rensInaktiveSvar(oppdatert);
        const grafFeilnøkler = unike(
            rotListe
                .flatMap((rot) => finnInaktiveNoder(rot, state, renset, valideringsKontekst))
                .filter(erSpørsmålNode)
        );

        settState(renset);
        nullstillFeil(unike([...egneFeilnøkler, ...grafFeilnøkler]));
    };

    const validerSteg = (locale: Locale): boolean => {
        const valideringsresultat = rotListe.reduce<Valideringsfeil>(
            (acc, rot) => ({
                ...acc,
                ...validerAktiveGrafnoder(rot, state, valideringsKontekst, locale),
            }),
            {}
        );
        const aktiveSpørsmål = new Set([...aktiveNoder].filter(erSpørsmålNode));
        const filtrerteFeil = filtrerFeilTilAktiveNoder(valideringsresultat, aktiveSpørsmål);
        settValideringsfeil(filtrerteFeil);
        return !inneholderFeil(filtrerteFeil);
    };

    const finnAktiveNoderIRekkefølge = <Node extends { id: NodeId }>(noder: Node[]) =>
        noder.filter((node) => aktiveNoder.has(node.id));

    return {
        aktiveNoder,
        nullstillFeil,
        oppdaterMedGraf,
        validerSteg,
        finnAktiveNoderIRekkefølge,
    };
};

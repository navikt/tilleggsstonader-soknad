import { Locale } from '../../typer/tekst';
import { Valideringsfeil } from '../../typer/validering';

export type SpørsmålsgrafNode<State, Context, NodeId extends string> = {
    id: NodeId;
    når?: (state: State, context: Context) => boolean;
    validate?: (state: State, context: Context, locale: Locale) => string | undefined;
    barn?: SpørsmålsgrafNode<State, Context, NodeId>[];
};

export const byggNodeIndex = <State, Context, NodeId extends string>(
    rot: SpørsmålsgrafNode<State, Context, NodeId>
) => {
    const index = new Map<NodeId, SpørsmålsgrafNode<State, Context, NodeId>>();

    const traverser = (node: SpørsmålsgrafNode<State, Context, NodeId>) => {
        if (index.has(node.id)) {
            throw new Error(`Duplikat node-id i spørsmålsgraf: ${node.id}`);
        }
        index.set(node.id, node);
        node.barn?.forEach(traverser);
    };

    traverser(rot);
    return index;
};

export const finnAktiveNoder = <State, Context, NodeId extends string>(
    rot: SpørsmålsgrafNode<State, Context, NodeId>,
    state: State,
    context: Context
): Set<NodeId> => {
    const aktive = new Set<NodeId>();

    const traverser = (node: SpørsmålsgrafNode<State, Context, NodeId>) => {
        if (node.når && !node.når(state, context)) {
            return;
        }
        aktive.add(node.id);
        node.barn?.forEach(traverser);
    };

    traverser(rot);
    return aktive;
};

export const finnInaktiveNoder = <State, Context, NodeId extends string>(
    rot: SpørsmålsgrafNode<State, Context, NodeId>,
    forrige: State,
    neste: State,
    context: Context
): NodeId[] => {
    const forrigeAktive = finnAktiveNoder(rot, forrige, context);
    const nesteAktive = finnAktiveNoder(rot, neste, context);
    return [...forrigeAktive].filter((id) => !nesteAktive.has(id));
};

export const filtrerFeilTilAktiveNoder = <NodeId extends string>(
    feil: Valideringsfeil,
    aktiveNoder: Set<NodeId>
): Valideringsfeil =>
    Object.fromEntries(
        Object.entries(feil).filter(([key, value]) => value && aktiveNoder.has(key as NodeId))
    );

export const flattenGraf = <State, Context, NodeId extends string>(
    rot: SpørsmålsgrafNode<State, Context, NodeId>
): SpørsmålsgrafNode<State, Context, NodeId>[] => [
    rot,
    ...(rot.barn?.flatMap((barn) => flattenGraf(barn)) ?? []),
];

export const validerAktiveGrafnoder = <State, Context, NodeId extends string>(
    rot: SpørsmålsgrafNode<State, Context, NodeId>,
    state: State,
    context: Context,
    locale: Locale
): Valideringsfeil => {
    const aktive = finnAktiveNoder(rot, state, context);
    const noder = flattenGraf(rot).filter((node) => aktive.has(node.id));
    return noder.reduce<Valideringsfeil>((acc, node) => {
        const melding = node.validate?.(state, context, locale);
        if (!melding) {
            return acc;
        }
        return {
            ...acc,
            [node.id]: {
                id: node.id,
                melding,
            },
        };
    }, {});
};

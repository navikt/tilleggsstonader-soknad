import { AlertNode, CheckboxNode, CustomNode, InputNode, RadioNode } from './rendering';
import { EnumFelt, EnumFlereValgFelt, VerdiFelt } from '../../typer/skjema';
import { CheckboxGruppePåkrevd, RadiogruppePåkrevd } from '../../typer/tekst';

type TypedRadioNode<State, Context, NodeId extends string, Option extends string> = Omit<
    RadioNode<State, Context, NodeId>,
    'tekst' | 'value' | 'write'
> & {
    tekst: RadiogruppePåkrevd<Option>;
    value: (state: State) => Option | '';
    write: (state: State, value: EnumFelt<Option>) => State;
};

type TypedCheckboxNode<State, Context, NodeId extends string, Option extends string> = Omit<
    CheckboxNode<State, Context, NodeId>,
    'tekst' | 'value' | 'write'
> & {
    tekst: CheckboxGruppePåkrevd<Option>;
    value: (state: State) => VerdiFelt<Option>[];
    write: (state: State, value: EnumFlereValgFelt<Option>) => State;
};

export const radioNode = <State, Context, NodeId extends string, Option extends string>(
    node: Omit<TypedRadioNode<State, Context, NodeId, Option>, 'type'>
): RadioNode<State, Context, NodeId> =>
    ({
        type: 'radio',
        ...node,
    }) as unknown as RadioNode<State, Context, NodeId>;

export const checkboxNode = <State, Context, NodeId extends string, Option extends string>(
    node: Omit<TypedCheckboxNode<State, Context, NodeId, Option>, 'type'>
): CheckboxNode<State, Context, NodeId> =>
    ({
        type: 'checkbox',
        ...node,
    }) as unknown as CheckboxNode<State, Context, NodeId>;

export const inputNode = <State, Context, NodeId extends string>(
    node: Omit<InputNode<State, Context, NodeId>, 'type'>
): InputNode<State, Context, NodeId> => ({
    type: 'input',
    ...node,
});

export const alertNode = <State, Context, NodeId extends string>(
    node: Omit<AlertNode<State, Context, NodeId>, 'type'>
): AlertNode<State, Context, NodeId> => ({
    type: 'alert',
    ...node,
});

export const customNode = <State, Context, NodeId extends string>(
    node: Omit<CustomNode<State, Context, NodeId>, 'type'>
): CustomNode<State, Context, NodeId> => ({
    type: 'custom',
    ...node,
});

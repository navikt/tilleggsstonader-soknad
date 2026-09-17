import { ChangeEvent, ReactNode } from 'react';

import { Alert, TextField, TextFieldProps } from '@navikt/ds-react';

import { LocaleCheckboxGroup } from '../../components/Teksthåndtering/LocaleCheckboxGroup';
import { LocaleRadioGroup } from '../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekstAvsnitt } from '../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { EnumFelt, EnumFlereValgFelt, VerdiFelt } from '../../typer/skjema';
import {
    CheckboxGruppePåkrevd,
    InputFelt,
    Locale,
    RadiogruppePåkrevd,
    TekstElement,
} from '../../typer/tekst';
import { Valideringsfeil } from '../../typer/validering';

type InputTekst = InputFelt & {
    beskrivelse?: TekstElement<string>;
};

type BaseNode<State, Context, NodeId extends string> = {
    id: NodeId;
    når?: (state: State, context: Context) => boolean;
    validate?: (state: State, context: Context, locale: Locale) => string | undefined;
    barn?: Spørsmålsnode<State, Context, NodeId>[];
};

export type RadioNode<State, Context, NodeId extends string> = BaseNode<State, Context, NodeId> & {
    type: 'radio';
    tekst: RadiogruppePåkrevd<string>;
    value: (state: State) => string;
    write: (state: State, value: EnumFelt<string>) => State;
};

export type CheckboxNode<State, Context, NodeId extends string> = BaseNode<
    State,
    Context,
    NodeId
> & {
    type: 'checkbox';
    tekst: CheckboxGruppePåkrevd<string>;
    value: (state: State) => VerdiFelt<string>[];
    write: (state: State, value: EnumFlereValgFelt<string>) => State;
};

export type InputNode<State, Context, NodeId extends string> = BaseNode<State, Context, NodeId> & {
    type: 'input';
    tekst: InputTekst;
    inputProps?: Partial<TextFieldProps>;
    value: (state: State) => string;
    write: (state: State, value: string, label: string) => State;
};

export type AlertNode<State, Context, NodeId extends string> = BaseNode<State, Context, NodeId> & {
    type: 'alert';
    variant: 'info' | 'warning' | 'error' | 'success';
    tekst: TekstElement<string> | TekstElement<string[]>;
    formatter?: 'avsnitt';
};

export type CustomNode<State, Context, NodeId extends string> = BaseNode<State, Context, NodeId> & {
    type: 'custom';
    render: (args: {
        state: State;
        locale: Locale;
        valideringsfeil: Valideringsfeil;
        oppdaterState: (oppdatering: (forrige: State) => State) => void;
        nullstillFeil: (nodeId: NodeId) => void;
    }) => ReactNode;
};

export type Spørsmålsnode<State, Context, NodeId extends string> =
    | RadioNode<State, Context, NodeId>
    | CheckboxNode<State, Context, NodeId>
    | InputNode<State, Context, NodeId>
    | AlertNode<State, Context, NodeId>
    | CustomNode<State, Context, NodeId>;

export type SpørsmålRendererProps<State, NodeId extends string> = {
    node: Spørsmålsnode<State, unknown, NodeId>;
    state: State;
    locale: Locale;
    valideringsfeil: Valideringsfeil;
    oppdaterState: (oppdatering: (forrige: State) => State) => void;
    nullstillFeil: (nodeId: NodeId) => void;
};

export const renderSpørsmålNode = <State, NodeId extends string>({
    node,
    state,
    locale,
    valideringsfeil,
    oppdaterState,
    nullstillFeil,
}: SpørsmålRendererProps<State, NodeId>) => {
    if (node.type === 'radio') {
        return (
            <LocaleRadioGroup
                key={node.id}
                id={valideringsfeil[node.id]?.id}
                tekst={node.tekst}
                value={node.value(state)}
                onChange={(verdi) => {
                    oppdaterState((forrige) => node.write(forrige, verdi));
                    nullstillFeil(node.id);
                }}
                error={valideringsfeil[node.id]?.melding}
            />
        );
    }

    if (node.type === 'checkbox') {
        return (
            <LocaleCheckboxGroup
                key={node.id}
                id={valideringsfeil[node.id]?.id}
                tekst={node.tekst}
                value={node.value(state)}
                onChange={(verdier) => {
                    oppdaterState((forrige) => node.write(forrige, verdier));
                    nullstillFeil(node.id);
                }}
                error={valideringsfeil[node.id]?.melding}
            />
        );
    }

    if (node.type === 'input') {
        return (
            <TextField
                key={node.id}
                id={valideringsfeil[node.id]?.id}
                label={node.tekst.label[locale]}
                description={node.tekst.beskrivelse?.[locale]}
                value={node.value(state)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    oppdaterState((forrige) =>
                        node.write(forrige, value, node.tekst.label[locale])
                    );
                    nullstillFeil(node.id);
                }}
                error={valideringsfeil[node.id]?.melding}
                {...node.inputProps}
            />
        );
    }

    if (node.type === 'alert') {
        return (
            <Alert key={node.id} variant={node.variant}>
                {node.formatter === 'avsnitt' && Array.isArray(node.tekst[locale]) ? (
                    <LocaleTekstAvsnitt tekst={node.tekst as TekstElement<string[]>} />
                ) : (
                    node.tekst[locale]
                )}
            </Alert>
        );
    }

    return (
        <div key={node.id}>
            {node.render({
                state,
                locale,
                valideringsfeil,
                oppdaterState,
                nullstillFeil,
            })}
        </div>
    );
};

import { FormSummary } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

export const Answer: React.FC<{
    label: string | TekstElement<string>;
    children: React.ReactNode;
}> = ({ label, children }) => {
    const { locale } = useSpråk();

    const labelTekst = typeof label === 'string' ? label : label[locale];

    return (
        <FormSummary.Answer>
            <FormSummary.Label>{labelTekst}</FormSummary.Label>
            <FormSummary.Value>{children}</FormSummary.Value>
        </FormSummary.Answer>
    );
};

export const GruppertAnswer: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => {
    return (
        <Answer label={label}>
            <FormSummary.Answers>{children}</FormSummary.Answers>
        </Answer>
    );
};

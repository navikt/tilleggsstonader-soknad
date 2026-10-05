import { FormSummary } from '@navikt/ds-react';

export const Answer: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>{label}</FormSummary.Label>
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

import React from 'react';

import { VStack } from '@navikt/ds-react';

import { Punktliste } from '../typer/tekst';
import { LocaleHeading } from './Teksthåndtering/LocaleHeading';
import { LocalePunktliste } from './Teksthåndtering/LocalePunktliste';

export const InfoPunktliste: React.FC<{ liste: Punktliste[]; spacingBottom?: boolean }> = ({
    liste,
    spacingBottom = false,
}) => {
    return (
        <VStack gap="space-24" marginBlock={`0 ${spacingBottom ? 'space-24' : '0'}`}>
            {liste.map((tekst, indeks) => (
                <div key={indeks}>
                    <LocaleHeading tekst={tekst.tittel} level="3" size="xsmall" spacing />
                    <LocalePunktliste innhold={tekst.innhold} />
                </div>
            ))}
        </VStack>
    );
};

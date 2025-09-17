import React from 'react';

import { BodyShort, LinkCard } from '@navikt/ds-react';

import { formaterPeriode } from '../../../utils/formateringUtils';
import { Rammevedtak } from '../../types/Rammevedtak';

export const KjørelisteKort: React.FC<{ rammevedtak: Rammevedtak }> = ({ rammevedtak }) => {
    return (
        <LinkCard>
            <LinkCard.Title as="h3">
                <LinkCard.Anchor href="kjoreliste/skjema">
                    {rammevedtak.aktivitetsnavn}
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
                <BodyShort>
                    Periode med kjøring: {formaterPeriode(rammevedtak.fom, rammevedtak.tom)}
                </BodyShort>
                <BodyShort>Adresse: {rammevedtak.aktivitetsadresse}</BodyShort>
                <BodyShort>{rammevedtak.reisedagerPerUke} dager per uke</BodyShort>
            </LinkCard.Description>
        </LinkCard>
    );
};

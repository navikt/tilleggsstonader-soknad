import React from 'react';

import { BodyShort, LinkCard, Tag } from '@navikt/ds-react';

import { formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { finnPath, KjørelisteRoutes } from '../../kjørelisteRoutes';
import { formaterAktivitetsnavn, Rammevedtak } from '../../types/Rammevedtak';

export const KjørelisteKort: React.FC<{ rammevedtak: Rammevedtak }> = ({ rammevedtak }) => {
    return (
        <LinkCard>
            <LinkCard.Title as="h3">
                <LinkCard.Anchor
                    href={`/tilleggsstonader/soknad${finnPath(rammevedtak.reiseId, KjørelisteRoutes.SKJEMA)}/`}
                >
                    {formaterAktivitetsnavn(rammevedtak.aktivitetsnavn)}
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
                <BodyShort>
                    Periode med kjøring: {formaterPeriodeTekstlig(rammevedtak.fom, rammevedtak.tom)}
                </BodyShort>
                <BodyShort>Adresse: {rammevedtak.aktivitetsadresse}</BodyShort>
                <BodyShort>{rammevedtak.reisedagerPerUke} dager per uke</BodyShort>
            </LinkCard.Description>
            <LinkCard.Footer>
                <Tag
                    variant={'info'}
                    size={'small'}
                >{`${rammevedtak.uker.filter((uke) => uke.kanSendeInnKjøreliste && !uke.innsendtDato).length} uker klar for utfylling`}</Tag>
            </LinkCard.Footer>
        </LinkCard>
    );
};

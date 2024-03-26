import styled from 'styled-components';

import { BodyShort, Button, HStack, Label, VStack } from '@navikt/ds-react';
import { AGray800 } from '@navikt/ds-tokens/dist/tokens';

import { OppholdUtenforNorge } from '../../../../typer/søknad';
import { Locale } from '../../../../typer/tekst';
import { formaterNullableIsoDato } from '../../../../utils/formatering';
import { oppholdUtenforNorgeInnhold } from '../../../tekster/opphold';

const VisningAvOpphold = styled(VStack)`
    border: 1px solid ${AGray800};
    padding: 1rem 1rem 0 1rem;
`;

const LagredeOpphold: React.FC<{
    lagredeOpphold: OppholdUtenforNorge[];
    slettOpphold: (id: number) => void;
    locale: Locale;
}> = ({ lagredeOpphold, slettOpphold, locale }) => {
    return (
        <>
            {lagredeOpphold.length > 1 && (
                <Label>{oppholdUtenforNorgeInnhold.dineOpphold[locale]}</Label>
            )}
            {lagredeOpphold.map((opphold) => (
                <VisningAvOpphold gap={'1'}>
                    <BodyShort weight={'semibold'}>{opphold.land?.svarTekst}</BodyShort>
                    {(opphold.årsak?.verdier || []).map((årsak) => (
                        <BodyShort>{årsak.label}</BodyShort>
                    ))}
                    <BodyShort>
                        {formaterNullableIsoDato(opphold.fom?.verdi)} -{' '}
                        {formaterNullableIsoDato(opphold.tom?.verdi)}
                    </BodyShort>
                    <HStack>
                        <Button variant={'tertiary'} onClick={() => slettOpphold(opphold._id)}>
                            {oppholdUtenforNorgeInnhold.knapp_slett[locale]}
                        </Button>
                    </HStack>
                </VisningAvOpphold>
            ))}
        </>
    );
};

export default LagredeOpphold;

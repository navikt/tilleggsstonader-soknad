import React from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { AWhite } from '@navikt/ds-tokens/dist/tokens';

import FileSuccessIcon from './FileSuccessIcon';
import { Dokument } from '../../typer/skjema';

const Container = styled.div`
    display: grid;
    grid-template-columns: auto 2fr auto;
    align-items: center;
    gap: 1rem;
    background-color: ${AWhite};
    padding: 0.5rem;
`;

const FilVisning: React.FC<{
    dokument: Dokument;
}> = ({ dokument }) => {
    return (
        <Container>
            <FileSuccessIcon />
            <BodyShort>{dokument.navn}</BodyShort>
            {/* TODO: Legg til slettefunksjonalitet */}
            <Button variant="tertiary" icon={<TrashIcon />}>
                Slett
            </Button>
        </Container>
    );
};
export default FilVisning;

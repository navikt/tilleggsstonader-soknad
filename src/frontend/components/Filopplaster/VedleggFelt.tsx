import React from 'react';

import styled from 'styled-components';

import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { ASurfaceSubtle } from '@navikt/ds-tokens/dist/tokens';

import Filopplaster from './Filopplaster';
import { filopplastingTekster } from '../../tekster/filopplasting';
import { Dokument, DokumentasjonFelt } from '../../typer/skjema';
import { Vedlegg } from '../../typer/tekst';
import { LocaleReadMore } from '../Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const Container = styled(VStack).attrs({ gap: '4' })`
    background-color: ${ASurfaceSubtle};
    padding: 1rem;
`;

const VedleggFelt: React.FC<{
    tittel: string;
    vedlegg: Vedlegg;
    dokumentasjonFelt: DokumentasjonFelt;
    toggleHarSendtInnTidligere: () => void;
    leggTilDokument: (vedlegg: Dokument) => void;
    slettDokument: (vedlegg: Dokument) => void;
}> = ({
    tittel,
    vedlegg,
    dokumentasjonFelt,
    toggleHarSendtInnTidligere,
    leggTilDokument,
    slettDokument,
}) => {
    return (
        <Container>
            <Heading size="small">{tittel}</Heading>
            <BodyLong>
                <LocaleTekst tekst={vedlegg.beskrivelse} />
            </BodyLong>
            {vedlegg.krav_til_dokumentasjon && (
                <LocaleReadMore
                    tekst={{
                        header: filopplastingTekster.krav_dokumentasjon_overskrift,
                        innhold: vedlegg.krav_til_dokumentasjon,
                    }}
                    somPunktListe
                />
            )}
            <Filopplaster
                dokumentasjonFelt={dokumentasjonFelt}
                toggleHarSendtInnTidligere={toggleHarSendtInnTidligere}
                leggTilDokument={leggTilDokument}
                slettDokument={slettDokument}
            />
        </Container>
    );
};
export default VedleggFelt;

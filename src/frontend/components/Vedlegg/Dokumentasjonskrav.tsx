import styled from 'styled-components';

import { BodyShort, Box, Heading, List } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { typerVedleggTekster, vedleggTekster } from '../../tekster/vedlegg';
import { Dokumentasjonsbehov } from '../../typer/skjema';
import { Skjematype } from '../../typer/skjematyper';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';

const Dokumentasjonskravsliste = styled(List)`
    ul {
        margin-bottom: 0;
    }
`;

export const Dokumentasjonskrav: React.FC<{
    dokumentasjonsbehov: Dokumentasjonsbehov[];
}> = ({ dokumentasjonsbehov }) => {
    const { locale } = useSpråk();
    const { skjematype } = useSøknad();

    return (
        <>
            <div>
                <Heading level="3" size="small">
                    {vedleggTekster.dokumentasjonskrav_tittel[locale]}
                </Heading>
                <Box marginBlock="space-16" asChild>
                    <Dokumentasjonskravsliste>
                        {dokumentasjonsbehov.map((doc, indeks) => (
                            <List.Item key={indeks}>
                                <LocaleTekst
                                    tekst={
                                        typerVedleggTekster[doc.type].liste_tittel ||
                                        typerVedleggTekster[doc.type].tittel
                                    }
                                    argument0={doc.barn?.visningsnavn}
                                />
                            </List.Item>
                        ))}
                    </Dokumentasjonskravsliste>
                </Box>
            </div>
            {skjematype === Skjematype.SØKNAD_BARNETILSYN && (
                <BodyShort>
                    <LocaleTekst tekst={vedleggTekster.dokumentasjonskrav_samlet_faktura} />
                </BodyShort>
            )}
            <BodyShort>
                <LocaleTekst tekst={vedleggTekster.informasjon_all_dokumentasjon} />
            </BodyShort>
        </>
    );
};

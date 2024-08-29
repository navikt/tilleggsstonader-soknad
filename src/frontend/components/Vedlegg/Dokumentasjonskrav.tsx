import { BodyShort, List } from '@navikt/ds-react';

import { typerVedleggTekster } from '../../barnetilsyn/tekster/vedlegg';
import { useSpråk } from '../../context/SpråkContext';
import { vedleggTekster } from '../../tekster/vedlegg';
import { Dokumentasjonsbehov } from '../../typer/skjema';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const Dokumentasjonskrav: React.FC<{ dokumentasjonsbehov: Dokumentasjonsbehov[] }> = ({
    dokumentasjonsbehov,
}) => {
    const { locale } = useSpråk();

    return (
        <>
            <List as="ul" title={vedleggTekster.dokumentasjonskrav_tittel[locale]}>
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
            </List>
            <BodyShort>
                <LocaleTekst tekst={vedleggTekster.dokumentasjonskrav_samlet_faktura} />
            </BodyShort>
        </>
    );
};

export default Dokumentasjonskrav;

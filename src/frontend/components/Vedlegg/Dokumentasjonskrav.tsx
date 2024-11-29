import { BodyShort, List } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { typerVedleggTekster, vedleggTekster } from '../../tekster/vedlegg';
import { Dokumentasjonsbehov } from '../../typer/skjema';
import { Stønadstype } from '../../typer/stønadstyper';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const Dokumentasjonskrav: React.FC<{
    dokumentasjonsbehov: Dokumentasjonsbehov[];
}> = ({ dokumentasjonsbehov }) => {
    const { locale } = useSpråk();
    const { stønadstype } = useSøknad();

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
            {stønadstype === Stønadstype.BARNETILSYN && (
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

export default Dokumentasjonskrav;

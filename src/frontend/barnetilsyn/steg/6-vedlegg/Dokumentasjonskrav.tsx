import { BodyShort, List } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster, vedleggTekster } from '../../tekster/vedlegg';

const Dokumentasjonskrav = () => {
    const { dokumentasjonsbehov } = usePassAvBarnSøknad();
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

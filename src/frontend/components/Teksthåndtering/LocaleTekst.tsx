import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';

const LocaleTekst: React.FC<{ tekst: TekstElement<string>; argument0?: string }> = ({
    tekst,
    argument0,
}) => {
    const { locale } = useSpråk();
    const tekstStreng = tekst[locale];

    return <>{argument0 ? hentBeskjedMedEttParameter(argument0, tekstStreng) : tekstStreng}</>;
};

export default LocaleTekst;

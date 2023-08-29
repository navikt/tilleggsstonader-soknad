import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

const LocaleTekst: React.FC<{ tekst: TekstElement<string> }> = ({ tekst }) => {
    const { locale } = useSpråk();

    return <>{tekst[locale]}</>;
};

export default LocaleTekst;

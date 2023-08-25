import { useSpråk } from '../context/SpråkContext';
import { TekstElement } from '../typer/tekst';

export const LocaleTekst: React.FC<{ tekst: TekstElement }> = ({ tekst }) => {
    const { locale } = useSpråk();
    return <>{tekst[locale]}</>;
};

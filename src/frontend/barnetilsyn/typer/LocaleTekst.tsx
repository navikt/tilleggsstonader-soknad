import { useSpråk } from '../../context/SpråkContext';
import { TekstElement } from '../../typer/tekst';

export const Tekst: React.FC<{ tekst: TekstElement }> = ({ tekst }) => {
    const { locale } = useSpråk();
    return <>{tekst[locale]}</>;
};

import { Tekster } from '../typer/tekster/tekst';

export const Tekst: React.FC<{ tekst: Tekster }> = ({ tekst }) => {
    const språk = 'nb'; // TODO: Bytt ut med useSpråk() når språk-context er laget
    return <>{tekst[språk]}</>;
};

import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { inneholderFeil } from '../../../typer/validering';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';
import { reisemåteTekster } from '../../tekster/reisemåte';
import { Reisemåte } from '../4-samlinger/Reisemåte/Reisemåte';
import { validerReisemåte } from '../4-samlinger/Reisemåte/validering';

export const ReisemåteReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { reisemåte } = useReiseTilSamlingSøknad();
    const { settValideringsfeil } = useValideringsfeil();

    const kanFortsette = (): boolean => {
        const feil = validerReisemåte(reisemåte, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={reisemåteTekster.tittel} level="2" size="medium" />
            <Reisemåte />
        </Side>
    );
};

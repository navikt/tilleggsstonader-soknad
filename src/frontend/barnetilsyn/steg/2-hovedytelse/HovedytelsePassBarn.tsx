import HovedytelseSide from '../../../components/Hovedytelse/Hovedytelse';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Hovedytelse } from '../../../typer/søknad';

const HovedytelsePassBarn = () => {
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const { hovedytelse, settHovedytelse } = usePassAvBarnSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(hovedytelse: Hovedytelse) => settHovedytelse(hovedytelse)}
            valideringsfeil={valideringsfeil}
            settValideringsfeil={settValideringsfeil}
        />
    );
};

export default HovedytelsePassBarn;

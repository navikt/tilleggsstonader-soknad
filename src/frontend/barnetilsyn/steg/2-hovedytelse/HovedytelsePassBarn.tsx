import HovedytelseSide from '../../../components/Hovedytelse/Hovedytelse';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { Hovedytelse } from '../../../typer/søknad';

const HovedytelsePassBarn = () => {
    const { hovedytelse, settHovedytelse, valideringsfeil, settValideringsfeil } =
        usePassAvBarnSøknad();

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

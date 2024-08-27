import HovedytelseSide from '../../../components/Hovedytelse/Hovedytelse';
import { useSøknad } from '../../../context/SøknadContext';
import { Hovedytelse } from '../../../typer/søknad';

const HovedytelsePassBarn = () => {
    const { hovedytelse, settHovedytelse, valideringsfeil, settValideringsfeil } = useSøknad();

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

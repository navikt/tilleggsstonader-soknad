import HovedytelseSide from '../../../components/Hovedytelse/Hovedytelse';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { Hovedytelse } from '../../../typer/søknad';

const HovedytelseLæremidler = () => {
    const { hovedytelse, settHovedytelse } = useLæremidlerSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(hovedytelse: Hovedytelse) => settHovedytelse(hovedytelse)}
        />
    );
};

export default HovedytelseLæremidler;

import { HovedytelseSide } from '../../../components/Hovedytelse/Hovedytelse';
import { Hovedytelse } from '../../../typer/søknad';
import { useLæremidlerSøknad } from '../../context/LæremidlerSøknadContext';

export const HovedytelseLæremidler = () => {
    const { hovedytelse, settHovedytelse } = useLæremidlerSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(hovedytelse: Hovedytelse) => settHovedytelse(hovedytelse)}
        />
    );
};

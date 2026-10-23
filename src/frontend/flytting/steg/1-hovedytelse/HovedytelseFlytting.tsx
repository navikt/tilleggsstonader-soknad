import { HovedytelseSide } from '../../../components/Hovedytelse/Hovedytelse';
import { Hovedytelse } from '../../../typer/søknad';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';

export const HovedytelseFlytting = () => {
    const { hovedytelse, settHovedytelse } = useFlyttingSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(oppdatertHovedytelse: Hovedytelse) =>
                settHovedytelse(oppdatertHovedytelse)
            }
        />
    );
};

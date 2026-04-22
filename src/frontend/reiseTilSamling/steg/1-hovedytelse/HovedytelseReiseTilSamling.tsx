import HovedytelseSide from '../../../components/Hovedytelse/Hovedytelse';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { Hovedytelse } from '../../../typer/søknad';

export const HovedytelseReiseTilSamling = () => {
    const { hovedytelse, settHovedytelse } = useReiseTilSamlingSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(oppdatertHovedytelse: Hovedytelse) =>
                settHovedytelse(oppdatertHovedytelse)
            }
        />
    );
};

import { HovedytelseSide } from '../../../components/Hovedytelse/Hovedytelse';
import type { Hovedytelse } from '../../../typer/søknad';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';

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

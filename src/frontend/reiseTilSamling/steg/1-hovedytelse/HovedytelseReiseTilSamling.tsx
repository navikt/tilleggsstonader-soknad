import { HovedytelseSide } from '../../../components/Hovedytelse/Hovedytelse';
import { Hovedytelse } from '../../../typer/søknad';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';

export const HovedytelseReiseTilSamling = () => {
    const { hovedytelse, oppdaterHovedytelse } = useReiseTilSamlingSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(oppdatertHovedytelse: Hovedytelse) =>
                oppdaterHovedytelse(oppdatertHovedytelse)
            }
        />
    );
};

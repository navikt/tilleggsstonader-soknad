import { HovedytelseSide } from '../../../components/Hovedytelse/Hovedytelse';
import { Hovedytelse } from '../../../typer/søknad';
import { usePassAvBarnSøknad } from '../../context/PassAvBarnSøknadContext';

export const HovedytelsePassBarn = () => {
    const { hovedytelse, settHovedytelse } = usePassAvBarnSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(hovedytelse: Hovedytelse) => settHovedytelse(hovedytelse)}
        />
    );
};

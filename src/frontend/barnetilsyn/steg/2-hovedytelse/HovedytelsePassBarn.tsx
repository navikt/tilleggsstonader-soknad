import HovedytelseSide from '../../../components/Hovedytelse/Hovedytelse';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { Hovedytelse } from '../../../typer/søknad';

const HovedytelsePassBarn = () => {
    const { hovedytelse, settHovedytelse } = usePassAvBarnSøknad();

    return (
        <HovedytelseSide
            stønadstype={Stønadstype.BARNETILSYN}
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(hovedytelse: Hovedytelse) => settHovedytelse(hovedytelse)}
        />
    );
};

export default HovedytelsePassBarn;

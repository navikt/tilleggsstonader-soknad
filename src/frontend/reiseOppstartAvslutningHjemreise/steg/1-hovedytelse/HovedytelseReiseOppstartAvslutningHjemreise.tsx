import { HovedytelseSide } from '../../../components/Hovedytelse/Hovedytelse';
import { Hovedytelse } from '../../../typer/søknad';
import { useReiseOppstartAvslutningHjemreiseSøknad } from '../../context/ReiseOppstartAvslutningHjemreiseSøknadContext';

export const HovedytelseReiseOppstartAvslutningHjemreise = () => {
    const { hovedytelse, settHovedytelse } = useReiseOppstartAvslutningHjemreiseSøknad();

    return (
        <HovedytelseSide
            hovedytelse={hovedytelse}
            oppdaterHovedytelse={(oppdatertHovedytelse: Hovedytelse) =>
                settHovedytelse(oppdatertHovedytelse)
            }
        />
    );
};

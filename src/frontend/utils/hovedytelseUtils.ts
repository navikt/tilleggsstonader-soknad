import { Ytelse } from '../components/Hovedytelse/typer';
import { EnumFlereValgFelt } from '../typer/skjema';

export const harKunValgtEnsligSomHovedytelse = (
    valgteHovedytelser?: EnumFlereValgFelt<Ytelse>
): boolean => {
    return (
        !!valgteHovedytelser &&
        valgteHovedytelser.verdier.length === 1 &&
        valgteHovedytelser.verdier[0].verdi === 'OVERGANGSSTØNAD'
    );
};

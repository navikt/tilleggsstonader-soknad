import { BarnepassIntern } from './typer';
import { Barn, Barnepass } from '../../../typer/barn';

export const validerBarnepass = (barn: BarnepassIntern, barnPerson: Barn): barn is Barnepass => {
    if (!barn.type) {
        return false;
    } else if (er9ellerEldre(barnPerson) && barn.startetIFemte === undefined) {
        return false;
    } else if (barn.startetIFemte?.verdi === 'JA' && !barn.årsak) {
        return false;
    }
    return true;
};

export const finnBarn = (barn: Barn[], ident: string): Barn => {
    return barn.find((b) => b.ident === ident)!;
};

export const er9ellerEldre = (barn: Barn): boolean => barn.alder >= 9;

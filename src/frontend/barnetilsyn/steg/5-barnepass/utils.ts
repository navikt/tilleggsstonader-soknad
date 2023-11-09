import { BarnepassIntern } from './typer';
import { Barnepass } from '../../../typer/barn';

export const validerBarnepass = (barn: BarnepassIntern): barn is Barnepass => {
    if (!barn.type || barn.startetIFemte === undefined) {
        return false;
    } else if (barn.startetIFemte && !barn.årsak) {
        return false;
    }
    return true;
};

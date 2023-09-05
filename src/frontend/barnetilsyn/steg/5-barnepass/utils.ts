import { BarnepassIntern } from './typer';
import { Barnepass } from '../../../typer/barn';

export const validerBarnepass = (barn: BarnepassIntern): barn is Barnepass => {
    if (!barn.passType || barn.startetIFemte === undefined) {
        return false;
    } else if (barn.startetIFemte && !barn.årsakBarnepass) {
        return false;
    }
    return true;
};

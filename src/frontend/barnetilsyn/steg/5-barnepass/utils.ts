import { BarnMedAllInfo, BarnMedBarnepass } from '../../../typer/barn';

export const tilpassBarnTilSøknadContext = (barn: BarnMedAllInfo): BarnMedBarnepass | undefined => {
    if (barn.passType !== undefined && barn.startetIFemte !== undefined) {
        if (barn.startetIFemte === true && barn.årsakBarnepass === undefined) return undefined;

        return { id: barn.id, passType: barn.passType, startetIFemte: barn.startetIFemte };
    }
};

export const harBarnMangler = (barn: BarnMedAllInfo): boolean => {
    if (barn.passType === undefined) return true;
    return false;
};

import { BarnMedAllInfo, BarnMedBarnepass } from '../../../typer/barn';

export const tilpassBarnTilSøknadContext = (barn: BarnMedAllInfo): BarnMedBarnepass | undefined => {
    if (barn.passType !== undefined) {
        return { id: barn.id, passType: barn.passType };
    }
};

export const harBarnMangler = (barn: BarnMedAllInfo): boolean => {
    if (barn.passType === undefined) return true;
    return false;
};

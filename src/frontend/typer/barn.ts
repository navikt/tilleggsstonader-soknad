import { EnumFelt } from './skjema';
import { JaNei } from './søknad';

export interface Barn {
    ident: string;
    alder: number;
    fødselsdato: string;
    fornavn: string;
    visningsnavn: string;
    skalHaBarnepass: boolean;
}

export interface Barnepass {
    ident: string;
    type: EnumFelt<PassType>;
    startetIFemte: EnumFelt<JaNei>;
    årsak?: EnumFelt<ÅrsakBarnepass>;
}

export enum PassType {
    BARNEHAGE_SFO_AKS = 'BARNEHAGE_SFO_AKS',
    PRIVAT = 'PRIVAT',
}

export enum ÅrsakBarnepass {
    TRENGER_MER_PASS_ENN_JEVNALDRENDE = 'TRENGER_MER_PASS_ENN_JEVNALDRENDE',
    MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID = 'MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID',
    INGEN_AV_DISSE = 'INGEN_AV_DISSE',
}

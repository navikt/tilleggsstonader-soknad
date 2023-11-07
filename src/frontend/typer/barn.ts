import { JaNei } from './søknad';

export interface Barn {
    id: string;
    alder: number;
    fødselsdato: string;
    fødselsnummer: string;
    navn: string;
    skalHaBarnepass: boolean;
}

export interface Barnepass {
    barnId: string;
    type: PassType;
    startetIFemte: JaNei;
    årsakBarnepass?: ÅrsakBarnepass;
}

export enum PassType {
    BARNEHAGE_SFO_AKS = 'BARNEHAGE_SFO_AKS',
    ANDRE = 'ANDRE',
}

export enum ÅrsakBarnepass {
    TRENGER_MER_PASS_ENN_JEVNALDRENDE = 'TRENGER_MER_PASS_ENN_JEVNALDRENDE',
    MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID = 'MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID',
}

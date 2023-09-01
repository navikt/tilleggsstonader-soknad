export interface Barn {
    id: string;
    alder: number;
    fødselsdato: string;
    fødselsnummer: string;
    navn: string;
    skalHaBarnepass: boolean;
}

export interface BarnMedBarnepass {
    id: string;
    passType: PassType;
    startetIFemte: boolean;
    årsakBarnepass?: ÅrsakBarnepass;
}

export interface BarnMedAllInfo {
    id: string;
    alder: number;
    fødselsdato: string;
    fødselsnummer: string;
    navn: string;
    skalHaBarnepass: boolean;
    passType?: PassType;
    startetIFemte?: boolean;
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

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
}

export interface BarnMedAllInfo {
    id: string;
    alder: number;
    fødselsdato: string;
    fødselsnummer: string;
    navn: string;
    skalHaBarnepass: boolean;
    passType?: PassType;
}

export enum PassType {
    BARNEHAGE_SFO_AKS = 'BARNEHAGE_SFO_AKS',
    ANDRE = 'ANDRE',
}

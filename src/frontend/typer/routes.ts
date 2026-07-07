export type Steg = 'FORSIDE' | 'HOVEDYTELSE' | 'VEDLEGG' | 'OPPSUMMERING' | 'KVITTERING';

export interface IRoute<TSteg extends string = Steg> {
    route: TSteg;
    path: string;
    label: string;
}

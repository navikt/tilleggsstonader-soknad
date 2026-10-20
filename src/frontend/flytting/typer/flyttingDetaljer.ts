import { EnumFelt, VerdiFelt } from '../../typer/skjema';
import { Adresse, JaNei } from '../../typer/søknad';

export type Flytteårsak = 'NY_JOBB' | 'AKTIVITET';
export type Flyttemåte = 'FLYTTER_SELV' | 'FLYTTEBYRÅ';
export type ValgtTilbud = 'TILBUD_1' | 'TILBUD_2';

export const egenutgiftFelter = ['hengerleie', 'bom', 'parkering', 'ferje', 'annet'] as const;
export type EgenutgiftFelt = (typeof egenutgiftFelter)[number];

export type UtgifterEgenFlytting = {
    avstand?: VerdiFelt<string>;
} & Partial<Record<EgenutgiftFelt, VerdiFelt<string>>>;

export interface FlyttebyråTilbud {
    navn?: VerdiFelt<string>;
    beløp?: VerdiFelt<string>;
}

export interface Flyttebyrå {
    tilbud1?: FlyttebyråTilbud;
    tilbud2?: FlyttebyråTilbud;
    valgtTilbud?: EnumFelt<ValgtTilbud>;
}

export interface FlyttingDetaljer {
    årsak?: EnumFelt<Flytteårsak>;
    flyttedato?: VerdiFelt<string>;
    førsteArbeidsdag?: VerdiFelt<string>;
    adresse?: Adresse;
    flyttemåte?: EnumFelt<Flyttemåte>;
    utgifterDekketPåAnnenMåte?: EnumFelt<JaNei>;
    utgifterEgenFlytting?: UtgifterEgenFlytting;
    flyttebyrå?: Flyttebyrå;
}

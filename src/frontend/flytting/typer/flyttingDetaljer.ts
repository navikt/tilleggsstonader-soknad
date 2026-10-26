import { EnumFelt, VerdiFelt } from '../../typer/skjema';
import { Adresse, JaNei } from '../../typer/søknad';

export type Flytteårsak = 'NY_JOBB' | 'AKTIVITET';
export type Flyttemåte = 'FLYTTER_SELV' | 'FLYTTEBYRÅ';

export const flyttebyråTilbudIndekser = [0, 1] as const;

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
    tilbud: FlyttebyråTilbud[];
}

export const tilFlyttingDetaljerForInnsending = (
    detaljer: FlyttingDetaljer | undefined
): FlyttingDetaljer | undefined => {
    if (!detaljer) {
        return undefined;
    }

    return {
        ...detaljer,
        utgifterEgenFlytting:
            detaljer.flyttemåte?.verdi === 'FLYTTER_SELV'
                ? detaljer.utgifterEgenFlytting
                : undefined,
        flyttebyrå: detaljer.flyttemåte?.verdi === 'FLYTTEBYRÅ' ? detaljer.flyttebyrå : undefined,
    };
};

export interface FlyttingDetaljer {
    årsak?: EnumFelt<Flytteårsak>;
    flyttedato?: VerdiFelt<string>;
    adresse?: Adresse;
    skalFlytteFraFolkeregistrertAdresse?: EnumFelt<JaNei>;
    adresseDetSkalFlyttesFra?: Adresse;
    flyttemåte?: EnumFelt<Flyttemåte>;
    utgifterDekketPåAnnenMåte?: EnumFelt<JaNei>;
    utgifterEgenFlytting?: UtgifterEgenFlytting;
    flyttebyrå?: Flyttebyrå;
}

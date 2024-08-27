import { EnumFelt } from '../../typer/skjema';

export interface Utdanning {
    annenUtdanning: EnumFelt<AnnenUtdanningType> | undefined;
}

export enum AnnenUtdanningType {
    VIDEREGÅENDE_FORKURS = 'VIDEREGÅENDE_FORKURS',
    FAGSKOLE_HØGSKOLE_UNIVERSITET = 'FAGSKOLE_HØGSKOLE_UNIVERSITET',
    KURS_LIKNENDE = 'KURS_LIKNENDE',
    INGEN_UTDANNING = 'INGEN_UTDANNING',
}

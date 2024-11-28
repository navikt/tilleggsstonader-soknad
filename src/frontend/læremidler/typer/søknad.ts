import { EnumFelt, EnumFlereValgFelt } from '../../typer/skjema';
import { JaNei } from '../../typer/søknad';

export interface Utdanning {
    aktiviteter: EnumFlereValgFelt<string> | undefined;
    annenUtdanning: EnumFelt<AnnenUtdanningType> | undefined;
    harFunksjonsnedsettelse: EnumFelt<JaNei> | undefined;
}

export enum AnnenUtdanningType {
    VIDEREGÅENDE_FORKURS = 'VIDEREGÅENDE_FORKURS',
    FAGSKOLE_HØGSKOLE_UNIVERSITET = 'FAGSKOLE_HØGSKOLE_UNIVERSITET',
    KURS_LIKNENDE = 'KURS_LIKNENDE',
    INGEN_UTDANNING = 'INGEN_UTDANNING',
}

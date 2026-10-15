import { Reisemåte } from '../../typer/reisemåte';
import { EnumFelt, EnumFlereValgFelt, VerdiFelt } from '../../typer/skjema';
import { Adresse, JaNei } from '../../typer/søknad';

export interface AdresseReiseOppstartAvslutningHjemreise {
    måBoBorteHjemmefra?: EnumFelt<JaNei>;
    fomFlyttedato?: VerdiFelt<string>;
    tomFlyttedato?: VerdiFelt<string>;
    skalReiseFraFolkeregistrertAdresse?: EnumFelt<JaNei>;
    adresseOriginaltBosted?: Adresse;
    adresseMidlertidigBosted?: Adresse;
}

export interface BarnOgHelseReiseOppstartAvslutningHjemreise {
    harBarnUnder18SomHarFlyttetMed?: EnumFelt<JaNei>;
    hvilkeBarnFlytterMed?: EnumFlereValgFelt<string>;
    harBarnHjemmeUnder4Klasse?: EnumFelt<JaNei>;
    harSærligeBehovForFlereHjemreiser?: EnumFelt<JaNei>;
}

export interface ReiseInfoReiseOppstartAvslutningHjemreise {
    typeReise?: EnumFelt<TypeReise>;
    fom?: VerdiFelt<string>;
    tom?: VerdiFelt<string>; // Brukes kun for hjemreise
    reisemåte?: Reisemåte;
}

export type TypeReise = 'OPPSTART' | 'AVSLUTNING' | 'HJEMREISE';

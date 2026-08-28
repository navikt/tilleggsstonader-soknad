import type { AktivitetTypeUtdanning } from '../../typer/aktivitet';
import type { EnumFelt } from '../../typer/skjema';
import type { AktivitetFelles, JaNei } from '../../typer/søknad';

export interface TilleggsopplysningerAnnenAktivitet {
    erLærlingEllerLiknende: EnumFelt<JaNei> | undefined;
    fårDekketReise: EnumFelt<JaNei> | undefined;
    erUnder25År: EnumFelt<JaNei> | undefined;
    måBetaleForReiseTilSkole: EnumFelt<JaNei> | undefined;
}

export interface AktivitetReiseTilSamling extends AktivitetFelles {
    tilleggsopplysningerAnnenAktivitet: TilleggsopplysningerAnnenAktivitet | undefined;
    annenAktivitetTypeUtdanning: EnumFelt<AktivitetTypeUtdanning> | undefined;
}

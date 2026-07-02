import { skalTaStillingTilRegisterAktiviteter } from '../../../components/Aktivitet/registerAktivitetUtil';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../../../typer/aktivitet';
import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';

export const skalViseArbeidsrettedeAktiviteter = (
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>
) => skalTaStillingTilRegisterAktiviteter(registerAktiviteter);

export const skalViseAktivitetTypeUtdanningValg = (
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined,
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined
) =>
    (annenAktivitet?.verdi &&
        [AnnenAktivitetType.UTDANNING, AnnenAktivitetType.TILTAK].includes(annenAktivitet.verdi)) ||
    (valgteAktiviteter?.verdier.some((verdi) => verdi.verdi !== 'ANNET') ?? false);

export const skalViseErLærlingEllerLiknende = (
    annenAktivitetTypeUtdanning: EnumFelt<AktivitetTypeUtdanning> | undefined
) => annenAktivitetTypeUtdanning?.verdi === AktivitetTypeUtdanning.VIDEREGÅENDE;

export const skalViseFårDekketReise = (erLærlingEllerLiknende: EnumFelt<JaNei> | undefined) =>
    erLærlingEllerLiknende?.verdi === 'JA';

export const skalViseErUnder25År = (erLærlingEllerLiknende: EnumFelt<JaNei> | undefined) =>
    erLærlingEllerLiknende?.verdi === 'NEI';

export const skalViseMåBetaleForReiseTilSkole = (erUnder25År: EnumFelt<JaNei> | undefined) =>
    erUnder25År?.verdi === 'JA';

export const skalViseLønnetTiltak = (
    annenAktivitetTypeUtdanning: EnumFelt<AktivitetTypeUtdanning> | undefined
) => annenAktivitetTypeUtdanning?.verdi === AktivitetTypeUtdanning.ANNET_TILTAK;

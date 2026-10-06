import { skalTaStillingTilRegisterAktiviteter } from '../../../components/Aktivitet/registerAktivitetUtil';
import { Ytelse } from '../../../components/Hovedytelse/typer';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../../../typer/aktivitet';
import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { Hovedytelse, JaNei } from '../../../typer/søknad';

// Disse målgruppene skal ikke få spørsmål om lønnet tiltak,
// uavhengig av hvilken aktivitet/tiltak/utdanning de har valgt.
const ytelserUtenSpørsmålOmLønnetTiltak: Ytelse[] = [
    'TILTAKSPENGER',
    'KVALIFISERINGSSTØNAD',
    'GJENLEVENDEPENSJON',
    'OVERGANGSSTØNAD',
    'DAGPENGER',
];

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
    annenAktivitetTypeUtdanning: EnumFelt<AktivitetTypeUtdanning> | undefined,
    hovedytelse: Hovedytelse | undefined
) => {
    const harYtelseMedSpørsmålOmLønnetTiltak =
        hovedytelse?.ytelse.verdier.some(
            (ytelse) => !ytelserUtenSpørsmålOmLønnetTiltak.includes(ytelse.verdi)
        ) ?? false;

    return (
        annenAktivitetTypeUtdanning?.verdi === AktivitetTypeUtdanning.ANNET_TILTAK &&
        harYtelseMedSpørsmålOmLønnetTiltak
    );
};

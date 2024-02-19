import { BarnepassIntern } from './typer';
import { Barn, PassType } from '../../../typer/barn';
import { DokumentasjonFelt, Vedleggstype } from '../../../typer/skjema';
import { Locale } from '../../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../../utils/tekster';
import { typerVedleggTekster } from '../../tekster/vedlegg';

/**
 * Oppdaterer dokumentasjon
 * Beholder dokument som ikke er koblet til barn
 * Oppdaterer dokument koblet til barn, fjerner ved behov og legger til ved behov
 */
export const oppdaterDokumentasjonFeltForBarnMedPass = (
    aktuelleBarn: BarnepassIntern[],
    personBarn: Barn[],
    alleDokument: DokumentasjonFelt[],
    locale: Locale
): DokumentasjonFelt[] => {
    const nyeDokument = aktuelleBarn.reduce((dokumentasjonFelt, barnMedPass) => {
        const andreDokument = dokumentasjonFelt.filter(
            (dokument) => dokument.barnId !== barnMedPass.ident
        );
        const dokumentForBarn = dokumentasjonFelt.filter(
            (dokument) => dokument.barnId === barnMedPass.ident
        );
        const barn = personBarn.find((barn) => barn.ident === barnMedPass.ident)!;
        return [
            ...andreDokument,
            ...utledDokumentasjonFeltForBarn(barnMedPass, barn, dokumentForBarn, locale),
        ];
    }, alleDokument);
    return nyeDokument;
};

const utledDokumentasjonFeltForBarn = (
    barnMedPass: BarnepassIntern,
    barn: Barn,
    dokumentasjonFelt: DokumentasjonFelt[],
    locale: Locale
): DokumentasjonFelt[] => {
    let dokument = dokumentasjonFelt;
    dokument = oppdaterPassType(barnMedPass, barn, dokument, locale);
    dokument = oppdaterEkstraPass(barnMedPass, barn, dokument, locale);
    return dokument;
};

const oppdaterPassType = (
    barnMedPass: BarnepassIntern,
    barn: Barn,
    dokumentasjonFelt: DokumentasjonFelt[],
    locale: Locale
) => {
    let dokument = dokumentasjonFelt;
    if (barnMedPass.type?.verdi === PassType.BARNEHAGE_SFO_AKS) {
        dokument = fjernType(dokument, Vedleggstype.UTGIFTER_PASS_ANNET);
        dokument = leggTilHvisIkkeFinnes(
            barn,
            dokument,
            Vedleggstype.UTGIFTER_PASS_SFO_AKS_BARNEHAGE,
            locale
        );
    } else if (barnMedPass.type?.verdi === PassType.ANDRE) {
        dokument = fjernType(dokument, Vedleggstype.UTGIFTER_PASS_SFO_AKS_BARNEHAGE);
        dokument = leggTilHvisIkkeFinnes(barn, dokument, Vedleggstype.UTGIFTER_PASS_ANNET, locale);
    }
    return dokument;
};

const oppdaterEkstraPass = (
    barnMedPass: BarnepassIntern,
    barn: Barn,
    dokumentasjonFelt: DokumentasjonFelt[],
    locale: Locale
) => {
    if (barnMedPass.årsak?.verdi) {
        return leggTilHvisIkkeFinnes(
            barn,
            dokumentasjonFelt,
            Vedleggstype.EKSTRA_PASS_BEHOV,
            locale
        );
    } else {
        return fjernType(dokumentasjonFelt, Vedleggstype.EKSTRA_PASS_BEHOV);
    }
};

const leggTilHvisIkkeFinnes = (
    barn: Barn,
    dokumentForBarn: DokumentasjonFelt[],
    type: Vedleggstype,
    locale: Locale
): DokumentasjonFelt[] => {
    if (dokumentForBarn.some((dokument) => dokument.type === type)) {
        return dokumentForBarn;
    } else {
        return [...dokumentForBarn, lagDokumentasjonsfelt(barn, type, locale)];
    }
};

const lagDokumentasjonsfelt = (
    barn: Barn,
    type: Vedleggstype,
    locale: Locale
): DokumentasjonFelt => {
    const tittel = hentBeskjedMedEttParameter(barn.navn, typerVedleggTekster[type].tittel[locale]);
    return {
        type: type,
        label: tittel,
        harSendtInn: false,
        opplastedeVedlegg: [],
        barnId: barn.ident,
    };
};

const fjernType = (dokumentForBarn: DokumentasjonFelt[], type: Vedleggstype): DokumentasjonFelt[] =>
    dokumentForBarn.filter((dokument) => dokument.type !== type);

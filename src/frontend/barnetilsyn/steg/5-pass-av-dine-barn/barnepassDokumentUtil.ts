import { Barn, Barnepass, PassType, ÅrsakBarnepass } from '../../../typer/barn';
import { Dokumentasjonsbehov, VedleggstypePassAvBarn } from '../../../typer/skjema';

export const oppdaterDokumentasjonsbehovForBarnMedPass = (
    barnMedPass: Barnepass[],
    barn: Barn[],
    eksisterendeDokumenter: Dokumentasjonsbehov[]
): Dokumentasjonsbehov[] => {
    const andreDokumenter = eksisterendeDokumenter.filter(
        (dokument) => dokument.barn === undefined
    );
    const dokumentasjonsbehovForBarn = barnMedPass.flatMap((passInfo) => {
        const aktueltBarn = barn.find((barn) => barn.ident === passInfo.ident)!;
        return utledDokumentasjonsbehovForBarn(passInfo, aktueltBarn);
    });

    return [...andreDokumenter, ...dokumentasjonsbehovForBarn];
};

const utledDokumentasjonsbehovForBarn = (
    passInfo: Barnepass,
    barn: Barn
): Dokumentasjonsbehov[] => {
    const dokumentasjonsbehov = [utledDokumentasjonsbehovPassType(passInfo, barn)];

    const årsakEkstraPassVedleggType =
        passInfo.årsak?.verdi && årsakEkstraPassTilVedlegg[passInfo.årsak?.verdi];

    if (årsakEkstraPassVedleggType !== undefined) {
        dokumentasjonsbehov.push({
            barn: barn,
            type: årsakEkstraPassVedleggType,
        });
    }

    return dokumentasjonsbehov;
};

const utledDokumentasjonsbehovPassType = (passInfo: Barnepass, barn: Barn): Dokumentasjonsbehov => {
    return {
        barn: barn,
        type: passTypeTilVedlegg[passInfo.type.verdi],
    };
};

const passTypeTilVedlegg: Record<PassType, VedleggstypePassAvBarn> = {
    [PassType.BARNEHAGE_SFO_AKS]: VedleggstypePassAvBarn.UTGIFTER_PASS_SFO_AKS_BARNEHAGE,
    [PassType.PRIVAT]: VedleggstypePassAvBarn.UTGIFTER_PASS_PRIVAT,
};

const årsakEkstraPassTilVedlegg: Partial<Record<ÅrsakBarnepass, VedleggstypePassAvBarn>> = {
    [ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE]:
        VedleggstypePassAvBarn.SKRIFTLIG_UTTALELSE_HELSEPERSONELL,
    [ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID]:
        VedleggstypePassAvBarn.TILTAKSSTED_ELLER_UTDANNINGSSTED,
};

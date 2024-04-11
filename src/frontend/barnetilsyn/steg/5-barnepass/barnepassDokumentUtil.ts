import { Barn, Barnepass, PassType, ÅrsakBarnepass } from '../../../typer/barn';
import { Dokumentasjonsbehov, Vedleggstype } from '../../../typer/skjema';

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

const passTypeTilVedlegg: Record<PassType, Vedleggstype> = {
    [PassType.BARNEHAGE_SFO_AKS]: Vedleggstype.UTGIFTER_PASS_SFO_AKS_BARNEHAGE,
    [PassType.ANDRE]: Vedleggstype.UTGIFTER_PASS_ANNET,
};

const årsakEkstraPassTilVedlegg: Partial<Record<ÅrsakBarnepass, Vedleggstype>> = {
    [ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE]:
        Vedleggstype.SKRIFTLIG_UTTALELSE_HELSEPERSONELL,
    [ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID]:
        Vedleggstype.TILTAKSSTED_ELLER_UTDANNINGSSTED,
};

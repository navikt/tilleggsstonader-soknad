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

    if (passInfo.årsak?.verdi) {
        dokumentasjonsbehov.push({
            barn: barn,
            type: årsakEkstraPassTilVedlegg[passInfo.årsak.verdi],
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

const årsakEkstraPassTilVedlegg: Record<ÅrsakBarnepass, Vedleggstype> = {
    [ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE]: Vedleggstype.EKSTRA_PASS_BEHOV,
    // TODO: Skal disse mappes til noe annet eller evt. ikke noe for siste?
    [ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID]: Vedleggstype.EKSTRA_PASS_BEHOV,
    [ÅrsakBarnepass.INGEN_AV_DISSE]: Vedleggstype.EKSTRA_PASS_BEHOV,
};

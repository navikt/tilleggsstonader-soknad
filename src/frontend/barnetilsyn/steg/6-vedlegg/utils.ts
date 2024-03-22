import { Barn } from '../../../typer/barn';
import {
    Dokument,
    DokumentasjonFelt,
    Dokumentasjonsbehov,
    Vedleggstype,
} from '../../../typer/skjema';
import { Locale } from '../../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../../utils/tekster';
import { typerVedleggTekster } from '../../tekster/vedlegg';

export const leggTilVedlegg = (
    alleDokumentasjonFelter: DokumentasjonFelt[],
    dokumentasjonFeltSomSkalOppdateres: DokumentasjonFelt,
    vedlegg: Dokument
): DokumentasjonFelt[] => {
    return alleDokumentasjonFelter.map((dokumentasjon) => {
        if (dokumentajonFeltEquals(dokumentasjon, dokumentasjonFeltSomSkalOppdateres)) {
            return {
                ...dokumentasjon,
                opplastedeVedlegg: [...dokumentasjon.opplastedeVedlegg, vedlegg],
            };
        } else {
            return dokumentasjon;
        }
    });
};

export const fjernVedlegg = (
    alleDokumentasjonFelter: DokumentasjonFelt[],
    dokumentasjonFeltSomSkalOppdateres: DokumentasjonFelt,
    dokumentSomSkalSlettet: Dokument
): DokumentasjonFelt[] => {
    return alleDokumentasjonFelter.map((dokumentasjon) => {
        if (dokumentajonFeltEquals(dokumentasjon, dokumentasjonFeltSomSkalOppdateres)) {
            return {
                ...dokumentasjon,
                opplastedeVedlegg: dokumentasjon.opplastedeVedlegg.filter(
                    (vedlegg) => vedlegg.id !== dokumentSomSkalSlettet.id
                ),
            };
        } else {
            return dokumentasjon;
        }
    });
};

export const toggleHarSendtInn = (
    alleDokumentasjonFelter: DokumentasjonFelt[],
    dokumentasjonFeltSomSkalOppdateres: DokumentasjonFelt
): DokumentasjonFelt[] => {
    return alleDokumentasjonFelter.map((dokumentasjon) => {
        if (dokumentajonFeltEquals(dokumentasjon, dokumentasjonFeltSomSkalOppdateres)) {
            return {
                ...dokumentasjon,
                harSendtInn: !dokumentasjon.harSendtInn,
            };
        } else {
            return dokumentasjon;
        }
    });
};

/**
 * Sjekker at det er samme type og barnId
 * Listen over dokumentajonFelt bør kun inneholde unike typer, eller unike typer/barnId
 */
const dokumentajonFeltEquals = (first: DokumentasjonFelt, second: DokumentasjonFelt) =>
    first.type === second.type && first.barnId === second.barnId;

/**
 * Brukes for å opprette dokumentasjonsfelter for alle dokumentasjonsbehov funnet i tidligere steg.
 * Samler noen dokumentasjonsbehov, slik at bruker slipper å feks laste opp samme barnehagefaktura to ganger.
 * @returns Alle dokumentasjonsfelter bruker må fylle ut på vedleggssiden
 */
export const opprettDokumentasjonsfelt = (
    dokumentasjonsbehov: Dokumentasjonsbehov[],
    eksisterendeDokumentasjon: DokumentasjonFelt[],
    locale: Locale
): DokumentasjonFelt[] => {
    const kanSamles = dokumentasjonsbehov.filter(skalHaSamletOpplasting);
    const kanIkkeSamles = dokumentasjonsbehov.filter(
        (dokBehov) => !skalHaSamletOpplasting(dokBehov)
    );

    const samletDokumentasjon = lagSamledeDokumentasjonsfelter(
        kanSamles,
        eksisterendeDokumentasjon,
        locale
    );

    const individuellDokumentasjon = lagIndividuelleDokumentasjonsfelter(
        kanIkkeSamles,
        eksisterendeDokumentasjon,
        locale
    );

    return [...samletDokumentasjon, ...individuellDokumentasjon];
};

const lagSamledeDokumentasjonsfelter = (
    dokumentasjonsbehov: Dokumentasjonsbehov[],
    eksisterendeDokumentasjon: DokumentasjonFelt[],
    locale: Locale
): DokumentasjonFelt[] => {
    const vedleggstyper = [...new Set(dokumentasjonsbehov.map((dokBehov) => dokBehov.type))];

    return vedleggstyper.map((vedleggstype) => {
        const eksisterendeDokumentasjonsFelt = finnEksisterendeDokumentasjonsfelt(
            eksisterendeDokumentasjon,
            vedleggstype
        );

        return eksisterendeDokumentasjonsFelt
            ? eksisterendeDokumentasjonsFelt
            : lagDokumentasjonsfelt(vedleggstype, locale);
    });
};

const lagIndividuelleDokumentasjonsfelter = (
    dokumentasjonsbehov: Dokumentasjonsbehov[],
    eksisterendeDokumentasjon: DokumentasjonFelt[],
    locale: Locale
): DokumentasjonFelt[] => {
    return dokumentasjonsbehov.map((dokBehov) => {
        const eksisterendeDokumentasjonsFelt = finnEksisterendeDokumentasjonsfelt(
            eksisterendeDokumentasjon,
            dokBehov.type,
            dokBehov.barn?.ident
        );

        return eksisterendeDokumentasjonsFelt
            ? eksisterendeDokumentasjonsFelt
            : lagDokumentasjonsfelt(dokBehov.type, locale, dokBehov.barn);
    });
};

const lagDokumentasjonsfelt = (
    type: Vedleggstype,
    locale: Locale,
    barn?: Barn
): DokumentasjonFelt => {
    const tittel = barn
        ? hentBeskjedMedEttParameter(barn.visningsnavn, typerVedleggTekster[type].tittel[locale])
        : typerVedleggTekster[type].tittel[locale];

    return {
        type: type,
        label: tittel,
        harSendtInn: false,
        opplastedeVedlegg: [],
        barnId: barn?.ident,
    };
};

const finnEksisterendeDokumentasjonsfelt = (
    eksisterendeDokumentasjon: DokumentasjonFelt[],
    vedleggstype: Vedleggstype,
    barnId?: string
) =>
    eksisterendeDokumentasjon.find(
        (dokumentasjon) => dokumentasjon.type === vedleggstype && dokumentasjon.barnId === barnId
    );

/**
 * Sjekker om dokumentasjonsbehovet skal ha samlet felt for opplasting av dokumentasjon.
 * Brukes for å samle utgifter til pass av barn.
 */
const skalHaSamletOpplasting = (dokumentasjonsbehov: Dokumentasjonsbehov): boolean =>
    [Vedleggstype.UTGIFTER_PASS_ANNET, Vedleggstype.UTGIFTER_PASS_SFO_AKS_BARNEHAGE].includes(
        dokumentasjonsbehov.type
    );

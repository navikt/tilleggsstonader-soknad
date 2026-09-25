import { EnumFlereValgFelt, EnumFelt, VerdiFelt } from '../../typer/skjema';
import { JaNei } from '../../typer/søknad';

export interface Reisemåte {
    hvilkeTransportmidlerBleBenyttet?: EnumFlereValgFelt<Transportmiddel>;
    unntakFraOffentligTransport?: UnntakFraOffentligTransport;
    unntakFraPrivatBil?: EnumFlereValgFelt<ÅrsakKanIkkeBenytteEgenBil>;

    offentligTransport?: OffentligTransportInfo;
    privatBil?: PrivatBilInfo;
    drosje?: DrosjeInfo;
}

export interface OffentligTransportInfo {
    totalUtgifterOffentligTransport?: VerdiFelt<string>;
}

export interface PrivatBilInfo {
    benyttetEgenBil?: EnumFelt<JaNei>;
    betalteForReisen?: EnumFelt<JaNei>;
    infoBilKunDelerAvStrekning?: InfoBilKunDelerAvStrekning;
    utgifterPrivatBil?: UtgifterPrivatBil;
}

export interface DrosjeInfo {
    harTTKort?: EnumFelt<JaNei>;
}

export interface UnntakFraOffentligTransport {
    årsaker?: EnumFlereValgFelt<ÅrsakKanIkkeBenytteOffentligTransport>;
    leveringOgHentingIBarnehage?: LeveringOgHentingIBarnehage;
}

export interface LeveringOgHentingIBarnehage {
    gateadresse?: VerdiFelt<string>;
    postnummer?: VerdiFelt<string>;
}

export interface UtgifterPrivatBil {
    bompenger?: VerdiFelt<string>;
    ferge?: VerdiFelt<string>;
    piggdekkavgift?: VerdiFelt<string>;
    parkering?: VerdiFelt<string>;
    drivstoffType?: EnumFelt<DrivstoffType>;
}

export interface InfoBilKunDelerAvStrekning {
    strekningHvorBilBleBenyttet?: VerdiFelt<string>;
    antallKilometerKjørt?: VerdiFelt<string>;
}

export type KanBenytteEgenBil = 'JA' | 'NEI' | 'NEI_SITTER_PÅ_MED_ANDRE';

export type ÅrsakKanIkkeBenytteOffentligTransport =
    | 'DÅRLIG_TRANSPORTTILBUD'
    | 'HELSEMESSIGE_ÅRSAKER'
    | 'LEVERING_HENTING_I_BARNEHAGE'
    | 'FRAKT_AV_NØDVENDIG_UTSTYR';

export type ÅrsakKanIkkeBenytteEgenBil =
    'HAR_IKKE_BIL_ELLER_FØRERKORT' | 'HELSEMESSIGE_ÅRSAKER' | 'FRAKT_AV_NØDVENDIG_UTSTYR' | 'ANNET';

export type DrivstoffType = 'BENSIN' | 'DIESEL' | 'ELBIL' | 'HYBRID' | 'HYDROGEN';

export type Transportmiddel = 'OFFENTLIG_TRANSPORT' | 'PRIVAT_BIL' | 'DROSJE';

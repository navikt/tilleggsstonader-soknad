import { EnumFelt } from '../../../typer/skjema';

export type Ytelse = 'AAP' | 'OVERGANGSSTØNAD' | 'GJENLEVENDEPENSJON';
export type YtelseOgAnnet = Ytelse | 'ANNET';
export type AnnenYtelse =
    | 'DAGPENGER'
    | 'TILTAKSPENGER'
    | 'KVALIFIKASJONSPROGRAMMET'
    | 'INTRODUKSJONSPROGRAMMET'
    | 'SYKEPENGER'
    | 'UFØRETRYGD'
    | 'INGEN_PENGESTØTTE';

export const erYtelse = (
    verdi: EnumFelt<YtelseOgAnnet | AnnenYtelse>
): verdi is EnumFelt<Ytelse> => {
    switch (verdi.verdi) {
        case 'AAP':
        case 'OVERGANGSSTØNAD':
        case 'GJENLEVENDEPENSJON':
            return true;
        default:
            return false;
    }
};
export const erYtelseEllerAnnet = (
    verdi: EnumFelt<YtelseOgAnnet | AnnenYtelse>
): verdi is EnumFelt<YtelseOgAnnet> => erYtelse(verdi) || verdi.verdi === 'ANNET';

export const erAnnenYtelse = (
    verdi: EnumFelt<Ytelse | AnnenYtelse>
): verdi is EnumFelt<AnnenYtelse> => !erYtelseEllerAnnet(verdi);

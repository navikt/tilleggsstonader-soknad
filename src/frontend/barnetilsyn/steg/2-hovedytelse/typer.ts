export type Ytelse = 'AAP' | 'OVERGANGSSTØNAD' | 'GJENLEVENDEPENSJON' | 'ANNET';
export type AnnenYtelse =
    | 'DAGPENGER'
    | 'TILTAKSPENGER'
    | 'KVALIFIKASJONSPROGRAMMET'
    | 'INTRODUKSJONSPROGRAMMET'
    | 'SYKEPENGER'
    | 'UFØRETRYGD'
    | 'INGEN_PENGESTØTTE';
export const erYtelse = (verdi: Ytelse | AnnenYtelse): verdi is Ytelse => {
    switch (verdi) {
        case 'AAP':
        case 'OVERGANGSSTØNAD':
        case 'GJENLEVENDEPENSJON':
        case 'ANNET':
            return true;
        default:
            return false;
    }
};

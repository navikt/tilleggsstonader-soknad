export type Ytelse = 'aap' | 'overgangsstønad' | 'gjenlevendepensjon' | 'annet';
export type AnnenYtelse =
    | 'dagpenger'
    | 'tiltakspenger'
    | 'kvalifikasjonsprogrammet'
    | 'introduksjonsprogrammet'
    | 'sykepenger'
    | 'uføretrygd'
    | 'ingen_pengestøtte';
export const erYtelse = (verdi: Ytelse | AnnenYtelse): verdi is Ytelse => {
    switch (verdi) {
        case 'aap':
        case 'overgangsstønad':
        case 'gjenlevendepensjon':
        case 'annet':
            return true;
        default:
            return false;
    }
};

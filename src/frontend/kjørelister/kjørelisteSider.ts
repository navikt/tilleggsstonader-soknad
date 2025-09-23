export enum KjørelisteSider {
    LANDINGSSIDE = 'LANDINGSSIDE',
    SKJEMA = 'SKJEMA',
    VEDLEGG = 'VEDLEGG',
    OPPSUMMERING = 'OPPSUMMERING',
    KVITTERING = 'KVITTERING',
}

export const kjørelistePath = '/kjoreliste';

export const SideTilPath: Record<KjørelisteSider, string> = {
    LANDINGSSIDE: kjørelistePath + '/',
    SKJEMA: kjørelistePath + '/skjema',
    VEDLEGG: kjørelistePath + '/vedlegg',
    OPPSUMMERING: kjørelistePath + '/oppsummering',
    KVITTERING: kjørelistePath + '/kvittering',
};

export enum RouteKjørelste {
    LANDINGSSIDE = 'LANDINGSSIDE',
    SKJEMA = 'SKJEMA',
    VEDLEGG = 'VEDLEGG',
    OPPSUMMERING = 'OPPSUMMERING',
    KVITTERING = 'KVITTERING',
}

export const kjørelistePath = '/kjoreliste';

export const RouteTilPath: Record<RouteKjørelste, string> = {
    LANDINGSSIDE: kjørelistePath + '/',
    SKJEMA: kjørelistePath + '/skjema',
    VEDLEGG: kjørelistePath + '/vedlegg',
    OPPSUMMERING: kjørelistePath + '/oppsummering',
    KVITTERING: kjørelistePath + '/kvittering',
};

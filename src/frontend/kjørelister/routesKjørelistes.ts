export enum RouteKjørelste {
    LANDINGSSIDE = 'LANDINGSSIDE',
    SKJEMA = 'SKJEMA',
    VEDLEGG = 'VEDLEGG',
    KVITTERING = 'KVITTERING',
}

export const kjørelistePath = '/kjoreliste';

export const RouteTilPath: Record<RouteKjørelste, string> = {
    LANDINGSSIDE: kjørelistePath + '/',
    SKJEMA: kjørelistePath + '/skjema',
    VEDLEGG: kjørelistePath + '/vedlegg',
    KVITTERING: kjørelistePath + '/kvittering',
};

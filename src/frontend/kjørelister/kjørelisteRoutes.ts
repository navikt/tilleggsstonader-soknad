export enum KjørelisteRoutes {
    LANDINGSSIDE = '',
    SKJEMA = 'skjema',
    VEDLEGG = 'vedlegg',
    OPPSUMMERING = 'oppsummering',
    KVITTERING = 'kvittering',
}

export const kjørelistePath = '/kjoreliste';

export function finnPath(kjørelisteId: string, route: KjørelisteRoutes): string {
    switch (route) {
        case KjørelisteRoutes.LANDINGSSIDE:
            return `${kjørelistePath}/`;
        case KjørelisteRoutes.SKJEMA:
        case KjørelisteRoutes.VEDLEGG:
        case KjørelisteRoutes.OPPSUMMERING:
        case KjørelisteRoutes.KVITTERING:
            return `${kjørelistePath}/${kjørelisteId}/${route}`;
    }
}

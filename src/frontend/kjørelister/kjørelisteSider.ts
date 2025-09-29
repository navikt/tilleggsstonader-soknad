export enum KjørelisteSider {
    LANDINGSSIDE = '',
    SKJEMA = 'skjema',
    VEDLEGG = 'vedlegg',
    OPPSUMMERING = 'oppsummering',
    KVITTERING = 'kvittering',
}

export const kjørelistePath = '/kjoreliste';

export function finnPath(kjørelisteId: string, route: KjørelisteSider): string {
    switch (route) {
        case KjørelisteSider.LANDINGSSIDE:
            return `${kjørelistePath}/`;
        case KjørelisteSider.SKJEMA:
        case KjørelisteSider.VEDLEGG:
        case KjørelisteSider.OPPSUMMERING:
        case KjørelisteSider.KVITTERING:
            return `${kjørelistePath}/${kjørelisteId}/${route}`;
    }
}

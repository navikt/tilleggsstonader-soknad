import { IRoute } from '../../typer/routes';

export enum ERouteBarnetilsyn {
    FORSIDE = 'FORSIDE',
    PERSONALIA = 'PERSONALIA',
    HOVEDYTELSE = 'HOVEDYTELSE',
    AKTIVITET = 'AKTIVITET',
    DINE_BARN = 'DINE_BARN',
    OPPSUMMERING = 'OPPSUMMERING',
    KVITTERING = 'KVITTERING',
}

export const barnetilsynPath = '/barnetilsyn';

export const RoutesBarnetilsyn: IRoute[] = [
    { path: barnetilsynPath, label: 'Forside', route: ERouteBarnetilsyn.FORSIDE },
    {
        path: barnetilsynPath + '/personalia',
        label: 'Personalia',
        route: ERouteBarnetilsyn.PERSONALIA,
    },
    {
        path: barnetilsynPath + '/hovedytelse',
        label: 'Hovedytelse',
        route: ERouteBarnetilsyn.HOVEDYTELSE,
    },
    {
        path: barnetilsynPath + '/aktivitet',
        label: 'Aktivitet',
        route: ERouteBarnetilsyn.AKTIVITET,
    },
    {
        path: barnetilsynPath + '/dine-barn',
        label: 'Personalia',
        route: ERouteBarnetilsyn.DINE_BARN,
    },
    {
        path: barnetilsynPath + '/oppsummering',
        label: 'Oppsummering',
        route: ERouteBarnetilsyn.OPPSUMMERING,
    },
    {
        path: barnetilsynPath + '/kvittering',
        label: 'Personalia',
        route: ERouteBarnetilsyn.KVITTERING,
    },
];

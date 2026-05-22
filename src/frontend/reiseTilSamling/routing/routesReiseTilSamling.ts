import { IRoute } from '../../typer/routes';

export enum ERouteReiseTilSamling {
    FORSIDE = 'FORSIDE',
    HOVEDYTELSE = 'HOVEDYTELSE',
    AKTIVITET = 'AKTIVITET',
    REISEAVSTAND = 'REISEAVSTAND',
    SAMLINGER = 'SAMLINGER',
    REISEMÅTE = 'REISEMÅTE',
    NESTE_STEG = 'NESTE_STEG',
}

export const reiseTilSamlingPath = '/reise-til-samling';

export const RouteTilPath: Record<ERouteReiseTilSamling, string> = {
    FORSIDE: reiseTilSamlingPath,
    HOVEDYTELSE: reiseTilSamlingPath + '/hovedytelse',
    AKTIVITET: reiseTilSamlingPath + '/aktivitet',
    REISEAVSTAND: reiseTilSamlingPath + '/reiseavstand',
    SAMLINGER: reiseTilSamlingPath + '/samlinger',
    REISEMÅTE: reiseTilSamlingPath + '/reisemate',
    NESTE_STEG: reiseTilSamlingPath + '/neste-steg',
};

export const routesReiseTilSamling: IRoute[] = [
    { path: reiseTilSamlingPath, label: 'Forside', route: ERouteReiseTilSamling.FORSIDE },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Din situasjon',
        route: ERouteReiseTilSamling.HOVEDYTELSE,
    },
    {
        path: RouteTilPath.AKTIVITET,
        label: 'Aktivitet',
        route: ERouteReiseTilSamling.AKTIVITET,
    },
    {
        path: RouteTilPath.REISEAVSTAND,
        label: 'Reiseavstand',
        route: ERouteReiseTilSamling.REISEAVSTAND,
    },
    {
        path: RouteTilPath.SAMLINGER,
        label: 'Samlinger',
        route: ERouteReiseTilSamling.SAMLINGER,
    },
    {
        path: RouteTilPath.REISEMÅTE,
        label: 'Reisemåte',
        route: ERouteReiseTilSamling.REISEMÅTE,
    },
    {
        path: RouteTilPath.NESTE_STEG,
        label: 'Neste steg',
        route: ERouteReiseTilSamling.NESTE_STEG,
    },
];

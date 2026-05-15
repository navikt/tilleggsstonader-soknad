import { IRoute } from '../../typer/routes';

export enum ERouteReiseTilSamling {
    FORSIDE = 'FORSIDE',
    HOVEDYTELSE = 'HOVEDYTELSE',
    AKTIVITET = 'AKTIVITET',
    NESTE_STEG = 'NESTE_STEG',
}

export const reiseTilSamlingPath = '/reise-til-samling';

export const RouteTilPath: Record<ERouteReiseTilSamling, string> = {
    FORSIDE: reiseTilSamlingPath,
    HOVEDYTELSE: reiseTilSamlingPath + '/hovedytelse',
    AKTIVITET: reiseTilSamlingPath + '/aktivitet',
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
        path: RouteTilPath.NESTE_STEG,
        label: 'Neste steg',
        route: ERouteReiseTilSamling.NESTE_STEG,
    },
];

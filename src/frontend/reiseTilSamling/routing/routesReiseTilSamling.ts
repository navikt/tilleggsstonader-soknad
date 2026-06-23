import { IRoute } from '../../typer/routes';

export enum ERouteReiseTilSamling {
    INTRO = 'INTRO',
    HOVEDYTELSE = 'HOVEDYTELSE',
    AKTIVITET = 'AKTIVITET',
    REISEAVSTAND = 'REISEAVSTAND',
    SAMLINGER = 'SAMLINGER',
    REISEMÅTE = 'REISEMÅTE',
    VEDLEGG = 'VEDLEGG',
    OPPSUMMERING = 'OPPSUMMERING',
    KVITTERING = 'KVITTERING',
}

export const reiseTilSamlingPath = '/reise-til-samling';

export const RouteTilPath: Record<ERouteReiseTilSamling, string> = {
    INTRO: reiseTilSamlingPath + '/intro',
    HOVEDYTELSE: reiseTilSamlingPath + '/hovedytelse',
    AKTIVITET: reiseTilSamlingPath + '/aktivitet',
    REISEAVSTAND: reiseTilSamlingPath + '/reiseavstand',
    SAMLINGER: reiseTilSamlingPath + '/samlinger',
    REISEMÅTE: reiseTilSamlingPath + '/reisemate',
    VEDLEGG: reiseTilSamlingPath + '/vedlegg',
    OPPSUMMERING: reiseTilSamlingPath + '/oppsummering',
    KVITTERING: reiseTilSamlingPath + '/kvittering',
};

export const routesReiseTilSamling: IRoute[] = [
    { path: reiseTilSamlingPath + '/intro', label: 'Forside', route: ERouteReiseTilSamling.INTRO },
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
        path: RouteTilPath.VEDLEGG,
        label: 'Vedlegg',
        route: ERouteReiseTilSamling.VEDLEGG,
    },
    {
        path: RouteTilPath.OPPSUMMERING,
        label: 'Oppsummering',
        route: ERouteReiseTilSamling.OPPSUMMERING,
    },
    {
        path: RouteTilPath.KVITTERING,
        label: 'Kvittering',
        route: ERouteReiseTilSamling.KVITTERING,
    },
];

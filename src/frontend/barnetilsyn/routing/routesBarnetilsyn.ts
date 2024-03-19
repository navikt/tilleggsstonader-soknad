import { IRoute } from '../../typer/routes';

export enum ERouteBarnetilsyn {
    FORSIDE = 'FORSIDE',
    HOVEDYTELSE = 'HOVEDYTELSE',
    AKTIVITET = 'AKTIVITET',
    DINE_BARN = 'DINE_BARN',
    VEDLEGG = 'VEDLEGG',
    BARNEPASS = 'BARNEPASS',
    OPPSUMMERING = 'OPPSUMMERING',
    KVITTERING = 'KVITTERING',
}

export const barnetilsynPath = '/barnetilsyn';
export const RouteTilPath: Record<ERouteBarnetilsyn, string> = {
    AKTIVITET: barnetilsynPath + '/aktivitet',
    BARNEPASS: barnetilsynPath + '/barnepass',
    DINE_BARN: barnetilsynPath + '/dine-barn',
    FORSIDE: barnetilsynPath,
    HOVEDYTELSE: barnetilsynPath + '/hovedytelse',
    KVITTERING: barnetilsynPath + '/kvittering',
    OPPSUMMERING: barnetilsynPath + '/oppsummering',
    VEDLEGG: barnetilsynPath + '/vedlegg',
};

export const RoutesBarnetilsyn: IRoute[] = [
    { path: barnetilsynPath, label: 'Forside', route: ERouteBarnetilsyn.FORSIDE },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Hovedytelse',
        route: ERouteBarnetilsyn.HOVEDYTELSE,
    },
    {
        path: RouteTilPath.AKTIVITET,
        label: 'Aktivitet',
        route: ERouteBarnetilsyn.AKTIVITET,
    },
    {
        path: RouteTilPath.DINE_BARN,
        label: 'Dine barn',
        route: ERouteBarnetilsyn.DINE_BARN,
    },
    {
        path: RouteTilPath.BARNEPASS,
        label: 'Barnepass',
        route: ERouteBarnetilsyn.BARNEPASS,
    },
    {
        path: RouteTilPath.VEDLEGG,
        label: 'Vedlegg',
        route: ERouteBarnetilsyn.VEDLEGG,
    },
    {
        path: RouteTilPath.OPPSUMMERING,
        label: 'Oppsummering',
        route: ERouteBarnetilsyn.OPPSUMMERING,
    },
    {
        path: RouteTilPath.KVITTERING,
        label: 'Personalia',
        route: ERouteBarnetilsyn.KVITTERING,
    },
];

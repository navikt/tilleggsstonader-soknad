import { IRoute, Steg } from '../../typer/routes';

export type BarnetilsynSteg = Steg | 'AKTIVITET' | 'DINE_BARN' | 'BARNEPASS';

export const barnetilsynPath = '/pass-av-barn';
export const RouteTilPath: Record<BarnetilsynSteg, string> = {
    AKTIVITET: barnetilsynPath + '/aktivitet',
    BARNEPASS: barnetilsynPath + '/barnepass',
    DINE_BARN: barnetilsynPath + '/dine-barn',
    FORSIDE: barnetilsynPath,
    HOVEDYTELSE: barnetilsynPath + '/hovedytelse',
    KVITTERING: barnetilsynPath + '/kvittering',
    OPPSUMMERING: barnetilsynPath + '/oppsummering',
    VEDLEGG: barnetilsynPath + '/vedlegg',
};

export const routesBarnetilsyn: IRoute<BarnetilsynSteg>[] = [
    { path: barnetilsynPath, label: 'Forside', route: 'FORSIDE' },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Hovedytelse',
        route: 'HOVEDYTELSE',
    },
    {
        path: RouteTilPath.AKTIVITET,
        label: 'Aktivitet',
        route: 'AKTIVITET',
    },
    {
        path: RouteTilPath.DINE_BARN,
        label: 'Dine barn',
        route: 'DINE_BARN',
    },
    {
        path: RouteTilPath.BARNEPASS,
        label: 'Barnepass',
        route: 'BARNEPASS',
    },
    {
        path: RouteTilPath.VEDLEGG,
        label: 'Vedlegg',
        route: 'VEDLEGG',
    },
    {
        path: RouteTilPath.OPPSUMMERING,
        label: 'Oppsummering',
        route: 'OPPSUMMERING',
    },
    {
        path: RouteTilPath.KVITTERING,
        label: 'Personalia',
        route: 'KVITTERING',
    },
];

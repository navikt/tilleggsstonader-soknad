import { IRoute, Steg } from '../../typer/routes';

export type LæremidlerSteg = Steg | 'UTDANNING';

export const læremidlerPath = '/laremidler';

export const RouteTilPath: Record<LæremidlerSteg, string> = {
    FORSIDE: læremidlerPath,
    HOVEDYTELSE: læremidlerPath + '/hovedytelse',
    UTDANNING: læremidlerPath + '/utdanning',
    VEDLEGG: læremidlerPath + '/vedlegg',
    OPPSUMMERING: læremidlerPath + '/oppsummering',
    KVITTERING: læremidlerPath + '/kvittering',
};

export const routesLæremidler: IRoute<LæremidlerSteg>[] = [
    { path: læremidlerPath, label: 'Forside', route: 'FORSIDE' },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Hovedytelse',
        route: 'HOVEDYTELSE',
    },
    {
        path: RouteTilPath.UTDANNING,
        label: 'Utdanning',
        route: 'UTDANNING',
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
        label: 'Kvittering',
        route: 'KVITTERING',
    },
];

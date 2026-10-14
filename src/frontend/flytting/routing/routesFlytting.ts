import { IRoute, Steg } from '../../typer/routes';

export type FlyttingSteg = Steg;

export const flyttingPath = '/flytting';

export const RouteTilPath: Record<FlyttingSteg, string> = {
    FORSIDE: flyttingPath,
    HOVEDYTELSE: flyttingPath + '/hovedytelse',
    VEDLEGG: flyttingPath + '/vedlegg',
    OPPSUMMERING: flyttingPath + '/oppsummering',
    KVITTERING: flyttingPath + '/kvittering',
};

export const routesFlytting: IRoute<FlyttingSteg>[] = [
    { path: RouteTilPath.FORSIDE, label: 'Forside', route: 'FORSIDE' },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Hovedytelse',
        route: 'HOVEDYTELSE',
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

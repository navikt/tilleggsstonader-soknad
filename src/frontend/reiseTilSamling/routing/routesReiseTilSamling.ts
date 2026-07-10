import { IRoute, Steg } from '../../typer/routes';

export type ReiseTilSamlingSteg = Steg | 'AKTIVITET' | 'REISEAVSTAND' | 'SAMLINGER' | 'REISEMÅTE';

export const reiseTilSamlingPath = '/reise-til-samling';

export const RouteTilPath: Record<ReiseTilSamlingSteg, string> = {
    FORSIDE: reiseTilSamlingPath,
    HOVEDYTELSE: reiseTilSamlingPath + '/hovedytelse',
    AKTIVITET: reiseTilSamlingPath + '/aktivitet',
    REISEAVSTAND: reiseTilSamlingPath + '/reiseavstand',
    SAMLINGER: reiseTilSamlingPath + '/samlinger',
    REISEMÅTE: reiseTilSamlingPath + '/reisemate',
    VEDLEGG: reiseTilSamlingPath + '/vedlegg',
    OPPSUMMERING: reiseTilSamlingPath + '/oppsummering',
    KVITTERING: reiseTilSamlingPath + '/kvittering',
};

export const routesReiseTilSamling: IRoute<ReiseTilSamlingSteg>[] = [
    { path: RouteTilPath.FORSIDE, label: 'Forside', route: 'FORSIDE' },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Din situasjon',
        route: 'HOVEDYTELSE',
    },
    {
        path: RouteTilPath.AKTIVITET,
        label: 'Aktivitet',
        route: 'AKTIVITET',
    },
    {
        path: RouteTilPath.REISEAVSTAND,
        label: 'Reiseavstand',
        route: 'REISEAVSTAND',
    },
    {
        path: RouteTilPath.SAMLINGER,
        label: 'Samlinger',
        route: 'SAMLINGER',
    },
    {
        path: RouteTilPath.REISEMÅTE,
        label: 'Reisemåte',
        route: 'REISEMÅTE',
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

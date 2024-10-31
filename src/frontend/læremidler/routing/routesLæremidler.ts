import { IRoute } from '../../typer/routes';

export enum ERouteLæremidler {
    FORSIDE = 'FORSIDE',
    HOVEDYTELSE = 'HOVEDYTELSE',
    UTDANNING = 'UTDANNING',
    VEDLEGG = 'VEDLEGG',
    OPPSUMMERING = 'OPPSUMMERING',
    KVITTERING = 'KVITTERING',
}

export const læremidlerPath = '/laremidler';

export const RouteTilPath: Record<ERouteLæremidler, string> = {
    FORSIDE: læremidlerPath,
    HOVEDYTELSE: læremidlerPath + '/hovedytelse',
    UTDANNING: læremidlerPath + '/utdanning',
    VEDLEGG: læremidlerPath + '/vedlegg',
    OPPSUMMERING: læremidlerPath + '/oppsummering',
    KVITTERING: læremidlerPath + '/kvittering',
};

export const routesLæremidler: IRoute[] = [
    { path: læremidlerPath, label: 'Forside', route: ERouteLæremidler.FORSIDE },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Hovedytelse',
        route: ERouteLæremidler.HOVEDYTELSE,
    },
    {
        path: RouteTilPath.UTDANNING,
        label: 'Utdanning',
        route: ERouteLæremidler.UTDANNING,
    },
    {
        path: RouteTilPath.VEDLEGG,
        label: 'Vedlegg',
        route: ERouteLæremidler.VEDLEGG,
    },
    {
        path: RouteTilPath.OPPSUMMERING,
        label: 'Oppsummering',
        route: ERouteLæremidler.OPPSUMMERING,
    },
    {
        path: RouteTilPath.KVITTERING,
        label: 'Kvittering',
        route: ERouteLæremidler.KVITTERING,
    },
];

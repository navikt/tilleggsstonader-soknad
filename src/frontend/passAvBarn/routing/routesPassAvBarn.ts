import type { IRoute, Steg } from '../../typer/routes';

export type PassAvBarnSteg = Steg | 'AKTIVITET' | 'DINE_BARN' | 'BARNEPASS';

export const passAvBarnPath = '/pass-av-barn';
export const RouteTilPath: Record<PassAvBarnSteg, string> = {
    AKTIVITET: `${passAvBarnPath}/aktivitet`,
    BARNEPASS: `${passAvBarnPath}/barnepass`,
    DINE_BARN: `${passAvBarnPath}/dine-barn`,
    FORSIDE: passAvBarnPath,
    HOVEDYTELSE: `${passAvBarnPath}/hovedytelse`,
    KVITTERING: `${passAvBarnPath}/kvittering`,
    OPPSUMMERING: `${passAvBarnPath}/oppsummering`,
    VEDLEGG: `${passAvBarnPath}/vedlegg`
};

export const routesPassAvBarn: IRoute<PassAvBarnSteg>[] = [
    { path: passAvBarnPath, label: 'Forside', route: 'FORSIDE' },
    {
        path: RouteTilPath.HOVEDYTELSE,
        label: 'Hovedytelse',
        route: 'HOVEDYTELSE'
    },
    {
        path: RouteTilPath.AKTIVITET,
        label: 'Aktivitet',
        route: 'AKTIVITET'
    },
    {
        path: RouteTilPath.DINE_BARN,
        label: 'Dine barn',
        route: 'DINE_BARN'
    },
    {
        path: RouteTilPath.BARNEPASS,
        label: 'Barnepass',
        route: 'BARNEPASS'
    },
    {
        path: RouteTilPath.VEDLEGG,
        label: 'Vedlegg',
        route: 'VEDLEGG'
    },
    {
        path: RouteTilPath.OPPSUMMERING,
        label: 'Oppsummering',
        route: 'OPPSUMMERING'
    },
    {
        path: RouteTilPath.KVITTERING,
        label: 'Personalia',
        route: 'KVITTERING'
    }
];

import { IRoute, Steg } from '../../typer/routes';

// TODO: NESTE_STEG er en midlertidig placeholder frem til resten av flyten er bygget ut
export type ReiseOppstartAvslutningHjemreiseSteg = Steg | 'AKTIVITET' | 'NESTE_STEG';

export const reiseOppstartAvslutningHjemreisePath = '/reise-oppstart-avslutning-hjemreise';

export const RouteTilPath: Record<ReiseOppstartAvslutningHjemreiseSteg, string> = {
    FORSIDE: reiseOppstartAvslutningHjemreisePath,
    HOVEDYTELSE: reiseOppstartAvslutningHjemreisePath + '/hovedytelse',
    AKTIVITET: reiseOppstartAvslutningHjemreisePath + '/aktivitet',
    NESTE_STEG: reiseOppstartAvslutningHjemreisePath + '/neste-steg',
    VEDLEGG: reiseOppstartAvslutningHjemreisePath + '/vedlegg',
    OPPSUMMERING: reiseOppstartAvslutningHjemreisePath + '/oppsummering',
    KVITTERING: reiseOppstartAvslutningHjemreisePath + '/kvittering',
};

export const routesReiseOppstartAvslutningHjemreise: IRoute<ReiseOppstartAvslutningHjemreiseSteg>[] =
    [
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
            path: RouteTilPath.NESTE_STEG,
            label: 'Neste steg',
            route: 'NESTE_STEG',
        },
    ];

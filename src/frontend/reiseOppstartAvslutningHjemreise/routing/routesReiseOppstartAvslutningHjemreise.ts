import { IRoute, Steg } from '../../typer/routes';

export type ReiseOppstartAvslutningHjemreiseSteg =
    Steg | 'AKTIVITET' | 'ADRESSER' | 'BARN_OG_HELSE';

export const reiseOppstartAvslutningHjemreisePath = '/reise-oppstart-avslutning-hjemreise';

export const RouteTilPath: Record<ReiseOppstartAvslutningHjemreiseSteg, string> = {
    FORSIDE: reiseOppstartAvslutningHjemreisePath,
    HOVEDYTELSE: reiseOppstartAvslutningHjemreisePath + '/hovedytelse',
    AKTIVITET: reiseOppstartAvslutningHjemreisePath + '/aktivitet',
    ADRESSER: reiseOppstartAvslutningHjemreisePath + '/adresser',
    BARN_OG_HELSE: reiseOppstartAvslutningHjemreisePath + '/barn-og-helse',
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
            path: RouteTilPath.ADRESSER,
            label: 'Adresser',
            route: 'ADRESSER',
        },
        {
            path: RouteTilPath.BARN_OG_HELSE,
            label: 'Barn og helse',
            route: 'BARN_OG_HELSE',
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

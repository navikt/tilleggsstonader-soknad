import { LæremidlerSteg, routesLæremidler } from '../læremidler/routing/routesLæremidler';
import { PassAvBarnSteg, routesPassAvBarn } from '../passAvBarn/routing/routesPassAvBarn';
import {
    ReiseTilSamlingSteg,
    routesReiseTilSamling,
} from '../reiseTilSamling/routing/routesReiseTilSamling';
import { IRoute } from '../typer/routes';
import { Skjematype } from '../typer/skjematyper';

export type Skjemasteg = PassAvBarnSteg | LæremidlerSteg | ReiseTilSamlingSteg;

const routesPerSkjematype: Record<Skjematype, IRoute<Skjemasteg>[]> = {
    [Skjematype.SØKNAD_PASS_AV_BARN]: routesPassAvBarn,
    [Skjematype.SØKNAD_LÆREMIDLER]: routesLæremidler,
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: routesReiseTilSamling,
};

export const hentRoutes = (skjematype: Skjematype): IRoute<Skjemasteg>[] =>
    routesPerSkjematype[skjematype];

export const hentNesteRoute = (routes: IRoute<Skjemasteg>[], nåværendePath: string) => {
    const routeIndex = routes.findIndex((route) => route.path === nåværendePath);
    return routes[routeIndex + 1];
};

export const hentForrigeRoute = (routes: IRoute<Skjemasteg>[], nåværendePath: string) => {
    const routeIndex = routes.findIndex((route) => route.path === nåværendePath);
    return routes[routeIndex - 1];
};

export const hentStartRoute = (skjematype: Skjematype): string =>
    routesPerSkjematype[skjematype][0].path;

export const erOppsummeringsside = (route: Skjemasteg): boolean => route === 'OPPSUMMERING';

export const finnOppsummeringRoute = (skjematype: Skjematype): string =>
    routesPerSkjematype[skjematype].find((route) => route.route === 'OPPSUMMERING')!.path;

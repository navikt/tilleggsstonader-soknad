import {
    ERouteBarnetilsyn,
    RoutesBarnetilsyn,
    barnetilsynPath,
    RouteTilPath as RouteToPathPassAvBarn,
} from '../barnetilsyn/routing/routesBarnetilsyn';
import {
    ERouteLæremidler,
    læremidlerPath,
    routesLæremidler,
    RouteTilPath as RouteToPathLæremidler,
} from '../læremidler/routing/routesLæremidler';
import {
    ERouteReiseTilSamling,
    reiseTilSamlingPath,
    RouteTilPath as RouteToPathReiseTilSamling,
    routesReiseTilSamling,
} from '../reiseTilSamling/routing/routesReiseTilSamling';
import { IRoute, RouteType } from '../typer/routes';
import { Skjematype } from '../typer/skjematyper';

export const hentRoutes = (skjematype: Skjematype): IRoute[] => {
    switch (skjematype) {
        case Skjematype.BARNETILSYN:
            return RoutesBarnetilsyn;
        case Skjematype.LÆREMIDLER:
            return routesLæremidler;
        case Skjematype.REISE_TIL_SAMLING:
            return routesReiseTilSamling;
    }
};

export const hentNesteRoute = (routes: IRoute[], nåværendePath: string) => {
    const routeIndex = routes.findIndex((route) => route.path === nåværendePath);
    return routes[routeIndex + 1];
};

export const hentForrigeRoute = (routes: IRoute[], nåværendePath: string) => {
    const routeIndex = routes.findIndex((route) => route.path === nåværendePath);
    return routes[routeIndex - 1];
};

export const hentStartRoute = (skjematype: Skjematype) => {
    switch (skjematype) {
        case Skjematype.BARNETILSYN:
            return barnetilsynPath;
        case Skjematype.LÆREMIDLER:
            return læremidlerPath;
        case Skjematype.REISE_TIL_SAMLING:
            return reiseTilSamlingPath;
    }
};

export const erOppsummeringsside = (route: RouteType): boolean => {
    return (
        route === ERouteBarnetilsyn.OPPSUMMERING ||
        route === ERouteLæremidler.OPPSUMMERING ||
        route === ERouteReiseTilSamling.OPPSUMMERING
    );
};

export const finnOppsummeringRoute = (skjematype: Skjematype): string => {
    switch (skjematype) {
        case Skjematype.BARNETILSYN:
            return RouteToPathPassAvBarn.OPPSUMMERING;
        case Skjematype.LÆREMIDLER:
            return RouteToPathLæremidler.OPPSUMMERING;
        case Skjematype.REISE_TIL_SAMLING:
            return RouteToPathReiseTilSamling.OPPSUMMERING;
    }
};

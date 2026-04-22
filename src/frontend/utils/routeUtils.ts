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
    reiseTilSamlingPath,
    RouteTilPath as RouteToPathReiseTilSamling,
    routesReiseTilSamling,
} from '../reiseTilSamling/routing/routesReiseTilSamling';
import { IRoute, RouteType } from '../typer/routes';
import { Stønadstype } from '../typer/stønadstyper';

export const hentRoutes = (stønadstype: Stønadstype): IRoute[] => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN:
            return RoutesBarnetilsyn;
        case Stønadstype.LÆREMIDLER:
            return routesLæremidler;
        case Stønadstype.REISE_TIL_SAMLING:
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

export const hentStartRoute = (stønadstype: Stønadstype) => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN:
            return barnetilsynPath;
        case Stønadstype.LÆREMIDLER:
            return læremidlerPath;
        case Stønadstype.REISE_TIL_SAMLING:
            return reiseTilSamlingPath;
    }
};

export const erOppsummeringsside = (route: RouteType): boolean => {
    return route === ERouteBarnetilsyn.OPPSUMMERING || route === ERouteLæremidler.OPPSUMMERING;
};

export const finnOppsummeringRoute = (stønadstype: Stønadstype): string => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN:
            return RouteToPathPassAvBarn.OPPSUMMERING;
        case Stønadstype.LÆREMIDLER:
            return RouteToPathLæremidler.OPPSUMMERING;
        case Stønadstype.REISE_TIL_SAMLING:
            return RouteToPathReiseTilSamling.NESTE_STEG;
    }
};

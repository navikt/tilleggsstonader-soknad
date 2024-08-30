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
import { IRoute, RouteType } from '../typer/routes';
import { Stønadstype } from '../typer/stønadstyper';

export const hentRoutes = (stønadstype: Stønadstype): IRoute[] => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN:
            return RoutesBarnetilsyn;
        case Stønadstype.LÆREMIDLER:
            return routesLæremidler;
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
    }
};

export const erOppsummeringsside = (route: RouteType): boolean => {
    if (route === ERouteBarnetilsyn.OPPSUMMERING || route === ERouteLæremidler.OPPSUMMERING) {
        return true;
    }

    return false;
};

export const finnOppsummeringRoute = (stønadstype: Stønadstype): string => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN:
            return RouteToPathPassAvBarn.OPPSUMMERING;
        case Stønadstype.LÆREMIDLER:
            return RouteToPathLæremidler.OPPSUMMERING;
    }
};

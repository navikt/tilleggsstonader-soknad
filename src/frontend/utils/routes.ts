import {
    ERouteBarnetilsyn,
    RoutesBarnetilsyn,
    barnetilsynPath,
} from '../barnetilsyn/routing/routesBarnetilsyn';
import {
    ERouteLæremidler,
    læremidlerPath,
    routesLæremidler,
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

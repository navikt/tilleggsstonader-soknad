import { ERouteBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { ERouteLæremidler } from '../læremidler/routing/routesLæremidler';
import { ERouteReiseTilSamling } from '../reiseTilSamling/routing/routesReiseTilSamling';

export type RouteType = ERouteBarnetilsyn | ERouteLæremidler | ERouteReiseTilSamling;

export interface IRoute {
    route: RouteType;
    path: string;
    label: string;
}

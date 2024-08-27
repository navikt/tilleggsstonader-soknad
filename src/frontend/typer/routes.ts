import { ERouteBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { ERouteLæremidler } from '../læremidler/routing/routesLæremidler';

export type RouteType = ERouteBarnetilsyn | ERouteLæremidler;

export interface IRoute {
    route: RouteType;
    path: string;
    label: string;
}

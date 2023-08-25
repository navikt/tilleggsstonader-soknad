import { ERouteBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';

export type RouteType = ERouteBarnetilsyn;

export interface IRoute {
    route: RouteType;
    path: string;
    label: string;
}

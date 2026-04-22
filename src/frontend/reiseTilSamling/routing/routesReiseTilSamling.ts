import { IRoute } from '../../typer/routes';

export enum ERouteReiseTilSamling {
    FORSIDE = 'FORSIDE',
    PLACEHOLDER = 'PLACEHOLDER',
}

export const reiseTilSamlingPath = '/reise-til-samling';

export const RouteTilPath: Record<ERouteReiseTilSamling, string> = {
    FORSIDE: reiseTilSamlingPath,
    PLACEHOLDER: reiseTilSamlingPath + '/placeholder',
};

export const routesReiseTilSamling: IRoute[] = [
    { path: reiseTilSamlingPath, label: 'Forside', route: ERouteReiseTilSamling.FORSIDE },
    {
        path: RouteTilPath.PLACEHOLDER,
        label: 'Placeholder',
        route: ERouteReiseTilSamling.PLACEHOLDER,
    },
];

import { IRoute } from '../../typer/routes';

export enum ERouteBarnetilsyn {
    Forside = 'Forside',
    Personalia = 'Personalia',
}

export const barnetilsynPath = '/barnetilsyn';

export const RoutesBarnetilsyn: IRoute[] = [
    { path: barnetilsynPath, label: 'Forside', route: ERouteBarnetilsyn.Forside },
    {
        path: barnetilsynPath + '/personalia',
        label: 'Personalia',
        route: ERouteBarnetilsyn.Personalia,
    },
];

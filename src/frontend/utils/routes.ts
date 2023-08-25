import { RoutesBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { IRoute } from '../typer/routes';
import { Stønadstype } from '../typer/stønadstyper';

export const hentRoutes = (stønadstype: Stønadstype): IRoute[] => {
    switch (stønadstype) {
        case Stønadstype.barnetilsyn:
            return RoutesBarnetilsyn;
    }
};

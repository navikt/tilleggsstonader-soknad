import { NextFunction, Request, Response } from 'express';

import { getFyllutUrl, SkjematypeFyllUt } from './fyllutUrls';
import logger from './logger';
import { hentSkjemaRoutingAksjon, SkjemaRoutingAksjon } from './skjemaRouting';
import { BASE_PATH_SOKNAD } from './url';

function routeTilFyllUt(
    skjematype: SkjematypeFyllUt,
    versjon: 'NY' | 'GAMMEL',
    res: Response
): boolean {
    const fyllutUrl = getFyllutUrl(skjematype, versjon);

    if (fyllutUrl) {
        res.redirect(302, fyllutUrl);
        return true;
    }

    return false;
}

function routeTilNyLøsning(
    skjematype: SkjematypeFyllUt,
    res: Response,
    next: NextFunction,
    internRouteForNyLøsning?: string
) {
    if (internRouteForNyLøsning) {
        res.redirect(302, `${BASE_PATH_SOKNAD}/${internRouteForNyLøsning}`);
        return;
    }

    if (!routeTilFyllUt(skjematype, 'NY', res)) {
        next();
    }
}

function routeTilGammelLøsning(skjematype: SkjematypeFyllUt, res: Response) {
    if (!routeTilFyllUt(skjematype, 'GAMMEL', res)) {
        logger.error(`Fant ikke FyllUt-URL for ${skjematype} med versjon GAMMEL`);
        res.status(500).send('Feil ved omdirigering');
    }
}

function routeTilAvsjekk(res: Response) {
    res.redirect(302, `${BASE_PATH_SOKNAD}/daglig-reise/skjema`);
}

export const redirectTilSkjema = (
    skjematype: SkjematypeFyllUt,
    internRouteForNyLøsning?: string
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const aksjon = await hentSkjemaRoutingAksjon(skjematype, req);

            switch (aksjon) {
                case SkjemaRoutingAksjon.NY_LØSNING:
                    routeTilNyLøsning(skjematype, res, next, internRouteForNyLøsning);
                    return;
                case SkjemaRoutingAksjon.GAMMEL_LØSNING:
                    routeTilGammelLøsning(skjematype, res);
                    return;
                case SkjemaRoutingAksjon.AVSJEKK:
                    routeTilAvsjekk(res);
                    return;
                default:
                    logger.error(`Ukjent aksjon fra skjema-routing: ${aksjon}`);
                    res.status(500).send('Feil ved omdirigering');
            }
        } catch (error) {
            logger.error('Feil ved omdirigering:', error);
            res.status(500).send('Feil ved omdirigering');
        }
    };
};

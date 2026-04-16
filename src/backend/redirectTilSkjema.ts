import { NextFunction, Request, Response } from 'express';

import { getFyllutUrl, SkjematypeFyllUt } from './fyllutUrls';
import logger from './logger';
import { skalBrukerTilNyLøsning } from './skjemaRouting';
import { BASE_PATH_SOKNAD } from './url';

/**
 * Redirecter brukeren til enten nytt eller gammelt FyllUt-skjema.
 *
 * Hvis [internRouteForNyLøsning] er angitt vil brukeren routes til en intern route i stedet for nytt FyllUt-skjema, noe
 * som er nyttig for eksempelvis daglige reiser.
 *
 * Hvis ny løsning ikke har en FyllUt-URL, kalles next() slik at requesten faller gjennom til SPA-handleren.
 */
export const redirectTilSkjema = (
    skjematype: SkjematypeFyllUt,
    internRouteForNyLøsning?: string
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const skalBehandlesINyLøsning = await skalBrukerTilNyLøsning(skjematype, req);

            if (skalBehandlesINyLøsning && internRouteForNyLøsning) {
                res.redirect(302, `${BASE_PATH_SOKNAD}/${internRouteForNyLøsning}`);
                return;
            }

            const fyllutUrl = getFyllutUrl(skjematype, skalBehandlesINyLøsning ? 'NY' : 'GAMMEL');

            if (fyllutUrl) {
                res.redirect(302, fyllutUrl);
            } else {
                next();
            }
        } catch (error) {
            logger.error('Feil ved omdirigering:', error);
            res.status(500).send('Feil ved omdirigering');
        }
    };
};

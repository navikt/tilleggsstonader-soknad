import { Request, Response } from 'express';

import { getFyllutUrl, SkjematypeFyllUt } from './fyllutUrls';
import logger from './logger';
import { skalBrukerTilNyLøsning } from './skjemaRouting';
import { BASE_PATH_SOKNAD } from './url';

export const redirectTilSkjema = (
    skjematype: SkjematypeFyllUt,
    internRouteForNyLøsning?: string
) => {
    return async (_: Request, res: Response) => {
        try {
            const targetUrl = async () => {
                const skalBehandlesINyLøsning = await skalBrukerTilNyLøsning(skjematype);

                if (skalBehandlesINyLøsning && internRouteForNyLøsning) {
                    // For daglig reise ønsker vi å redirekte internt
                    return `${BASE_PATH_SOKNAD}/${internRouteForNyLøsning}`;
                }

                return getFyllutUrl(skjematype, skalBehandlesINyLøsning ? 'NY' : 'GAMMEL');
            };
            res.redirect(302, await targetUrl());
        } catch (error) {
            logger.error('Feil ved omdirigering:', error);
            res.status(500).send('Feil ved omdirigering');
        }
    };
};

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

function routeTilNyLøsning(skjematype: SkjematypeFyllUt, res: Response, next: NextFunction) {
    if (skjematype === SkjematypeFyllUt.SØKNAD_DAGLIG_REISE) {
        res.redirect(302, `${BASE_PATH_SOKNAD}/daglig-reise/skjema-taxi`);
        return;
    }

    const bleRutetTilFyllUt = routeTilFyllUt(skjematype, 'NY', res);

    if (!bleRutetTilFyllUt) {
        next();
    }
}

function routeTilGammelLøsning(skjematype: SkjematypeFyllUt, res: Response) {
    const bleRutetTilFyllUt = routeTilFyllUt(skjematype, 'GAMMEL', res);

    if (!bleRutetTilFyllUt) {
        logger.error(`Fant ikke FyllUt-URL for ${skjematype} med versjon GAMMEL`);
        res.status(500).send('Feil ved omdirigering');
    }
}

function routeTilAvsjekk(skjematype: SkjematypeFyllUt, res: Response) {
    switch (skjematype) {
        case SkjematypeFyllUt.SØKNAD_DAGLIG_REISE:
            res.redirect(302, `${BASE_PATH_SOKNAD}/daglig-reise/skjema-offentlig-transport`);
            return;
        default:
            throw new Error(`Ingen avsjekk definert for skjematype: ${skjematype}`);
    }
}

export const redirectTilSkjema = (skjematype: SkjematypeFyllUt) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const aksjon = await hentSkjemaRoutingAksjon(skjematype, req);

            switch (aksjon) {
                case SkjemaRoutingAksjon.NY_LØSNING:
                    routeTilNyLøsning(skjematype, res, next);
                    return;
                case SkjemaRoutingAksjon.GAMMEL_LØSNING:
                    routeTilGammelLøsning(skjematype, res);
                    return;
                case SkjemaRoutingAksjon.AVSJEKK:
                    routeTilAvsjekk(skjematype, res);
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

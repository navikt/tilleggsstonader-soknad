import { Request } from 'express';

import { SkjematypeFyllUt } from './fyllutUrls';
import logger from './logger';
import { miljø } from './miljø';

interface SkjemaRoutingResponse {
    skalBehandlesINyLøsning: boolean;
}

export async function skalBrukerTilNyLøsning(
    skjematype: SkjematypeFyllUt,
    req: Request
): Promise<boolean> {
    try {
        const response = await fetch(`${miljø.apiUrl}/skjema-routing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: req.headers.authorization || '',
            },
            body: JSON.stringify({ skjematype }),
        });

        const data: SkjemaRoutingResponse = await response.json();
        return data.skalBehandlesINyLøsning;
    } catch (error) {
        logger.error(`Feil ved sjekk av routing for ${skjematype}:`, error);
        throw error;
    }
}

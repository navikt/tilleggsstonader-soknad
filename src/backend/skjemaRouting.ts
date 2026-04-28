import { Request } from 'express';

import { SkjematypeFyllUt } from './fyllutUrls';
import logger from './logger';
import { miljø } from './miljø';

export enum SkjemaRoutingAksjon {
    NY_LØSNING = 'NY_LØSNING',
    GAMMEL_LØSNING = 'GAMMEL_LØSNING',
    AVSJEKK = 'AVSJEKK',
    AVSJEKK_OFFENTLIG_TRANSPORT = 'AVSJEKK_OFFENTLIG_TRANSPORT',
    AVSJEKK_TAXI = 'AVSJEKK_TAXI',
}

interface SkjemaRoutingResponse {
    aksjon: SkjemaRoutingAksjon;
}

export async function hentSkjemaRoutingAksjon(
    skjematype: SkjematypeFyllUt,
    req: Request
): Promise<SkjemaRoutingAksjon> {
    try {
        const response = await fetch(`${miljø.apiUrl}/skjema-routing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: req.headers.authorization || '',
            },
            body: JSON.stringify({ skjematype }),
        });

        if (!response.ok) {
            throw new Error(`Skjema-routing svarte med ${response.status}`);
        }

        const data: SkjemaRoutingResponse = await response.json();
        return data.aksjon;
    } catch (error) {
        logger.error(`Feil ved sjekk av routing for ${skjematype}:`, error);
        throw error;
    }
}

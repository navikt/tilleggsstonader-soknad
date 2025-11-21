import axios from 'axios';

import { SkjematypeFyllUt } from './fyllutUrls';
import logger from './logger';
import { miljø } from './miljø';

interface SkjemaRoutingResponse {
    skalBehandlesINyLøsning: boolean;
}

/**
 * Sjekker hos routing-API-et om skjematypen skal behandles i ny eller gammel løsning
 */
export async function skalBrukerTilNyLøsning(skjematype: SkjematypeFyllUt): Promise<boolean> {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        const response = await axios.post<SkjemaRoutingResponse>(
            `${miljø.apiUrl}/skjema-routing`,
            { skjematype },
            { headers, timeout: 5000 }
        );

        return response.data.skalBehandlesINyLøsning;
    } catch (error) {
        logger.error(`Feil ved sjekk av routing for ${skjematype}:`, error);
        throw error;
    }
}

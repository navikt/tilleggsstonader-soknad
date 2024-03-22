/**
 * @param key er nøkkelen for å identifisere selve feilen
 * eks kan key brukes til {`aktivitet`: {id: '1', melding: '...'}}
 */
export interface Valideringsfeil {
    [key: string]: { id: string; melding: string } | undefined;
}

export const inneholderFeil = (valideringError: Valideringsfeil) =>
    Object.values(valideringError).filter((error) => error).length > 0;

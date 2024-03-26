export type Landkoder = Record<string, string>;
/**
 * TODO denne burde hentes fra backend eller bruke i18n-iso-countries
 * https://github.com/navikt/aap-soknad/blob/cd084311c3880bd44e60f90d391c0af113e525ee/components/input/countryselector/CountrySelector.tsx#L5-L24
 */
export const landkoder: Landkoder = { SWE: 'Sverige', FIN: 'Finland' };

import logger from './logger';

const lokaltMiljø = {
    apiUrl: 'http://localhost:8001/api',
    reportingUrl: 'http://localhost:8001/reporting',
    vedleggUrl: 'http://localhost:8001/api/vedlegg',
    oauthCallbackUri: 'https://localhost:8080/tilleggsstonader/soknad/soknad/oauth2/callback',
};
const devMiljø = {
    apiUrl: 'http://tilleggsstonader-soknad-api/api',
    reportingUrl: 'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/reporting',
    vedleggUrl: 'http://familie-dokument.teamfamilie/api/mapper/tilleggsstonad',
    oauthCallbackUri:
        'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/oauth2/callback',
};
const prodMiljø = {
    apiUrl: 'http://tilleggsstonader-soknad-api/api',
    reportingUrl: 'https://www.nav.no/tilleggsstonader/soknad/reporting',
    vedleggUrl: 'http://familie-dokument.teamfamilie/api/mapper/tilleggsstonad',
    oauthCallbackUri: 'https://www.nav.no/tilleggsstonader/soknad/soknad/oauth2/callback',
};

const initierMiljøvariabler = () => {
    switch (process.env.ENV) {
        case 'localhost':
            return lokaltMiljø;
        case 'dev':
            return devMiljø;
        case 'prod':
            return prodMiljø;
        default:
            logger.warn('Mangler miljøvariabler - setter lokale variabler');
            return lokaltMiljø;
    }
};

export const miljø = initierMiljøvariabler();

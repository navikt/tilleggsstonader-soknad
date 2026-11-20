import { Environment } from '../api/Environment';

export const erProd = (): boolean => window.location.host === 'www.nav.no';

const erAutomatisertNettleser = (): boolean => window.navigator.webdriver === true;

export const erLokal = () => Environment().miljø === 'local' && !erAutomatisertNettleser();

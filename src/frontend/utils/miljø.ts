import { Environment } from '../api/Environment';

export const erProd = (): boolean => window.location.host === 'www.nav.no';

export const erLokal = () => Environment().miljø === 'local';

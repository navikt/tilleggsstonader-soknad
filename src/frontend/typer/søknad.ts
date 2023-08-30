import { AnnenYtelse, Ytelse } from '../barnetilsyn/steg/2-hovedytelse/Hovedytelse';

export interface Hovedytelse {
    ytelse: Exclude<Ytelse, 'annet'> | AnnenYtelse;
}

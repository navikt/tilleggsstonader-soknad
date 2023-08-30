import { AnnenYtelse, Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: Exclude<Ytelse, 'annet'> | AnnenYtelse;
}

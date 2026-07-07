import { Barnepass } from '../../typer/barnepass';

export interface BarnepassIntern extends Partial<Barnepass> {
    ident: string;
}

import { Barnepass } from '../../../typer/barn';

export interface BarnepassIntern extends Partial<Barnepass> {
    ident: string;
}

import { Periode } from '../../../typer/søknad';

export interface Tiltak {
    type: 'utdanning' | 'arbeidsrettet_tiltak';
    navn: string;
    periode: Periode;
}

import { InlineLenke, TekstElement } from '../../typer/tekst';

export interface ForsideTekster {
    banner_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    dette_ma_du_vite_innhold: TekstElement<string[]>;
    var_klar_over_innhold: TekstElement<string[]>;
    kan_ikke_soke_innhold: TekstElement<(string | InlineLenke)[]>;
}

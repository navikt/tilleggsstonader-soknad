import { TekstElement } from '../../../typer/tekst';

type ForsideKeys =
    | 'veileder_tittel'
    | 'veileder_innhold1'
    | 'veileder_innhold2'
    | 'mottatt_faktura_alert_tittel'
    | 'mottatt_faktura_alert_innhold'
    | 'dine_plikter_tittel'
    | 'dine_plikter_innhold'
    | 'utgifter_som_dekkes_tittel'
    | 'utgifter_som_dekkes_innhold1'
    | 'utgifter_som_dekkes_innhold2'
    | 'info_som_hentes_tittel'
    | 'info_som_hentes_innhold1'
    | 'info_som_hentes_innhold2'
    | 'info_som_hentes_innhold3'
    | 'dokumentasjon_utgifter_tittel'
    | 'dokumentasjon_utgifter_innhold'
    | 'vi_stoler_tittel'
    | 'vi_stoler_innhold';

export type ForsideInnhold = Record<ForsideKeys, TekstElement>;

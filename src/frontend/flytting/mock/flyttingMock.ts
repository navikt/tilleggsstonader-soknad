import { Hovedytelse } from '../../typer/søknad';

export const mockHovedytelse: Hovedytelse = {
    ytelse: {
        label: 'Mottar du eller har du nylig søkt om noe av dette?',
        verdier: [{ verdi: 'AAP', label: 'Arbeidsavklaringspenger (AAP)' }],
        alternativer: ['Arbeidsavklaringspenger (AAP)'],
    },
    arbeidOgOpphold: {
        oppholdUtenforNorgeSiste12mnd: [],
        oppholdUtenforNorgeNeste12mnd: [],
    },
};

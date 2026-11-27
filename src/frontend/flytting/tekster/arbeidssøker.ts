import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { RadiogruppePåkrevd } from '../../typer/tekst';

interface ArbeidssøkerInnhold {
    radio_registrertSomArbeidssøker: RadiogruppePåkrevd<JaNei>;
}

export const arbeidssøkerTekster: ArbeidssøkerInnhold = {
    radio_registrertSomArbeidssøker: {
        header: { nb: 'Er du registrert som arbeidssøker?' },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om du er registrert som arbeidssøker.' },
    },
};

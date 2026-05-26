import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import { SamlingerListe } from './SamlingerListe';
import { validerSamlinger } from './validering';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { inneholderFeil } from '../../../typer/validering';
import { samlingerTekster } from '../../tekster/samlinger';

export const SamlingerReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { samlinger, settSamlinger } = useReiseTilSamlingSøknad();
    const { settValideringsfeil } = useValideringsfeil();

    const kanFortsette = (): boolean => {
        const feil = validerSamlinger(samlinger, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={samlingerTekster.tittel} level="2" size="medium" />
            <BodyShort>{samlingerTekster.guide_tekst[locale]}</BodyShort>
            <SamlingerListe samlinger={samlinger} settSamlinger={settSamlinger} />
        </Side>
    );
};

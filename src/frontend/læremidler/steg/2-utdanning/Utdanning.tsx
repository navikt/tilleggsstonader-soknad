import React, { useState } from 'react';

import { Heading } from '@navikt/ds-react';

import { AnnenUtdanning } from './AnnenUtdanning';
import { feilAnnenUtdanning } from './validering';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';
import { AnnenUtdanningType } from '../../typer/søknad';

const Utdanning = () => {
    const { locale } = useSpråk();
    const { utdanning, settUtdanning } = useLæremidlerSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const [annenUtdanning, settAnnenUtdanning] = useState<EnumFelt<AnnenUtdanningType> | undefined>(
        utdanning ? utdanning.annenUtdanning : undefined
    );

    const oppdaterUtdanningISøknad = () => {
        settUtdanning({ annenUtdanning: annenUtdanning });
    };

    const oppdaterAnnenAktivitet = (verdi: EnumFelt<AnnenUtdanningType>) => {
        settAnnenUtdanning(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            annenAktivitet: undefined,
        }));
    };

    const kanFortsette = (): boolean => {
        let feil: Valideringsfeil = {};
        if (annenUtdanning === undefined) {
            feil = feilAnnenUtdanning(feil, locale);
        }
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side
            stønadstype={Stønadstype.LÆREMIDLER}
            validerSteg={kanFortsette}
            oppdaterSøknad={oppdaterUtdanningISøknad}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={utdanningTekster.tittel} />
            </Heading>
            <PellePanel poster>
                <LocaleTekstAvsnitt tekst={utdanningTekster.guide_innhold} />
            </PellePanel>
            {/* TODO: Hent utdanninger fra andre systemer */}
            <AnnenUtdanning
                annenUtdanning={annenUtdanning}
                oppdaterAnnenAktivitet={oppdaterAnnenAktivitet}
                feilmelding={valideringsfeil.annenUtdanning}
            />
        </Side>
    );
};
export default Utdanning;

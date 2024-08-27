import React, { useState } from 'react';

import { Heading } from '@navikt/ds-react';

import { AnnenUtdanning } from './AnnenUtdanning';
import { MottarUtstyrsstipend } from './MottarUtstyrsstipend';
import { feilAnnenUtdanning, feilMottarUtstyrsstipend } from './validering';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
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
    const [mottarUtstyrsstipend, settMottarUtstyrsstipend] = useState<EnumFelt<JaNei> | undefined>(
        utdanning ? utdanning.mottarUtstyrsstipend : undefined
    );

    const oppdaterUtdanningISøknad = () => {
        settUtdanning({
            annenUtdanning: annenUtdanning,
            mottarUtstyrsstipend: mottarUtstyrsstipend,
        });
    };

    const oppdaterAnnenAktivitet = (verdi: EnumFelt<AnnenUtdanningType>) => {
        settAnnenUtdanning(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            annenAktivitet: undefined,
        }));
    };

    const oppdaterMottarUtstyrsstipend = (verdi: EnumFelt<JaNei>) => {
        settMottarUtstyrsstipend(verdi);
        settValideringsfeil((prevState) => ({
            ...prevState,
            mottarUtstyrsstipend: undefined,
        }));
    };

    const kanFortsette = (): boolean => {
        let feil: Valideringsfeil = {};
        if (annenUtdanning === undefined) {
            feil = feilAnnenUtdanning(feil, locale);
        }
        if (mottarUtstyrsstipend === undefined) {
            feil = feilMottarUtstyrsstipend(feil, locale);
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
            {/* TODO: Vis kun om person under 21 år */}
            <MottarUtstyrsstipend
                mottarUtstyrsstipend={mottarUtstyrsstipend}
                oppdaterMottarUtstyrsstipend={oppdaterMottarUtstyrsstipend}
                feilmelding={valideringsfeil.mottarUtstyrsstipend}
            />
        </Side>
    );
};
export default Utdanning;

import React from 'react';

import LeggTilOppholdKnapp from './LeggTilOppholdKnapp';
import Opphold from './Opphold';
import { oppdaterOpphold } from './oppholdUtil';
import { useSpråk } from '../../../../context/SpråkContext';
import { ArbeidOgOpphold, OppholdUtenforNorge } from '../../../../typer/søknad';
import { OppholdUtenforNorgeInnhold } from '../../../tekster/hovedytelse';

const OppholdListe: React.FC<{
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >;
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
    tekster: OppholdUtenforNorgeInnhold;
}> = ({ keyOpphold, arbeidOgOpphold, settArbeidOgOpphold, tekster }) => {
    const { locale } = useSpråk();
    /**
     * Returnerer en metode som er generisk som oppdaterer felter i oppholdutenfor norge,
     * [oppholdUtenforNorgeSiste12mnd] eller [oppholdUtenforNorgeNeste12mnd]
     */
    const oppdaterOppholdUtenforNorge = <T extends OppholdUtenforNorge, K extends keyof T>(
        id: number,
        key: K,
        verdi: T[K]
    ) => {
        settArbeidOgOpphold((prevState) => {
            return {
                ...prevState,
                [keyOpphold]: oppdaterOpphold(prevState[keyOpphold], id, key, verdi),
            };
        });
    };

    return (
        <>
            {arbeidOgOpphold[keyOpphold].map((opphold) => (
                <Opphold
                    opphold={opphold}
                    oppdater={oppdaterOppholdUtenforNorge}
                    tekster={tekster}
                    locale={locale}
                />
            ))}
            <LeggTilOppholdKnapp key={keyOpphold} settArbeidOgOpphold={settArbeidOgOpphold} />
        </>
    );
};

export default OppholdListe;

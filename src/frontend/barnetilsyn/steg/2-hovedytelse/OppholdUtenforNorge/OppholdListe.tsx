import React from 'react';

import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';

import Opphold from './Opphold';
import { oppdaterOpphold, opprettOppholdForNesteId } from './oppholdUtil';
import { OppdatertOppholdFelt } from './typer';
import { useSpråk } from '../../../../context/SpråkContext';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { hovedytelseInnhold, OppholdUtenforNorgeInnhold } from '../../../tekster/hovedytelse';

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
    const oppdaterOppholdUtenforNorge: OppdatertOppholdFelt = (id: number, key, verdi) => {
        settArbeidOgOpphold((prevState) => {
            return {
                ...prevState,
                [keyOpphold]: oppdaterOpphold(prevState[keyOpphold], id, key, verdi),
            };
        });
    };

    const leggTilOpphold = () => {
        settArbeidOgOpphold((prevState) => {
            const prevOpphold = prevState[keyOpphold];
            return {
                ...prevState,
                [keyOpphold]: [...prevOpphold, opprettOppholdForNesteId(prevOpphold)],
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
            <HStack>
                <Button variant={'tertiary'} onClick={leggTilOpphold} icon={<PlusIcon />}>
                    {hovedytelseInnhold.arbeidOgOpphold.oppholdUtenforNorge.knapp_legg_til[locale]}
                </Button>
            </HStack>
        </>
    );
};

export default OppholdListe;

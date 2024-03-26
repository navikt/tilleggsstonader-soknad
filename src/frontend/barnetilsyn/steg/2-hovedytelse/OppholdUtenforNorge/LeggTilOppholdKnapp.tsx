import React from 'react';

import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';

import { opprettOppholdForNesteId } from './oppholdUtil';
import { useSpråk } from '../../../../context/SpråkContext';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { hovedytelseInnhold } from '../../../tekster/hovedytelse';

const LeggTilOppholdKnapp: React.FC<{
    key: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}> = ({ key, settArbeidOgOpphold }) => {
    const { locale } = useSpråk();

    const leggTilOpphold = () => {
        settArbeidOgOpphold((prevState) => {
            const opphold = prevState[key];
            return {
                ...prevState,
                [key]: [...prevState[key], opprettOppholdForNesteId(opphold)],
            };
        });
    };

    return (
        <HStack>
            <Button variant={'tertiary'} onClick={leggTilOpphold} icon={<PlusIcon />}>
                {hovedytelseInnhold.arbeidOgOpphold.oppholdUtenforNorge.knapp_legg_til[locale]}
            </Button>
        </HStack>
    );
};

export default LeggTilOppholdKnapp;

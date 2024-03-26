import React from 'react';

import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';
import { ABlue500 } from '@navikt/ds-tokens/dist/tokens';

import OppholdListe from './OppholdListe';
import {
    opprettOppholdForNesteId,
    skalTaStillingTilOppholdNeste12mnd,
    skalTaStillingTilOppholdSiste12mnd,
} from './util';
import { nullstillteOppholsfeilNeste12mnd, nullstillteOppholsfeilSiste12mnd } from './validering';
import LocaleRadioGroup from '../../../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSøknad } from '../../../../../context/SøknadContext';
import { EnumFelt } from '../../../../../typer/skjema';
import { ArbeidOgOpphold, JaNei, OppholdUtenforNorge } from '../../../../../typer/søknad';
import { oppholdUtenforNorgeInnhold } from '../../../../tekster/opphold';

const BlåVenstreRammeContainer = styled(VStack)`
    border-left: 5px solid ${ABlue500};
    padding: 0.5rem;
`;

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const OppholdUtenforNorgeSiste12Mnd: React.FC<Props> = ({
    arbeidOgOpphold,
    settArbeidOgOpphold,
}) => {
    const { valideringsfeil, settValideringsfeil } = useSøknad();
    const oppdaterOppholdSiste12mnd = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState: ArbeidOgOpphold) => {
            const opphold: OppholdUtenforNorge[] =
                verdi.verdi === 'JA'
                    ? [opprettOppholdForNesteId(prevState.oppholdUtenforNorgeSiste12mnd)]
                    : [];
            return {
                ...prevState,
                harOppholdUtenforNorgeSiste12mnd: verdi,
                oppholdUtenforNorgeSiste12mnd: opphold,
                harOppholdUtenforNorgeNeste12mnd: undefined,
                oppholdUtenforNorgeNeste12mnd: [],
            };
        });
        settValideringsfeil((prevState) => ({
            ...prevState,
            harOppholdUtenforNorgeSiste12mnd: undefined,
            harOppholdUtenforNorgeNeste12mnd: undefined,
            ...nullstillteOppholsfeilSiste12mnd,
            ...nullstillteOppholsfeilNeste12mnd,
        }));
    };

    const oppdaterOppholdNeste12mnd = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState: ArbeidOgOpphold) => {
            const opphold: OppholdUtenforNorge[] =
                verdi.verdi === 'JA'
                    ? [opprettOppholdForNesteId(prevState.oppholdUtenforNorgeNeste12mnd)]
                    : [];
            return {
                ...prevState,
                harOppholdUtenforNorgeNeste12mnd: verdi,
                oppholdUtenforNorgeNeste12mnd: opphold,
            };
        });
        settValideringsfeil((prevState) => ({
            ...prevState,
            harOppholdUtenforNorgeNeste12mnd: undefined,
            ...nullstillteOppholsfeilNeste12mnd,
        }));
    };

    return (
        <>
            <LocaleRadioGroup
                id={valideringsfeil.harOppholdUtenforNorgeSiste12mnd?.id}
                tekst={oppholdUtenforNorgeInnhold.radioSiste12mnd}
                value={arbeidOgOpphold.harOppholdUtenforNorgeSiste12mnd?.verdi}
                onChange={oppdaterOppholdSiste12mnd}
                error={valideringsfeil.harOppholdUtenforNorgeSiste12mnd?.melding}
            />
            {skalTaStillingTilOppholdSiste12mnd(arbeidOgOpphold) && (
                <BlåVenstreRammeContainer gap={'6'}>
                    <OppholdListe
                        keyOpphold={'oppholdUtenforNorgeSiste12mnd'}
                        arbeidOgOpphold={arbeidOgOpphold}
                        settArbeidOgOpphold={settArbeidOgOpphold}
                        tekster={oppholdUtenforNorgeInnhold.siste12mnd}
                    />
                    <LocaleRadioGroup
                        id={valideringsfeil.harOppholdUtenforNorgeNeste12mnd?.id}
                        tekst={oppholdUtenforNorgeInnhold.radioNeste12mnd}
                        value={arbeidOgOpphold.harOppholdUtenforNorgeNeste12mnd?.verdi}
                        onChange={oppdaterOppholdNeste12mnd}
                        error={valideringsfeil.harOppholdUtenforNorgeNeste12mnd?.melding}
                    />
                    {skalTaStillingTilOppholdNeste12mnd(arbeidOgOpphold) && (
                        <OppholdListe
                            keyOpphold={'oppholdUtenforNorgeNeste12mnd'}
                            arbeidOgOpphold={arbeidOgOpphold}
                            settArbeidOgOpphold={settArbeidOgOpphold}
                            tekster={oppholdUtenforNorgeInnhold.neste12mnd}
                        />
                    )}
                </BlåVenstreRammeContainer>
            )}
        </>
    );
};

export default OppholdUtenforNorgeSiste12Mnd;

import React from 'react';

import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';
import { ABlue500 } from '@navikt/ds-tokens/dist/tokens';

import OppholdListe from './OppholdListe';
import {
    opprettOppholdForNesteId,
    skalTaStillingTilOppholdNeste12mnd,
    skalTaStillingTilOppholdSiste12mnd,
    skalTaStillingTilOppholdUtenforNorge,
} from './util';
import { nullstillteOppholsfeilNeste12mnd, nullstillteOppholsfeilSiste12mnd } from './validering';
import LocaleRadioGroup from '../../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSøknad } from '../../../../context/SøknadContext';
import { EnumFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, JaNei, OppholdUtenforNorge } from '../../../../typer/søknad';
import { oppholdUtenforNorgeInnhold } from '../../../tekster/opphold';

const BlåVenstreRammeContainer = styled(VStack)`
    border-left: 5px solid ${ABlue500};
    padding: 0.5rem;
`;

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const OppholdUtenforNorgeContainer: React.FC<Props> = ({
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
                harDuOppholdUtenforNorgeSiste12mnd: verdi,
                oppholdUtenforNorgeSiste12mnd: opphold,
            };
        });
        settValideringsfeil((prevState) => ({
            ...prevState,
            harDuOppholdUtenforNorgeSiste12mnd: undefined,
            harDuOppholdUtenforNorgeNeste12mnd: undefined,
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
                harDuOppholdUtenforNorgeNeste12mnd: verdi,
                oppholdUtenforNorgeNeste12mnd: opphold,
            };
        });
        settValideringsfeil((prevState) => ({
            ...prevState,
            harDuOppholdUtenforNorgeNeste12mnd: undefined,
            ...nullstillteOppholsfeilNeste12mnd,
        }));
    };

    return (
        <>
            {skalTaStillingTilOppholdUtenforNorge(arbeidOgOpphold) && (
                <LocaleRadioGroup
                    id={valideringsfeil.harDuOppholdUtenforNorgeSiste12mnd?.id}
                    tekst={oppholdUtenforNorgeInnhold.radioSiste12mnd}
                    value={arbeidOgOpphold.harDuOppholdUtenforNorgeSiste12mnd?.verdi}
                    onChange={oppdaterOppholdSiste12mnd}
                    error={valideringsfeil.harDuOppholdUtenforNorgeSiste12mnd?.melding}
                />
            )}
            {skalTaStillingTilOppholdSiste12mnd(arbeidOgOpphold) && (
                <BlåVenstreRammeContainer gap={'6'}>
                    <OppholdListe
                        keyOpphold={'oppholdUtenforNorgeSiste12mnd'}
                        arbeidOgOpphold={arbeidOgOpphold}
                        settArbeidOgOpphold={settArbeidOgOpphold}
                        tekster={oppholdUtenforNorgeInnhold.siste12mnd}
                    />
                    <LocaleRadioGroup
                        id={valideringsfeil.harDuOppholdUtenforNorgeNeste12mnd?.id}
                        tekst={oppholdUtenforNorgeInnhold.radioNeste12mnd}
                        value={arbeidOgOpphold.harDuOppholdUtenforNorgeNeste12mnd?.verdi}
                        onChange={oppdaterOppholdNeste12mnd}
                        error={valideringsfeil.harDuOppholdUtenforNorgeNeste12mnd?.melding}
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

export default OppholdUtenforNorgeContainer;

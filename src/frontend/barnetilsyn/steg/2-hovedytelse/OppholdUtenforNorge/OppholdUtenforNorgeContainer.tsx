import React from 'react';

import OppholdListe from './OppholdListe';
import {
    opprettOppholdForNesteId,
    skalTaStillingTilOppholdNeste12mnd,
    skalTaStillingTilOppholdSiste12mnd,
    skalTaStillingTilOppholdUtenforNorge,
} from './util';
import LocaleRadioGroup from '../../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSøknad } from '../../../../context/SøknadContext';
import { EnumFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, JaNei, OppholdUtenforNorge } from '../../../../typer/søknad';
import { hovedytelseInnhold } from '../../../tekster/hovedytelse';
import { nullstillteOppholsfeilNeste12mnd, nullstillteOppholsfeilSiste12mnd } from '../validering';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const teksterOppholdINorge = hovedytelseInnhold.arbeidOgOpphold;

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
                    tekst={teksterOppholdINorge.oppholdUtenforNorge.radioSiste12mnd}
                    value={arbeidOgOpphold.harDuOppholdUtenforNorgeSiste12mnd?.verdi}
                    onChange={oppdaterOppholdSiste12mnd}
                    error={valideringsfeil.harDuOppholdUtenforNorgeSiste12mnd?.melding}
                />
            )}
            {skalTaStillingTilOppholdSiste12mnd(arbeidOgOpphold) && (
                <OppholdListe
                    keyOpphold={'oppholdUtenforNorgeSiste12mnd'}
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                    tekster={teksterOppholdINorge.oppholdUtenforNorge.siste12mnd}
                />
            )}
            {skalTaStillingTilOppholdSiste12mnd(arbeidOgOpphold) && (
                <LocaleRadioGroup
                    id={valideringsfeil.harDuOppholdUtenforNorgeNeste12mnd?.id}
                    tekst={teksterOppholdINorge.oppholdUtenforNorge.radioNeste12mnd}
                    value={arbeidOgOpphold.harDuOppholdUtenforNorgeNeste12mnd?.verdi}
                    onChange={oppdaterOppholdNeste12mnd}
                    error={valideringsfeil.harDuOppholdUtenforNorgeNeste12mnd?.melding}
                />
            )}
            {skalTaStillingTilOppholdNeste12mnd(arbeidOgOpphold) && (
                <OppholdListe
                    keyOpphold={'oppholdUtenforNorgeNeste12mnd'}
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                    tekster={teksterOppholdINorge.oppholdUtenforNorge.neste12mnd}
                />
            )}
        </>
    );
};

export default OppholdUtenforNorgeContainer;

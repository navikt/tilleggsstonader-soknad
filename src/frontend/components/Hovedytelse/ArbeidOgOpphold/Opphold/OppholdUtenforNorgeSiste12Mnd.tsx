import React from 'react';

import OppholdListe from './OppholdListe';
import {
    opprettOppholdForNesteId,
    skalTaStillingTilOppholdNeste12mnd,
    skalTaStillingTilOppholdSiste12mnd,
} from './util';
import { nullstillteOppholsfeilNeste12mnd, nullstillteOppholsfeilSiste12mnd } from './validering';
import { oppholdUtenforNorgeInnhold } from '../../../../barnetilsyn/tekster/opphold';
import { EnumFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, JaNei, OppholdUtenforNorge } from '../../../../typer/søknad';
import { Valideringsfeil } from '../../../../typer/validering';
import LocaleRadioGroup from '../../../Teksthåndtering/LocaleRadioGroup';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
    valideringsfeil: Valideringsfeil;
    settValideringsfeil: React.Dispatch<React.SetStateAction<Valideringsfeil>>;
}

const OppholdUtenforNorgeSiste12Mnd: React.FC<Props> = ({
    arbeidOgOpphold,
    settArbeidOgOpphold,
    valideringsfeil,
    settValideringsfeil,
}) => {
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
                value={arbeidOgOpphold.harOppholdUtenforNorgeSiste12mnd?.verdi || ''}
                onChange={oppdaterOppholdSiste12mnd}
                error={valideringsfeil.harOppholdUtenforNorgeSiste12mnd?.melding}
            />
            {skalTaStillingTilOppholdSiste12mnd(arbeidOgOpphold) && (
                <>
                    <OppholdListe
                        keyOpphold={'oppholdUtenforNorgeSiste12mnd'}
                        arbeidOgOpphold={arbeidOgOpphold}
                        settArbeidOgOpphold={settArbeidOgOpphold}
                        tekster={oppholdUtenforNorgeInnhold.siste12mnd}
                        valideringsfeil={valideringsfeil}
                        settValideringsfeil={settValideringsfeil}
                    />
                    <LocaleRadioGroup
                        id={valideringsfeil.harOppholdUtenforNorgeNeste12mnd?.id}
                        tekst={oppholdUtenforNorgeInnhold.radioNeste12mnd}
                        value={arbeidOgOpphold.harOppholdUtenforNorgeNeste12mnd?.verdi || ''}
                        onChange={oppdaterOppholdNeste12mnd}
                        error={valideringsfeil.harOppholdUtenforNorgeNeste12mnd?.melding}
                    />
                    {skalTaStillingTilOppholdNeste12mnd(arbeidOgOpphold) && (
                        <OppholdListe
                            keyOpphold={'oppholdUtenforNorgeNeste12mnd'}
                            arbeidOgOpphold={arbeidOgOpphold}
                            settArbeidOgOpphold={settArbeidOgOpphold}
                            tekster={oppholdUtenforNorgeInnhold.neste12mnd}
                            valideringsfeil={valideringsfeil}
                            settValideringsfeil={settValideringsfeil}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default OppholdUtenforNorgeSiste12Mnd;

import React from 'react';

import { skalTaStillingTilLandForPengestøtte } from './util';
import { mottarPengestøtteInnhold } from '../../../barnetilsyn/tekster/opphold';
import { EnumFlereValgFelt, SelectFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../typer/søknad';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typer';
import { BlåVenstreRammeContainer } from '../../BlåVenstreRammeContainer';
import Landvelger from '../../Landvelger/Landvelger';
import LocaleCheckboxGroup from '../../Teksthåndtering/LocaleCheckboxGroup';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
    valideringsfeil: Valideringsfeil;
    settValideringsfeil: React.Dispatch<React.SetStateAction<Valideringsfeil>>;
}

const Pengestøtte: React.FC<Props> = ({
    arbeidOgOpphold,
    settArbeidOgOpphold,
    valideringsfeil,
    settValideringsfeil,
}) => {
    const oppdaterMottarDuPengestøtte = (verdi: EnumFlereValgFelt<MottarPengestøtteTyper>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            harPengestøtteAnnetLand: verdi,
            pengestøtteAnnetLand: skalTaStillingTilLandForPengestøtte(verdi)
                ? prevState.pengestøtteAnnetLand
                : undefined,
        }));
        settValideringsfeil((prevState) => ({
            ...prevState,
            harPengestøtteAnnetLand: undefined,
            pengestøtteAnnetLand: undefined,
        }));
    };

    const oppdatertHvilketLandMottarPengestøtte = (verdi: SelectFelt) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            pengestøtteAnnetLand: verdi,
        }));
        if (harVerdi(verdi.verdi)) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                pengestøtteAnnetLand: undefined,
            }));
        }
    };

    return (
        <>
            <LocaleCheckboxGroup
                id={valideringsfeil.harPengestøtteAnnetLand?.id}
                tekst={mottarPengestøtteInnhold.checkbox_mottar_du_pengestøtte}
                value={arbeidOgOpphold.harPengestøtteAnnetLand?.verdier || []}
                error={valideringsfeil.harPengestøtteAnnetLand?.melding}
                onChange={oppdaterMottarDuPengestøtte}
            />
            {skalTaStillingTilLandForPengestøtte(arbeidOgOpphold.harPengestøtteAnnetLand) && (
                <BlåVenstreRammeContainer>
                    <Landvelger
                        id={valideringsfeil.pengestøtteAnnetLand?.id}
                        label={mottarPengestøtteInnhold.select_hvilket_land}
                        onChange={oppdatertHvilketLandMottarPengestøtte}
                        value={arbeidOgOpphold.pengestøtteAnnetLand?.verdi || ''}
                        error={valideringsfeil.pengestøtteAnnetLand?.melding}
                        medNorskeOmråder={false}
                    />
                </BlåVenstreRammeContainer>
            )}
        </>
    );
};

export default Pengestøtte;

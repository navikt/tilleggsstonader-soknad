import React from 'react';

import { skalTaStillingTilLandForJobberIAnnetLand } from './util';
import { jobberIAnnetLandInnhold } from '../../../barnetilsyn/tekster/opphold';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt, SelectFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold, JaNei } from '../../../typer/søknad';
import { harVerdi } from '../../../utils/typer';
import { BlåVenstreRammeContainer } from '../../BlåVenstreRammeContainer';
import Landvelger from '../../Landvelger/Landvelger';
import LocaleRadioGroup from '../../Teksthåndtering/LocaleRadioGroup';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}
const JobberDuIAnnetLand: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const oppdaterJobberIAnnetLandEnnNorge = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            jobberIAnnetLand: verdi,
            jobbAnnetLand: undefined,
        }));
        settValideringsfeil((prevState) => ({
            ...prevState,
            jobberIAnnetLand: undefined,
            jobbAnnetLand: undefined,
        }));
    };
    const oppdaterHvilketLand = (verdi: SelectFelt) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            jobbAnnetLand: verdi,
        }));
        if (harVerdi(verdi.verdi)) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                jobbAnnetLand: undefined,
            }));
        }
    };

    return (
        <>
            <LocaleRadioGroup
                id={valideringsfeil.jobberIAnnetLand?.id}
                tekst={jobberIAnnetLandInnhold.radio_jobber_annet_land}
                value={arbeidOgOpphold.jobberIAnnetLand?.verdi || ''}
                onChange={oppdaterJobberIAnnetLandEnnNorge}
                error={valideringsfeil.jobberIAnnetLand?.melding}
            />

            {skalTaStillingTilLandForJobberIAnnetLand(arbeidOgOpphold) && (
                <BlåVenstreRammeContainer>
                    <Landvelger
                        id={valideringsfeil.jobbAnnetLand?.id}
                        label={jobberIAnnetLandInnhold.select_hvilket_land}
                        onChange={oppdaterHvilketLand}
                        value={arbeidOgOpphold.jobbAnnetLand?.verdi || ''}
                        error={valideringsfeil.jobbAnnetLand?.melding}
                        medNorskeOmråder={false}
                    />
                </BlåVenstreRammeContainer>
            )}
        </>
    );
};

export default JobberDuIAnnetLand;

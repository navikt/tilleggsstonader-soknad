import React from 'react';

import { Select } from '@navikt/ds-react';

import { skalTaStillingTilLandForJobberIAnnetLand } from './util';
import { BlåVenstreRammeContainer } from '../../../../components/BlåVenstreRammeContainer';
import LocaleRadioGroup from '../../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { fellesTekster } from '../../../../tekster/felles';
import { EnumFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, JaNei } from '../../../../typer/søknad';
import { landkoder } from '../../../../utils/landkoder';
import { harVerdi } from '../../../../utils/typer';
import { jobberDuIAnnetLandInnhold } from '../../../tekster/opphold';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}
const JobberDuIAnnetLand: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
    const { valideringsfeil, settValideringsfeil } = useSøknad();
    const { locale } = useSpråk();

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
    const oppdatertHvilketLandJobberI = (e: React.ChangeEvent<HTMLSelectElement>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            jobbAnnetLand: {
                label: jobberDuIAnnetLandInnhold.select_hvilket_land[locale],
                verdi: e.target.value || '',
                svarTekst: landkoder[e.target.value] || '',
            },
        }));
        if (harVerdi(e.target.value)) {
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
                tekst={jobberDuIAnnetLandInnhold.radio_jobber_annet_land}
                value={arbeidOgOpphold.jobberIAnnetLand?.verdi}
                onChange={oppdaterJobberIAnnetLandEnnNorge}
                error={valideringsfeil.jobberIAnnetLand?.melding}
            />

            {skalTaStillingTilLandForJobberIAnnetLand(arbeidOgOpphold) && (
                <BlåVenstreRammeContainer>
                    <Select
                        id={valideringsfeil.jobbAnnetLand?.id}
                        label={jobberDuIAnnetLandInnhold.select_hvilket_land[locale]}
                        onChange={oppdatertHvilketLandJobberI}
                        value={arbeidOgOpphold.jobbAnnetLand?.verdi || ''}
                        error={valideringsfeil.jobbAnnetLand?.melding}
                    >
                        <option value="">{fellesTekster.velg_land[locale]}</option>
                        {Object.entries(landkoder).map(([kode, tekst]) => (
                            <option value={kode}>{tekst}</option>
                        ))}
                    </Select>
                </BlåVenstreRammeContainer>
            )}
        </>
    );
};

export default JobberDuIAnnetLand;

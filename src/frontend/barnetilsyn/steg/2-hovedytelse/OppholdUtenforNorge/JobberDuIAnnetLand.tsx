import React from 'react';

import { Select } from '@navikt/ds-react';

import { landkoder } from './landkoder';
import { skalTaStillingTilLandForJobberIAnnetLand } from './util';
import { nullstillteOppholsfeilNeste12mnd, nullstillteOppholsfeilSiste12mnd } from './validering';
import { BlåVenstreRammeContainer } from '../../../../components/BlåVenstreRammeContainer';
import LocaleRadioGroup from '../../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { fellesTekster } from '../../../../tekster/felles';
import { EnumFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, JaNei } from '../../../../typer/søknad';
import { harVerdi } from '../../../../utils/typer';
import { arbeidOgOppholdInnhold } from '../../../tekster/opphold';

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
            jobberIAnnetLandEnnNorge: verdi,
            hvilketLand: undefined,
            mottarDuPengestøtteFraAnnetLand: undefined,
            harDuOppholdUtenforNorgeSiste12mnd: undefined,
            oppholdUtenforNorgeSiste12mnd: [],
            harDuOppholdUtenforNorgeNeste12mnd: undefined,
            oppholdUtenforNorgeNeste12mnd: [],
        }));
        settValideringsfeil((prevState) => ({
            ...prevState,
            jobberIAnnetLandEnnNorge: undefined,
            hvilketLand: undefined,
            mottarDuPengestøtteFraAnnetLand: undefined,
            harDuOppholdUtenforNorgeSiste12mnd: undefined,
            harDuOppholdUtenforNorgeNeste12mnd: undefined,
            ...nullstillteOppholsfeilSiste12mnd,
            ...nullstillteOppholsfeilNeste12mnd,
        }));
    };
    const oppdatertHvilketLandJobberI = (e: React.ChangeEvent<HTMLSelectElement>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            hvilketLandJobberIAnnetLandEnnNorge: {
                label: arbeidOgOppholdInnhold.select_hvilket_land_jobber_i_annet_land_label[locale],
                verdi: e.target.value || '',
                svarTekst: landkoder[e.target.value] || '',
            },
        }));
        if (harVerdi(e.target.value)) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                hvilketLandJobberIAnnetLandEnnNorge: undefined,
            }));
        }
    };

    return (
        <>
            <LocaleRadioGroup
                id={valideringsfeil.jobberIAnnetLandEnnNorge?.id}
                tekst={arbeidOgOppholdInnhold.radio_jobber_annet_land_enn_norge}
                value={arbeidOgOpphold.jobberIAnnetLandEnnNorge?.verdi}
                onChange={oppdaterJobberIAnnetLandEnnNorge}
                error={valideringsfeil.jobberIAnnetLandEnnNorge?.melding}
            />

            {skalTaStillingTilLandForJobberIAnnetLand(arbeidOgOpphold) && (
                <BlåVenstreRammeContainer>
                    <Select
                        id={valideringsfeil.hvilketLandJobberIAnnetLandEnnNorge?.id}
                        label={
                            arbeidOgOppholdInnhold.select_hvilket_land_jobber_i_annet_land_label[
                                locale
                            ]
                        }
                        onChange={oppdatertHvilketLandJobberI}
                        value={arbeidOgOpphold.hvilketLandJobberIAnnetLandEnnNorge?.verdi || ''}
                        error={valideringsfeil.hvilketLandJobberIAnnetLandEnnNorge?.melding}
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

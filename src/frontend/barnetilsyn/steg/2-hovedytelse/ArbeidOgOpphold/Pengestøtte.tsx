import React from 'react';

import { Select } from '@navikt/ds-react';

import { skalTaStillingTilLandForPengestøtte } from './util';
import { BlåVenstreRammeContainer } from '../../../../components/BlåVenstreRammeContainer';
import LocaleCheckboxGroup from '../../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { fellesTekster } from '../../../../tekster/felles';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../../typer/søknad';
import { landkoder } from '../../../../utils/landkoder';
import { harVerdi } from '../../../../utils/typer';
import { mottarPengestøtteInnhold } from '../../../tekster/opphold';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const Pengestøtte: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
    const { valideringsfeil, settValideringsfeil } = useSøknad();
    const { locale } = useSpråk();

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

    const oppdatertHvilketLandMottarPengestøtte = (e: React.ChangeEvent<HTMLSelectElement>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            pengestøtteAnnetLand: {
                label: mottarPengestøtteInnhold.select_hvilket_land[locale],
                verdi: e.target.value || '',
                svarTekst: landkoder[e.target.value] || '',
            },
        }));
        if (harVerdi(e.target.value)) {
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
                    <Select
                        id={valideringsfeil.pengestøtteAnnetLand?.id}
                        label={mottarPengestøtteInnhold.select_hvilket_land[locale]}
                        onChange={oppdatertHvilketLandMottarPengestøtte}
                        value={arbeidOgOpphold.pengestøtteAnnetLand?.verdi || ''}
                        error={valideringsfeil.pengestøtteAnnetLand?.melding}
                    >
                        <option value="">{fellesTekster.velg_land[locale]}</option>
                        {Object.entries(landkoder).map(([kode, tekst]) => (
                            <option key={kode} value={kode}>
                                {tekst}
                            </option>
                        ))}
                    </Select>
                </BlåVenstreRammeContainer>
            )}
        </>
    );
};

export default Pengestøtte;

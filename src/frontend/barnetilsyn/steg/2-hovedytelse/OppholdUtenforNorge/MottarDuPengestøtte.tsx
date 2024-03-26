import React from 'react';

import { Select } from '@navikt/ds-react';

import { landkoder } from './landkoder';
import { skalTaStillingTilLandForPengestøtte } from './util';
import { BlåVenstreRammeContainer } from '../../../../components/BlåVenstreRammeContainer';
import LocaleCheckboxGroup from '../../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { fellesTekster } from '../../../../tekster/felles';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../../typer/søknad';
import { harVerdi } from '../../../../utils/typer';
import { arbeidOgOppholdInnhold } from '../../../tekster/opphold';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const MottarDuPengestøtte: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
    const { valideringsfeil, settValideringsfeil } = useSøknad();
    const { locale } = useSpråk();

    const oppdaterMottarDuPengestøtte = (verdi: EnumFlereValgFelt<MottarPengestøtteTyper>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            mottarDuPengestøtteFraAnnetLand: verdi,
            hvilketLandMottarDuPengestøtteFra: skalTaStillingTilLandForPengestøtte(verdi)
                ? prevState.hvilketLandMottarDuPengestøtteFra
                : undefined,
        }));
        settValideringsfeil((prevState) => ({
            ...prevState,
            mottarDuPengestøtteFraAnnetLand: undefined,
            hvilketLandMottarDuPengestøtteFra: undefined,
        }));
    };

    const oppdatertHvilketLandMottarPengestøtte = (e: React.ChangeEvent<HTMLSelectElement>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            hvilketLandMottarDuPengestøtteFra: {
                label: arbeidOgOppholdInnhold.select_hvilket_land_pengestøtte[locale],
                verdi: e.target.value || '',
                svarTekst: landkoder[e.target.value] || '',
            },
        }));
        if (harVerdi(e.target.value)) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                hvilketLandMottarDuPengestøtteFra: undefined,
            }));
        }
    };

    return (
        <>
            <LocaleCheckboxGroup
                id={valideringsfeil.mottarDuPengestøtteFraAnnetLand?.id}
                tekst={arbeidOgOppholdInnhold.checkbox_mottar_du_pengestøtte}
                value={arbeidOgOpphold.mottarDuPengestøtteFraAnnetLand?.verdier || []}
                error={valideringsfeil.mottarDuPengestøtteFraAnnetLand?.melding}
                onChange={oppdaterMottarDuPengestøtte}
            />
            {skalTaStillingTilLandForPengestøtte(
                arbeidOgOpphold.mottarDuPengestøtteFraAnnetLand
            ) && (
                <BlåVenstreRammeContainer>
                    <Select
                        id={valideringsfeil.hvilketLandMottarDuPengestøtteFra?.id}
                        label={arbeidOgOppholdInnhold.select_hvilket_land_pengestøtte[locale]}
                        onChange={oppdatertHvilketLandMottarPengestøtte}
                        value={arbeidOgOpphold.hvilketLandMottarDuPengestøtteFra?.verdi || ''}
                        error={valideringsfeil.hvilketLandMottarDuPengestøtteFra?.melding}
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

export default MottarDuPengestøtte;

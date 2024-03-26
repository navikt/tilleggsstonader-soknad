import React from 'react';

import { Select } from '@navikt/ds-react';

import { landkoder } from './landkoder';
import { skalTaStillingTilLandForPengestøtte } from './util';
import LocaleCheckboxGroup from '../../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { fellesTekster } from '../../../../tekster/felles';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../../typer/søknad';
import { harVerdi } from '../../../../utils/typer';
import { teksterArbeidOgOpphold } from '../../../tekster/hovedytelse';
import { nullstillteOppholsfeilNeste12mnd, nullstillteOppholsfeilSiste12mnd } from '../validering';

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
            harDuOppholdUtenforNorgeSiste12mnd: undefined,
            oppholdUtenforNorgeSiste12mnd: [],
            harDuOppholdUtenforNorgeNeste12mnd: undefined,
            oppholdUtenforNorgeNeste12mnd: [],
        }));
        settValideringsfeil((prevState) => ({
            ...prevState,
            mottarDuPengestøtteFraAnnetLand: undefined,
            hvilketLandMottarDuPengestøtteFra: undefined,
            harDuOppholdUtenforNorgeSiste12mnd: undefined,
            harDuOppholdUtenforNorgeNeste12mnd: undefined,
            ...nullstillteOppholsfeilSiste12mnd,
            ...nullstillteOppholsfeilNeste12mnd,
        }));
    };

    const oppdatertHvilketLandMottarPengestøtte = (e: React.ChangeEvent<HTMLSelectElement>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            hvilketLandMottarDuPengestøtteFra: {
                label: teksterArbeidOgOpphold.select_hvilket_land_pengestøtte[locale],
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
                tekst={teksterArbeidOgOpphold.checkbox_mottar_du_pengestøtte}
                value={arbeidOgOpphold.mottarDuPengestøtteFraAnnetLand?.verdier || []}
                error={valideringsfeil.mottarDuPengestøtteFraAnnetLand?.melding}
                onChange={oppdaterMottarDuPengestøtte}
            />
            {skalTaStillingTilLandForPengestøtte(
                arbeidOgOpphold.mottarDuPengestøtteFraAnnetLand
            ) && (
                <Select
                    id={valideringsfeil.hvilketLandMottarDuPengestøtteFra?.id}
                    label={teksterArbeidOgOpphold.select_hvilket_land_pengestøtte[locale]}
                    onChange={oppdatertHvilketLandMottarPengestøtte}
                    value={arbeidOgOpphold.hvilketLandMottarDuPengestøtteFra?.verdi || ''}
                    error={valideringsfeil.hvilketLandMottarDuPengestøtteFra?.melding}
                >
                    <option value="">{fellesTekster.velg_land[locale]}</option>
                    {Object.entries(landkoder).map(([kode, tekst]) => (
                        <option value={kode}>{tekst}</option>
                    ))}
                </Select>
            )}
        </>
    );
};

export default MottarDuPengestøtte;

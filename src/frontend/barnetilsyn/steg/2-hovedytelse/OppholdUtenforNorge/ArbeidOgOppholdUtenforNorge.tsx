import React from 'react';

import { Heading, Select, VStack } from '@navikt/ds-react';

import JobberDuIAnnetLand from './JobberDuIAnnetLand';
import { landkoder } from './landkoder';
import OppholdUtenforNorgeContainer from './OppholdUtenforNorgeContainer';
import {
    skalTaStillingTilLandForPengestøtte,
    skalTaStillingTilOppholdUtenforNorge,
    skalTaStillingTilPengestøtte,
} from './util';
import { PellePanel } from '../../../../components/PellePanel/PellePanel';
import LocaleCheckboxGroup from '../../../../components/Teksthåndtering/LocaleCheckboxGroup';
import LocaleInlineLenke from '../../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../../../../components/Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../../../components/UnderspørsmålContainer';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { fellesTekster } from '../../../../tekster/felles';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../../typer/søknad';
import { harVerdi } from '../../../../utils/typer';
import { hovedytelseInnhold } from '../../../tekster/hovedytelse';
import { nullstillteOppholsfeilNeste12mnd, nullstillteOppholsfeilSiste12mnd } from '../validering';

const teksterOppholdINorge = hovedytelseInnhold.arbeidOgOpphold;

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const ArbeidOgOppholdUtenforNorge: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useSøknad();

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
                label: teksterOppholdINorge.select_hvilket_land_pengestøtte[locale],
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
        <UnderspørsmålContainer>
            <VStack gap="6">
                <Heading size="medium">
                    <LocaleTekst tekst={teksterOppholdINorge.tittel} />
                </Heading>
                <PellePanel>
                    <LocaleInlineLenke tekst={teksterOppholdINorge.guide_innhold} />
                </PellePanel>

                <JobberDuIAnnetLand
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                />

                {skalTaStillingTilPengestøtte(arbeidOgOpphold) && (
                    <>
                        <LocaleCheckboxGroup
                            id={valideringsfeil.mottarDuPengestøtteFraAnnetLand?.id}
                            tekst={teksterOppholdINorge.checkbox_mottar_du_pengestøtte}
                            value={arbeidOgOpphold.mottarDuPengestøtteFraAnnetLand?.verdier || []}
                            error={valideringsfeil.mottarDuPengestøtteFraAnnetLand?.melding}
                            onChange={oppdaterMottarDuPengestøtte}
                        />
                        {skalTaStillingTilLandForPengestøtte(
                            arbeidOgOpphold.mottarDuPengestøtteFraAnnetLand
                        ) && (
                            <Select
                                id={valideringsfeil.hvilketLandMottarDuPengestøtteFra?.id}
                                label={teksterOppholdINorge.select_hvilket_land_pengestøtte[locale]}
                                onChange={oppdatertHvilketLandMottarPengestøtte}
                                value={
                                    arbeidOgOpphold.hvilketLandMottarDuPengestøtteFra?.verdi || ''
                                }
                                error={valideringsfeil.hvilketLandMottarDuPengestøtteFra?.melding}
                            >
                                <option value="">{fellesTekster.velg_land[locale]}</option>
                                {Object.entries(landkoder).map(([kode, tekst]) => (
                                    <option value={kode}>{tekst}</option>
                                ))}
                            </Select>
                        )}
                    </>
                )}
                {skalTaStillingTilOppholdUtenforNorge(arbeidOgOpphold) && (
                    <OppholdUtenforNorgeContainer
                        arbeidOgOpphold={arbeidOgOpphold}
                        settArbeidOgOpphold={settArbeidOgOpphold}
                    />
                )}
            </VStack>
        </UnderspørsmålContainer>
    );
};

export default ArbeidOgOppholdUtenforNorge;

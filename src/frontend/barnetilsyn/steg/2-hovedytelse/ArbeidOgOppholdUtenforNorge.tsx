import React from 'react';

import { Heading, Select, VStack } from '@navikt/ds-react';

import {
    skalTaStillingTilLandForPengestøtte,
    skalTaStillingTilOppholdsland,
    skalTaStillingTilOppholdUtenforNorge,
    skalTaStillingTilPengestøtte,
} from './validering';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import LocaleCheckboxGroup from '../../../components/Teksthåndtering/LocaleCheckboxGroup';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Landkoder } from '../../../typer/kodeverk';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import {
    ArbeidOgOpphold,
    JaNei,
    MottarPengestøtteTyper,
    ÅrsakOppholdUtenforNorge,
} from '../../../typer/søknad';
import { harVerdi } from '../../../utils/typer';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const teksterOppholdINorge = hovedytelseInnhold.arbeidOgOpphold;

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}
const ArbeidOgOppholdUtenforNorge: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
    const { locale } = useSpråk();
    const landkoder: Landkoder = { SWE: 'Sverige', FIN: 'Finland' };
    const { valideringsfeil } = useSøknad();

    const oppdaterJobberIAnnetLandEnnNorge = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            jobberIAnnetLandEnnNorge: verdi,
            hvilketLand: undefined,
            //mottarDuPengestøtteFraAnnetLand: Trenger ikke å nullstille då man alltid skal vise det spørsmålet
            oppholdUtenforNorge: undefined,
        }));
    };
    const oppdatertHvilketLandJobberI = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (harVerdi(e.target.value)) {
            settArbeidOgOpphold((prevState) => ({
                ...prevState,
                hvilketLandJobberIAnnetLandEnnNorge: {
                    label: teksterOppholdINorge.select_hvilket_land_jobber_i_annet_land_label[
                        locale
                    ],
                    verdi: e.target.value,
                    svarTekst: landkoder[e.target.value] || 'Finner ikke mapping',
                },
            }));
        } else {
            settArbeidOgOpphold((prevState) => ({
                ...prevState,
                hvilketLandJobberIAnnetLandEnnNorge: undefined,
            }));
        }
    };

    const oppdaterMottarDuPengestøtte = (verdi: EnumFlereValgFelt<MottarPengestøtteTyper>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            mottarDuPengestøtteFraAnnetLand: verdi,
            hvilketLandMottarDuPengestøtteFra: skalTaStillingTilLandForPengestøtte(verdi)
                ? prevState.hvilketLandMottarDuPengestøtteFra
                : undefined,
            oppholdUtenforNorge: undefined,
        }));
    };

    const oppdatertHvilketLandMottarPengestøtte = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (harVerdi(e.target.value)) {
            settArbeidOgOpphold((prevState) => ({
                ...prevState,
                hvilketLandMottarDuPengestøtteFra: {
                    label: teksterOppholdINorge.select_hvilket_land_pengestøtte[locale],
                    verdi: e.target.value,
                    svarTekst: landkoder[e.target.value] || 'Finner ikke mapping',
                },
            }));
        } else {
            settArbeidOgOpphold((prevState) => ({
                ...prevState,
                hvilketLandMottarDuPengestøtteFra: undefined,
            }));
        }
    };

    const oppdaterOppholdUtenforNorge = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            oppholdUtenforNorge: verdi,
        }));
    };

    const oppdatertHvilketLandOppholdUtenforNorge = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (harVerdi(e.target.value)) {
            settArbeidOgOpphold((prevState) => ({
                ...prevState,
                hvilketLandOppholdUtenforNorge: {
                    label: teksterOppholdINorge.select_hvilket_land_opphold_utenfor_norge[locale],
                    verdi: e.target.value,
                    svarTekst: landkoder[e.target.value] || 'Finner ikke mapping',
                },
            }));
        } else {
            settArbeidOgOpphold((prevState) => ({
                ...prevState,
                hvilketLandOppholdUtenforNorge: undefined,
            }));
        }
    };

    const oppdaterÅrsakOppholdUtenforNorge = (
        verdi: EnumFlereValgFelt<ÅrsakOppholdUtenforNorge>
    ) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            oppholdUtenforNorgeÅrsak: verdi,
        }));
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

                <LocaleRadioGroup
                    id={valideringsfeil.jobberIAnnetLandEnnNorge?.id}
                    tekst={teksterOppholdINorge.radio_jobber_annet_land_enn_norge}
                    value={arbeidOgOpphold?.jobberIAnnetLandEnnNorge?.verdi}
                    onChange={oppdaterJobberIAnnetLandEnnNorge}
                    error={valideringsfeil.jobberIAnnetLandEnnNorge?.melding}
                />

                {arbeidOgOpphold?.jobberIAnnetLandEnnNorge?.verdi === 'JA' && (
                    <Select
                        id={valideringsfeil.hvilketLandJobberIAnnetLandEnnNorge?.id}
                        label={
                            teksterOppholdINorge.select_hvilket_land_jobber_i_annet_land_label[
                                locale
                            ]
                        }
                        onChange={oppdatertHvilketLandJobberI}
                        value={arbeidOgOpphold?.hvilketLandJobberIAnnetLandEnnNorge?.verdi || ''}
                        error={valideringsfeil.hvilketLandJobberIAnnetLandEnnNorge?.melding}
                    >
                        <option value="">Velg land</option>
                        {Object.entries(landkoder).map(([kode, tekst]) => (
                            <option value={kode}>{tekst}</option>
                        ))}
                    </Select>
                )}

                {skalTaStillingTilPengestøtte(arbeidOgOpphold) && (
                    <>
                        <LocaleCheckboxGroup
                            id={valideringsfeil.mottarDuPengestøtteFraAnnetLand?.id}
                            tekst={teksterOppholdINorge.checkbox_mottar_du_pengestøtte}
                            value={arbeidOgOpphold?.mottarDuPengestøtteFraAnnetLand?.verdier || []}
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
                                    arbeidOgOpphold?.hvilketLandMottarDuPengestøtteFra?.verdi || ''
                                }
                                error={valideringsfeil.hvilketLandMottarDuPengestøtteFra?.melding}
                            >
                                <option value="">Velg land</option>
                                {Object.entries(landkoder).map(([kode, tekst]) => (
                                    <option value={kode}>{tekst}</option>
                                ))}
                            </Select>
                        )}
                        {skalTaStillingTilOppholdUtenforNorge(arbeidOgOpphold) && (
                            <LocaleRadioGroup
                                id={valideringsfeil.oppholdUtenforNorge?.id}
                                tekst={teksterOppholdINorge.radio_har_du_oppholdt_deg_utenfor_norge}
                                value={arbeidOgOpphold?.oppholdUtenforNorge?.verdi}
                                onChange={oppdaterOppholdUtenforNorge}
                                error={valideringsfeil.oppholdUtenforNorge?.melding}
                            />
                        )}
                        {skalTaStillingTilOppholdsland(arbeidOgOpphold) && (
                            <>
                                <Select
                                    id={valideringsfeil.hvilketLandOppholdUtenforNorge?.id}
                                    label={
                                        teksterOppholdINorge
                                            .select_hvilket_land_opphold_utenfor_norge[locale]
                                    }
                                    onChange={oppdatertHvilketLandOppholdUtenforNorge}
                                    value={
                                        arbeidOgOpphold?.hvilketLandOppholdUtenforNorge?.verdi || ''
                                    }
                                    error={valideringsfeil.hvilketLandOppholdUtenforNorge?.melding}
                                >
                                    <option value="">Velg land</option>
                                    {Object.entries(landkoder).map(([kode, tekst]) => (
                                        <option value={kode}>{tekst}</option>
                                    ))}
                                </Select>
                                <LocaleCheckboxGroup
                                    id={valideringsfeil.oppholdUtenforNorgeÅrsak?.id}
                                    tekst={
                                        teksterOppholdINorge.checkbox_årsak_opphold_utenfor_norge
                                    }
                                    value={arbeidOgOpphold?.oppholdUtenforNorgeÅrsak?.verdier || []}
                                    error={valideringsfeil.oppholdUtenforNorgeÅrsak?.melding}
                                    onChange={oppdaterÅrsakOppholdUtenforNorge}
                                />
                            </>
                        )}
                    </>
                )}
            </VStack>
        </UnderspørsmålContainer>
    );
};

export default ArbeidOgOppholdUtenforNorge;

import React from 'react';

import { Heading, Select, VStack } from '@navikt/ds-react';

import { landkoder } from './landkoder';
import LeggTilOppholdKnapp from './LeggTilOppholdKnapp';
import Opphold from './Opphold';
import { oppdaterOpphold, opprettOppholdForNesteId } from './oppholdUtil';
import {
    skalTaStillingTilLandForPengestøtte,
    skalTaStillingTilOppholdNeste12mnd,
    skalTaStillingTilOppholdSiste12mnd,
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
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import {
    ArbeidOgOpphold,
    JaNei,
    MottarPengestøtteTyper,
    OppholdUtenforNorge,
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
    const { valideringsfeil } = useSøknad();

    const oppdaterJobberIAnnetLandEnnNorge = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            jobberIAnnetLandEnnNorge: verdi,
            hvilketLand: undefined,
            //mottarDuPengestøtteFraAnnetLand: Trenger ikke å nullstille då man alltid skal vise det spørsmålet
            harDuOppholdUtenforNorge: undefined,
            oppholdUtenforNorge: [],
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
            oppholdUtenforNorge: [],
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

    const oppdaterOppholdSiste12mnd = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState: ArbeidOgOpphold) => {
            const opphold: OppholdUtenforNorge[] =
                verdi.verdi === 'JA'
                    ? [opprettOppholdForNesteId(prevState.oppholdUtenforNorgeSiste12mnd)]
                    : [];
            return {
                ...prevState,
                harDuOppholdUtenforNorgeSiste12mnd: verdi,
                oppholdUtenforNorgeSiste12mnd: opphold,
            };
        });
    };

    const oppdaterOppholdNeste12mnd = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState: ArbeidOgOpphold) => {
            const opphold: OppholdUtenforNorge[] =
                verdi.verdi === 'JA'
                    ? [opprettOppholdForNesteId(prevState.oppholdUtenforNorgeNeste12mnd)]
                    : [];
            return {
                ...prevState,
                harDuOppholdUtenforNorgeNeste12mnd: verdi,
                oppholdUtenforNorgeNeste12mnd: opphold,
            };
        });
    };

    /**
     * Returnerer en metode som er generisk som oppdaterer felter i oppholdutenfor norge,
     * [oppholdUtenforNorgeSiste12mnd] eller [oppholdUtenforNorgeNeste12mnd]
     */
    const oppdaterOppholdUtenforNorge =
        (
            oppholdKey: keyof Pick<
                ArbeidOgOpphold,
                'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
            >
        ) =>
        <T extends OppholdUtenforNorge, K extends keyof T>(id: number, key: K, verdi: T[K]) => {
            settArbeidOgOpphold((prevState) => {
                return {
                    ...prevState,
                    [oppholdKey]: oppdaterOpphold(prevState[oppholdKey], id, key, verdi),
                };
            });
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
                                id={valideringsfeil.harDuOppholdUtenforNorge?.id}
                                tekst={teksterOppholdINorge.oppholdUtenforNorge.radioSiste12mnd}
                                value={arbeidOgOpphold?.harDuOppholdUtenforNorgeSiste12mnd?.verdi}
                                onChange={oppdaterOppholdSiste12mnd}
                                error={valideringsfeil.harDuOppholdUtenforNorge?.melding}
                            />
                        )}
                        {skalTaStillingTilOppholdSiste12mnd(arbeidOgOpphold) && (
                            <>
                                {arbeidOgOpphold?.oppholdUtenforNorgeSiste12mnd.map((opphold) => (
                                    <Opphold
                                        opphold={opphold}
                                        oppdater={oppdaterOppholdUtenforNorge(
                                            'oppholdUtenforNorgeSiste12mnd'
                                        )}
                                        tekster={
                                            teksterOppholdINorge.oppholdUtenforNorge.siste12mnd
                                        }
                                        locale={locale}
                                    />
                                ))}
                                <LeggTilOppholdKnapp
                                    key={'oppholdUtenforNorgeSiste12mnd'}
                                    settArbeidOgOpphold={settArbeidOgOpphold}
                                />
                            </>
                        )}
                        {skalTaStillingTilOppholdSiste12mnd(arbeidOgOpphold) && (
                            <LocaleRadioGroup
                                //id={valideringsfeil.harDuOppholdUtenforNorge?.id}
                                tekst={teksterOppholdINorge.oppholdUtenforNorge.radioNeste12mnd}
                                value={arbeidOgOpphold?.harDuOppholdUtenforNorgeNeste12mnd?.verdi}
                                onChange={oppdaterOppholdNeste12mnd}
                                //error={valideringsfeil.harDuOppholdUtenforNorge?.melding}
                            />
                        )}
                        {skalTaStillingTilOppholdNeste12mnd(arbeidOgOpphold) && (
                            <>
                                {arbeidOgOpphold?.oppholdUtenforNorgeNeste12mnd.map((opphold) => (
                                    <Opphold
                                        opphold={opphold}
                                        oppdater={oppdaterOppholdUtenforNorge(
                                            'oppholdUtenforNorgeNeste12mnd'
                                        )}
                                        tekster={
                                            teksterOppholdINorge.oppholdUtenforNorge.neste12mnd
                                        }
                                        locale={locale}
                                    />
                                ))}
                                <LeggTilOppholdKnapp
                                    key={'oppholdUtenforNorgeSiste12mnd'}
                                    settArbeidOgOpphold={settArbeidOgOpphold}
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

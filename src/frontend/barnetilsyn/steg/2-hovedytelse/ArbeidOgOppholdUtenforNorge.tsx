import React from 'react';

import { Button, Heading, Select, VStack } from '@navikt/ds-react';

import { landkoder } from './landkoder';
import OppholdUtenforNorge from './OppholdUtenforNorge';
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
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold, JaNei, MottarPengestøtteTyper } from '../../../typer/søknad';
import { harVerdi } from '../../../utils/typer';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const teksterOppholdINorge = hovedytelseInnhold.arbeidOgOpphold;

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

/**
 * Setter utleders max id for å kunne sette nytt id på neste item for å kunne lenke til unik opphold
 */
const utledMaxId = (opphold: ArbeidOgOpphold) => {
    const ids = opphold.oppholdUtenforNorgeSiste12mnd.map((opphold) => opphold._id);
    return ids.length > 0 ? Math.max(...ids) : 0;
};

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

    const oppdaterOppholdUtenforNorge = (verdi: EnumFelt<JaNei>) => {
        settArbeidOgOpphold((prevState: ArbeidOgOpphold) => {
            const maxId = utledMaxId(prevState);
            const oppholdUtenforNorgeSiste12mnd: OppholdUtenforNorge[] =
                verdi.verdi === 'JA' ? [{ _id: maxId + 1 }] : [];
            return {
                ...prevState,
                harDuOppholdUtenforNorgeSiste12mnd: verdi,
                oppholdUtenforNorgeSiste12mnd: oppholdUtenforNorgeSiste12mnd,
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
                                onChange={oppdaterOppholdUtenforNorge}
                                error={valideringsfeil.harDuOppholdUtenforNorge?.melding}
                            />
                        )}
                        {skalTaStillingTilOppholdsland(arbeidOgOpphold) &&
                            arbeidOgOpphold?.harDuOppholdUtenforNorgeSiste12mnd && (
                                <>
                                    {arbeidOgOpphold?.oppholdUtenforNorgeSiste12mnd.map(
                                        (opphold) => (
                                            <OppholdUtenforNorge
                                                opphold={opphold}
                                                oppdater={() => {}}
                                                tekster={
                                                    teksterOppholdINorge.oppholdUtenforNorge
                                                        .siste12mnd
                                                }
                                                locale={locale}
                                            />
                                        )
                                    )}

                                    <Button
                                        variant={'tertiary'}
                                        onClick={() =>
                                            settArbeidOgOpphold((prevState) => ({
                                                ...prevState,
                                                oppholdUtenforNorge: [
                                                    ...prevState.oppholdUtenforNorgeSiste12mnd,
                                                    {},
                                                ],
                                            }))
                                        }
                                    >
                                        {
                                            teksterOppholdINorge.oppholdUtenforNorge.knapp_legg_til[
                                                locale
                                            ]
                                        }
                                    </Button>
                                </>
                            )}
                    </>
                )}
            </VStack>
        </UnderspørsmålContainer>
    );
};

export default ArbeidOgOppholdUtenforNorge;

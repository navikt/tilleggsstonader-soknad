import { useState } from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleCheckboxGroup from '../../../components/Teksthåndtering/LocaleCheckboxGroup';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const teksterOppholdINorge = hovedytelseInnhold.oppholdINorge;

const Hovedytelse = () => {
    const { locale } = useSpråk();
    const { hovedytelse, settHovedytelse, valideringsfeil, settValideringsfeil } = useSøknad();

    const [ytelse, settYtelse] = useState<EnumFlereValgFelt<Ytelse> | undefined>(
        hovedytelse?.ytelse
    );

    const [boddSammenhengende, settBoddSammenhengende] = useState<EnumFelt<JaNei> | undefined>(
        hovedytelse?.boddSammenhengende
    );
    const [planleggerBoINorgeNeste12mnd, settPlanleggerBoINorgeNeste12mnd] = useState<
        EnumFelt<JaNei> | undefined
    >(hovedytelse?.planleggerBoINorgeNeste12mnd);

    const skalTaStillingTilOpphold = ytelse ? skalTaStillingTilOppholdINorge(ytelse) : false;

    const kanFortsette = (ytelse?: EnumFlereValgFelt<Ytelse>): boolean => {
        let feil: Valideringsfeil = {};

        if (ytelse === undefined || ytelse.verdier.length === 0) {
            feil = {
                ...feil,
                ytelse: { id: '1', melding: hovedytelseInnhold.hovedytelse_feilmelding[locale] },
            };
        }

        if (skalTaStillingTilOpphold && boddSammenhengende === undefined) {
            feil = {
                ...feil,
                boddSammenhengende: {
                    id: '2',
                    melding: teksterOppholdINorge.feilmelding_boddSammenhengende[locale],
                },
            };
        }
        if (
            skalTaStillingTilOpphold &&
            boddSammenhengende?.verdi === 'NEI' &&
            planleggerBoINorgeNeste12mnd === undefined
        ) {
            feil = {
                ...feil,
                planleggerBoINorgeNeste12mnd: {
                    id: '3',
                    melding: teksterOppholdINorge.feilmelding_planleggerBoINorgeNeste12mnd[locale],
                },
            };
        }
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSkalTaStillingTilOpphold = (ytelse: EnumFlereValgFelt<Ytelse>) => {
        if (!skalTaStillingTilOppholdINorge(ytelse)) {
            settBoddSammenhengende(undefined);
            settPlanleggerBoINorgeNeste12mnd(undefined);
            settValideringsfeil({});
        } else {
            settValideringsfeil((prevState) => ({ ...prevState, ytelse: undefined }));
        }
    };

    const oppdaterBoddSammenhengende = (verdi: EnumFelt<JaNei>) => {
        settBoddSammenhengende(verdi);
        if (verdi.verdi === 'JA') {
            settPlanleggerBoINorgeNeste12mnd(undefined);
            settValideringsfeil((prevState) => ({
                ...prevState,
                boddSammenhengende: undefined,
                planleggerBoINorgeNeste12mnd: undefined,
            }));
        } else {
            settValideringsfeil((prevState) => ({
                ...prevState,
                boddSammenhengende: undefined,
            }));
        }
    };

    const oppdaterPlanleggerBoINorge = (verdi: EnumFelt<JaNei>) => {
        settValideringsfeil((prevState) => ({
            ...prevState,
            planleggerBoINorgeNeste12mnd: undefined,
        }));
        settPlanleggerBoINorgeNeste12mnd(verdi);
    };
    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            validerSteg={() => kanFortsette(ytelse)}
            oppdaterSøknad={() => {
                if (ytelse !== undefined) {
                    settHovedytelse({
                        ytelse: ytelse,
                        boddSammenhengende: boddSammenhengende,
                        planleggerBoINorgeNeste12mnd: planleggerBoINorgeNeste12mnd,
                    });
                }
            }}
        >
            <Heading size="medium">
                <LocaleTekst tekst={hovedytelseInnhold.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={hovedytelseInnhold.guide_innhold} />
            </PellePanel>
            <LocaleCheckboxGroup
                id={valideringsfeil.ytelse?.id}
                tekst={hovedytelseInnhold.checkbox_hovedytelse}
                value={ytelse ? ytelse.verdier : []}
                onChange={(ytelse: EnumFlereValgFelt<Ytelse>) => {
                    settYtelse(ytelse);
                    oppdaterSkalTaStillingTilOpphold(ytelse);
                }}
                error={valideringsfeil?.ytelse?.melding}
            />
            {skalTaStillingTilOpphold && (
                <UnderspørsmålContainer>
                    <VStack gap="6">
                        <Heading size="medium">
                            <LocaleTekst tekst={hovedytelseInnhold.oppholdINorge.tittel} />
                        </Heading>
                        <PellePanel>
                            <LocaleInlineLenke
                                tekst={hovedytelseInnhold.oppholdINorge.guide_innhold}
                            />
                        </PellePanel>
                        <LocaleRadioGroup
                            id={valideringsfeil.boddSammenhengende?.id}
                            tekst={hovedytelseInnhold.oppholdINorge.radio_boddSammenhengende}
                            value={boddSammenhengende?.verdi}
                            onChange={oppdaterBoddSammenhengende}
                            error={valideringsfeil.boddSammenhengende?.melding}
                        >
                            <LocaleReadMore
                                tekst={hovedytelseInnhold.oppholdINorge.lesMer_boddSammenhengende}
                            />
                        </LocaleRadioGroup>
                        {boddSammenhengende?.verdi === 'NEI' && (
                            <LocaleRadioGroup
                                id={valideringsfeil.planleggerBoINorgeNeste12mnd?.id}
                                tekst={
                                    hovedytelseInnhold.oppholdINorge
                                        .radio_planleggerBoINorgeNeste12mnd
                                }
                                value={planleggerBoINorgeNeste12mnd?.verdi}
                                onChange={oppdaterPlanleggerBoINorge}
                                error={valideringsfeil?.planleggerBoINorgeNeste12mnd?.melding}
                            />
                        )}
                    </VStack>
                </UnderspørsmålContainer>
            )}
        </Side>
    );
};

export default Hovedytelse;

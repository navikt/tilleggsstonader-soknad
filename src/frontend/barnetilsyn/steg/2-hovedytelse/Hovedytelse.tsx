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
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

interface Feil {
    ytelse?: string;
    boddSammenhengende?: string;
    planleggerBoINorgeNeste12mnd?: string;
}

const teksterOppholdINorge = hovedytelseInnhold.oppholdINorge;

const Hovedytelse = () => {
    const { locale } = useSpråk();
    const { hovedytelse, settHovedytelse } = useSøknad();

    const [ytelse, settYtelse] = useState<EnumFlereValgFelt<Ytelse> | undefined>(
        hovedytelse?.ytelse
    );

    const [boddSammenhengende, settBoddSammenhengende] = useState<EnumFelt<JaNei> | undefined>(
        hovedytelse?.boddSammenhengende
    );
    const [planleggerBoINorgeNeste12mnd, settPlanleggerBoINorgeNeste12mnd] = useState<
        EnumFelt<JaNei> | undefined
    >(hovedytelse?.planleggerBoINorgeNeste12mnd);

    const [ytelseFeil, settYtelseFeil] = useState<Feil>();
    const skalTaStillingTilOpphold = ytelse ? skalTaStillingTilOppholdINorge(ytelse) : false;

    const kanFortsette = (ytelse?: EnumFlereValgFelt<Ytelse>): boolean => {
        let kanFortsette = true;
        let feil: Feil = {};

        if (ytelse === undefined || ytelse.verdier.length === 0) {
            feil = { ...feil, ytelse: hovedytelseInnhold.hovedytelse_feilmelding[locale] };
            kanFortsette = false;
        }

        if (skalTaStillingTilOpphold && boddSammenhengende === undefined) {
            feil = {
                ...feil,
                boddSammenhengende: teksterOppholdINorge.feilmelding_boddSammenhengende[locale],
            };
            kanFortsette = false;
        }
        if (
            skalTaStillingTilOpphold &&
            boddSammenhengende?.verdi === 'NEI' &&
            planleggerBoINorgeNeste12mnd === undefined
        ) {
            feil = {
                ...feil,
                planleggerBoINorgeNeste12mnd:
                    teksterOppholdINorge.feilmelding_planleggerBoINorgeNeste12mnd[locale],
            };
            kanFortsette = false;
        }
        settYtelseFeil(feil);
        return kanFortsette;
    };

    const oppdaterSkalTaStillingTilOpphold = (ytelse: EnumFlereValgFelt<Ytelse>) => {
        if (!skalTaStillingTilOppholdINorge(ytelse)) {
            settBoddSammenhengende(undefined);
            settPlanleggerBoINorgeNeste12mnd(undefined);
            settYtelseFeil(undefined);
        } else {
            settYtelseFeil((prevState) => ({ ...prevState, ytelse: undefined }));
        }
    };

    const oppdaterBoddSammenhengende = (verdi: EnumFelt<JaNei>) => {
        settBoddSammenhengende(verdi);
        if (verdi.verdi === 'JA') {
            settPlanleggerBoINorgeNeste12mnd(undefined);
            settYtelseFeil((prevState) => ({
                ...prevState,
                boddSammenhengende: undefined,
                planleggerBoINorgeNeste12mnd: undefined,
            }));
        } else {
            settYtelseFeil((prevState) => ({
                ...prevState,
                boddSammenhengende: undefined,
            }));
        }
    };

    const oppdaterPlanleggerBoINorge = (verdi: EnumFelt<JaNei>) => {
        settYtelseFeil((prevState) => ({
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
                tekst={hovedytelseInnhold.checkbox_hovedytelse}
                value={ytelse ? ytelse.verdier : []}
                onChange={(ytelse: EnumFlereValgFelt<Ytelse>) => {
                    settYtelse(ytelse);
                    oppdaterSkalTaStillingTilOpphold(ytelse);
                }}
                error={ytelseFeil?.ytelse}
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
                            tekst={hovedytelseInnhold.oppholdINorge.radio_boddSammenhengende}
                            value={boddSammenhengende?.verdi}
                            onChange={oppdaterBoddSammenhengende}
                            error={ytelseFeil?.boddSammenhengende}
                        >
                            <LocaleReadMore
                                tekst={hovedytelseInnhold.oppholdINorge.lesMer_boddSammenhengende}
                            />
                        </LocaleRadioGroup>
                        {boddSammenhengende?.verdi === 'NEI' && (
                            <LocaleRadioGroup
                                tekst={
                                    hovedytelseInnhold.oppholdINorge
                                        .radio_planleggerBoINorgeNeste12mnd
                                }
                                value={planleggerBoINorgeNeste12mnd?.verdi}
                                onChange={oppdaterPlanleggerBoINorge}
                                error={ytelseFeil?.planleggerBoINorgeNeste12mnd}
                            />
                        )}
                    </VStack>
                </UnderspørsmålContainer>
            )}
        </Side>
    );
};

export default Hovedytelse;

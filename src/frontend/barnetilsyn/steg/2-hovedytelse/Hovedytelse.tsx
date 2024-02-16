import { useState } from 'react';

import styled from 'styled-components';

import { Heading } from '@navikt/ds-react';

import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side, { Innhold } from '../../../components/Side';
import LocaleCheckboxGroup from '../../../components/Teksthåndtering/LocaleCheckboxGroup';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSøknad } from '../../../context/SøknadContext';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const OppholdINorge = styled(Innhold)`
    margin-top: 3rem;
`;
interface Feil {
    ytelse?: string;
    boddSammenhengende?: string;
    planleggerBoINorgeNeste12mnd?: string;
}

const Hovedytelse = () => {
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

    const [skalTaStillingTilOpphold, settSkalTaStillingTilOpphold] = useState(
        hovedytelse?.ytelse ? skalTaStillingTilOppholdINorge(hovedytelse.ytelse) : false
    );

    const [ytelseFeil, settYtelseFeil] = useState<Feil>();

    const kanFortsette = (ytelse?: EnumFlereValgFelt<Ytelse>): boolean => {
        let kanFortsette = true;
        let feil: Feil = {};

        if (ytelse === undefined || ytelse.verdier.length === 0) {
            feil = { ...feil, ytelse: 'Du må velge et alternativ' };
            kanFortsette = false;
        }
        if (skalTaStillingTilOpphold && boddSammenhengende === undefined) {
            feil = { ...feil, boddSammenhengende: 'Du må velge et alternativ' };
            kanFortsette = false;
        }
        if (
            skalTaStillingTilOpphold &&
            boddSammenhengende?.verdi === 'NEI' &&
            planleggerBoINorgeNeste12mnd === undefined
        ) {
            feil = { ...feil, planleggerBoINorgeNeste12mnd: 'Du må velge et alternativ' };
            kanFortsette = false;
        }
        settYtelseFeil(feil);
        return kanFortsette;
    };

    const oppdaterSkalTaStillingTilOpphold = (ytelse: EnumFlereValgFelt<Ytelse>) => {
        const skalTaStillingTilOpphold = skalTaStillingTilOppholdINorge(ytelse);
        settSkalTaStillingTilOpphold(skalTaStillingTilOpphold);
        if (!skalTaStillingTilOpphold) {
            settBoddSammenhengende(undefined);
            settPlanleggerBoINorgeNeste12mnd(undefined);
        }
    };

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            stegtittel={hovedytelseInnhold.steg_tittel}
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
                <LocaleTekst tekst={hovedytelseInnhold.innhold_tittel} />
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
                    settYtelseFeil(undefined);
                }}
                error={ytelseFeil?.ytelse}
            />
            {skalTaStillingTilOpphold && (
                <OppholdINorge>
                    <Heading size="medium">
                        <LocaleTekst tekst={hovedytelseInnhold.oppholdINorge.tittel} />
                    </Heading>
                    <PellePanel>
                        <LocaleTekst tekst={hovedytelseInnhold.oppholdINorge.guide_innhold} />
                    </PellePanel>
                    <LocaleRadioGroup
                        tekst={hovedytelseInnhold.oppholdINorge.radio_boddSammenhengende}
                        value={boddSammenhengende?.verdi}
                        onChange={(verdi) => {
                            settBoddSammenhengende(verdi);
                            if (verdi.verdi === 'JA') {
                                settPlanleggerBoINorgeNeste12mnd(undefined);
                            }
                        }}
                        error={ytelseFeil?.boddSammenhengende}
                    >
                        <LocaleReadMore
                            tekst={hovedytelseInnhold.oppholdINorge.lesMer_boddSammenhengende}
                        />
                    </LocaleRadioGroup>
                    {boddSammenhengende?.verdi === 'NEI' && (
                        <LocaleRadioGroup
                            tekst={
                                hovedytelseInnhold.oppholdINorge.radio_planleggerBoINorgeNeste12mnd
                            }
                            value={planleggerBoINorgeNeste12mnd?.verdi}
                            onChange={settPlanleggerBoINorgeNeste12mnd}
                            error={ytelseFeil?.planleggerBoINorgeNeste12mnd}
                        />
                    )}
                </OppholdINorge>
            )}
        </Side>
    );
};

export default Hovedytelse;

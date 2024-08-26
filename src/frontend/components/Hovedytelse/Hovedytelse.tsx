import { useState } from 'react';

import { Heading } from '@navikt/ds-react';

import ArbeidOgOppholdUtenforNorge from './ArbeidOgOpphold/ArbeidOgOppholdUtenforNorge';
import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { validerHovedytelse } from './validering';
import { hovedytelseInnhold } from '../../barnetilsyn/tekster/hovedytelse';
import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { EnumFlereValgFelt } from '../../typer/skjema';
import { Stønadstype } from '../../typer/stønadstyper';
import { ArbeidOgOpphold } from '../../typer/søknad';
import { inneholderFeil } from '../../typer/validering';
import { PellePanel } from '../PellePanel/PellePanel';
import Side from '../Side';
import LocaleCheckboxGroup from '../Teksthåndtering/LocaleCheckboxGroup';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const defaultArbeidOgOpphold: ArbeidOgOpphold = {
    oppholdUtenforNorgeSiste12mnd: [],
    oppholdUtenforNorgeNeste12mnd: [],
};

const Hovedytelse = () => {
    const { locale } = useSpråk();
    const { hovedytelse, settHovedytelse, valideringsfeil, settValideringsfeil } = useSøknad();

    const [ytelse, settYtelse] = useState<EnumFlereValgFelt<Ytelse> | undefined>(
        hovedytelse?.ytelse
    );

    const [arbeidOgOpphold, settArbeidOgOpphold] = useState<ArbeidOgOpphold>(
        hovedytelse?.arbeidOgOpphold || defaultArbeidOgOpphold
    );

    const skalTaStillingTilOpphold = ytelse ? skalTaStillingTilOppholdINorge(ytelse) : false;

    const kanFortsette = (ytelse?: EnumFlereValgFelt<Ytelse>): boolean => {
        const feil = validerHovedytelse(ytelse, arbeidOgOpphold, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSkalTaStillingTilOpphold = (ytelse: EnumFlereValgFelt<Ytelse>) => {
        if (!skalTaStillingTilOppholdINorge(ytelse)) {
            settArbeidOgOpphold(defaultArbeidOgOpphold);
            settValideringsfeil({});
        } else {
            settValideringsfeil((prevState) => ({ ...prevState, ytelse: undefined }));
        }
    };

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            validerSteg={() => kanFortsette(ytelse)}
            oppdaterSøknad={() => {
                if (ytelse !== undefined) {
                    settHovedytelse({
                        ytelse: ytelse,
                        arbeidOgOpphold: arbeidOgOpphold,
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
                <ArbeidOgOppholdUtenforNorge
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                />
            )}
        </Side>
    );
};

export default Hovedytelse;

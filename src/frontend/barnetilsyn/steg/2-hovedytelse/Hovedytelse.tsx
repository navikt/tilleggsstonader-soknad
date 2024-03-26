import { useState } from 'react';

import { Heading } from '@navikt/ds-react';

import ArbeidOgOppholdUtenforNorge from './ArbeidOgOppholdUtenforNorge';
import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { validerHovedytelse } from './validering';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleCheckboxGroup from '../../../components/Teksthåndtering/LocaleCheckboxGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const Hovedytelse = () => {
    const { locale } = useSpråk();
    const { hovedytelse, settHovedytelse, valideringsfeil, settValideringsfeil } = useSøknad();

    const [ytelse, settYtelse] = useState<EnumFlereValgFelt<Ytelse> | undefined>(
        hovedytelse?.ytelse
    );

    const [arbeidOgOpphold, settArbeidOgOpphold] = useState<ArbeidOgOpphold>(
        hovedytelse?.arbeidOgOpphold || {
            oppholdUtenforNorgeSiste12mnd: [],
            oppholdUtenforNorgeNeste12mnd: [],
        }
    );

    const skalTaStillingTilOpphold = ytelse ? skalTaStillingTilOppholdINorge(ytelse) : false;

    const kanFortsette = (ytelse?: EnumFlereValgFelt<Ytelse>): boolean => {
        const feil = validerHovedytelse(ytelse, arbeidOgOpphold, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSkalTaStillingTilOpphold = (ytelse: EnumFlereValgFelt<Ytelse>) => {
        if (!skalTaStillingTilOppholdINorge(ytelse)) {
            settArbeidOgOpphold({
                oppholdUtenforNorgeSiste12mnd: [],
                oppholdUtenforNorgeNeste12mnd: [],
            });
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

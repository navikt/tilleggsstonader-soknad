import React from 'react';

import { GuidePanel } from '@navikt/ds-react';

import { ArbeidOgOppholdUtenforNorge } from './ArbeidOgOpphold/ArbeidOgOppholdUtenforNorge';
import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { defaultArbeidOgOpphold, HovedytelseTilstand, useHovedytelse } from './useHovedytelse';
import { useValideringsfeil } from '../../context/ValideringsfeilContext';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';
import { EnumFlereValgFelt } from '../../typer/skjema';
import { Hovedytelse } from '../../typer/søknad';
import { inneholderFeil } from '../../typer/validering';
import { EndringEnsligForsørgerExpansionCard } from '../EndringEnsligForsørger/EndringEnsligForsørgerExpansionCard';
import { Side } from '../Side';
import { LocaleCheckboxGroup } from '../Teksthåndtering/LocaleCheckboxGroup';
import { LocaleHeading } from '../Teksthåndtering/LocaleHeading';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';

interface Props {
    hovedytelse: Hovedytelse | undefined;
    oppdaterHovedytelse: (hovedytelse: Hovedytelse) => void;
    brukNyAlert?: boolean;
}

export const HovedytelseSide: React.FC<Props> = ({ hovedytelse, oppdaterHovedytelse }) => {
    const tilstand = useHovedytelse(hovedytelse);
    const { settValideringsfeil } = useValideringsfeil();

    return (
        <Side
            validerSteg={() => {
                const feil = tilstand.valider();
                settValideringsfeil(feil);
                return !inneholderFeil(feil);
            }}
            oppdaterSøknad={() => {
                if (tilstand.utfyltHovedytelse) {
                    oppdaterHovedytelse(tilstand.utfyltHovedytelse);
                }
            }}
        >
            <HovedytelseInnhold tilstand={tilstand} />
        </Side>
    );
};

/**
 * Spørsmålene om hovedytelse uten Side rundt. Brukes av søknader som trenger egne spørsmål på samme side.
 */
export const HovedytelseInnhold: React.FC<{ tilstand: HovedytelseTilstand }> = ({ tilstand }) => {
    const { ytelse, settYtelse, arbeidOgOpphold, settArbeidOgOpphold } = tilstand;
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const skalTaStillingTilOpphold = ytelse ? skalTaStillingTilOppholdINorge(ytelse) : false;

    const oppdaterSkalTaStillingTilOpphold = (ytelse: EnumFlereValgFelt<Ytelse>) => {
        if (!skalTaStillingTilOppholdINorge(ytelse)) {
            settArbeidOgOpphold(defaultArbeidOgOpphold);
            settValideringsfeil({});
        } else {
            settValideringsfeil((prevState) => ({ ...prevState, ytelse: undefined }));
        }
    };

    const skalViseVarselOmRegelendring =
        ytelse?.verdier.some((ytelseFelt) => ytelseFelt.verdi === 'OVERGANGSSTØNAD') ?? false;

    return (
        <>
            <LocaleHeading tekst={hovedytelseInnhold.tittel} size="medium" level="2" />
            <GuidePanel>
                <LocaleTekst tekst={hovedytelseInnhold.guide_innhold} />
            </GuidePanel>
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
            {skalViseVarselOmRegelendring && <EndringEnsligForsørgerExpansionCard />}
        </>
    );
};

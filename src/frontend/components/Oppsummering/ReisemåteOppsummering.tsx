import React from 'react';

import { BodyShort, FormSummary } from '@navikt/ds-react';

import { Answer } from './Answer';
import { OppsummeringSvar } from './OppsummeringSvar';
import { PrivatBilInfo, Reisemåte, UtgifterPrivatBil } from '../../typer/reisemåte';
import { adressefelterTilVisning } from '../../utils/adresseUtils';

export const ReisemåteOppsummering: React.FC<{ reisemåte: Reisemåte }> = ({ reisemåte }) => {
    const {
        hvilkeTransportmidlerBleBenyttet,
        unntakFraOffentligTransport,
        unntakFraPrivatBil,
        offentligTransport,
        privatBil,
        drosje,
    } = reisemåte;

    const adresseBarnehage = adressefelterTilVisning({
        gateadresse:
            reisemåte?.unntakFraOffentligTransport?.leveringOgHentingIBarnehage?.gateadresse?.verdi,
        postnummer:
            reisemåte?.unntakFraOffentligTransport?.leveringOgHentingIBarnehage?.postnummer?.verdi,
    });

    return (
        <>
            <OppsummeringSvar felt={hvilkeTransportmidlerBleBenyttet} />

            {unntakFraOffentligTransport && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        {unntakFraOffentligTransport?.årsaker?.label || ''}
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {unntakFraOffentligTransport?.årsaker?.verdier
                            .map((verdi) => verdi.label)
                            .join(', ')}
                    </FormSummary.Value>
                    {unntakFraOffentligTransport?.leveringOgHentingIBarnehage && (
                        <FormSummary.Value>Adresse barnehage: {adresseBarnehage}</FormSummary.Value>
                    )}
                </FormSummary.Answer>
            )}

            <OppsummeringSvar felt={unntakFraPrivatBil} />

            {offentligTransport && (
                <OppsummeringSvar felt={offentligTransport.totalUtgifterOffentligTransport} />
            )}

            {privatBil && <PrivatBilInfoOppsummering privatBil={privatBil} />}

            {drosje && <OppsummeringSvar felt={drosje.harTTKort} />}
        </>
    );
};

const PrivatBilInfoOppsummering: React.FC<{ privatBil: PrivatBilInfo }> = ({ privatBil }) => {
    return (
        <>
            <OppsummeringSvar felt={privatBil.benyttetEgenBil} />
            <OppsummeringSvar felt={privatBil.betalteForReisen} />
            <OppsummeringSvar
                felt={privatBil.infoBilKunDelerAvStrekning?.antallKilometerKjørt}
                valuePostfix="km"
            />
            <OppsummeringSvar
                felt={privatBil.infoBilKunDelerAvStrekning?.strekningHvorBilBleBenyttet}
            />
            {privatBil.utgifterPrivatBil && (
                <OppsummeringUtgifterPrivatBil utgifter={privatBil.utgifterPrivatBil} />
            )}
        </>
    );
};

const OppsummeringUtgifterPrivatBil: React.FC<{ utgifter: UtgifterPrivatBil }> = ({ utgifter }) => {
    const { bompenger, ferge, piggdekkavgift, parkering, drivstoffType } = utgifter;

    return (
        <Answer label="Utgifter privat bil">
            {parkering && <BodyShort>Parkering: {parkering?.verdi}</BodyShort>}
            {bompenger && <BodyShort>Bompenger: {bompenger?.verdi}</BodyShort>}
            {ferge && <BodyShort>Ferge: {ferge?.verdi}</BodyShort>}
            {piggdekkavgift && <BodyShort>Piggdekkavgift: {piggdekkavgift?.verdi}</BodyShort>}
            {drivstoffType && <BodyShort>Drivstofftype: {drivstoffType?.svarTekst}</BodyShort>}
        </Answer>
    );
};

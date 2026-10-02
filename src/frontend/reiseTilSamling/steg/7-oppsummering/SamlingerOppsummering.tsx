import React from 'react';

import { BodyShort, FormSummary } from '@navikt/ds-react';

import { Answer, GruppertAnswer } from '../../../components/Oppsummering/Answer';
import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { Samling } from '../../../typer/søknad';
import { adressefelterTilVisning } from '../../../utils/adresseUtils';
import { formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { PrivatBilInfo, Reisemåte, UtgifterPrivatBil } from '../../typer/reisemåte';

export const OppsummeringSamling: React.FC<{ samling: Samling }> = ({ samling }) => {
    const adresse = adressefelterTilVisning({
        gateadresse: samling.adresse?.gateadresse?.verdi,
        postnummer: samling.adresse?.postnummer?.verdi,
        poststed: samling.adresse?.poststed?.verdi,
        land: samling.adresse?.land?.verdi,
    });

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    Reise til samling (
                    {formaterPeriodeTekstlig(samling.fom?.verdi, samling.tom?.verdi)})
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <GruppertAnswer label="Informasjon om samlingen">
                    <Answer label="Adresse">{adresse}</Answer>
                    <OppsummeringSvar felt={samling.erObligatorisk} />
                    <OppsummeringSvar felt={samling.antallKilometerEnVei} valuePostfix="km" />
                </GruppertAnswer>
                {samling.reisemåte && <ReisemåteOppsummering reisemåte={samling.reisemåte} />}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.SAMLINGER} />
        </FormSummary>
    );
};

const ReisemåteOppsummering: React.FC<{ reisemåte: Reisemåte }> = ({ reisemåte }) => {
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
            <GruppertAnswer label="Reisemåte">
                <OppsummeringSvar felt={hvilkeTransportmidlerBleBenyttet} />

                {unntakFraOffentligTransport && (
                    <Answer label={unntakFraOffentligTransport?.årsaker?.label || ''}>
                        {unntakFraOffentligTransport?.årsaker?.verdier
                            .map((verdi) => verdi.label)
                            .join(', ')}
                        <br />
                        {unntakFraOffentligTransport?.leveringOgHentingIBarnehage &&
                            'Adresse barnehage: ' + adresseBarnehage}
                    </Answer>
                )}

                <OppsummeringSvar felt={unntakFraPrivatBil} />
            </GruppertAnswer>

            {offentligTransport && (
                <GruppertAnswer label="Offentlig transport">
                    <OppsummeringSvar felt={offentligTransport.totalUtgifterOffentligTransport} />
                </GruppertAnswer>
            )}

            {privatBil && <PrivatBilInfoOppsummering privatBil={privatBil} />}

            {drosje && (
                <GruppertAnswer label="Drosje">
                    <OppsummeringSvar felt={drosje.harTTKort} />
                </GruppertAnswer>
            )}
        </>
    );
};

const PrivatBilInfoOppsummering: React.FC<{ privatBil: PrivatBilInfo }> = ({ privatBil }) => {
    return (
        <GruppertAnswer label="Privat bil">
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
        </GruppertAnswer>
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

import React from 'react';

import { BodyShort, FormSummary } from '@navikt/ds-react';

import { Answer, GruppertAnswer } from '../../../components/Oppsummering/Answer';
import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { Samling } from '../../../typer/søknad';
import { adressefelterTilVisning } from '../../../utils/adresseUtils';
import { formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { PrivatBilInfo, Reisemåte, UtgifterPrivatBil } from '../../typer/reisemåte';

export const SamlingerOppsummering: React.FC<{ samlinger: Samling[] }> = ({ samlinger }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.samlinger_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {samlinger.map((samling, index) => {
                    const adresse = adressefelterTilVisning({
                        gateadresse: samling.adresse?.gateadresse?.verdi,
                        postnummer: samling.adresse?.postnummer?.verdi,
                        poststed: samling.adresse?.poststed?.verdi,
                        land: samling.adresse?.land?.verdi,
                    });

                    return (
                        <GruppertAnswer
                            label={`Reise til samling (${formaterPeriodeTekstlig(samling.fom?.verdi, samling.tom?.verdi)})`}
                            key={samling._id}
                        >
                            <Answer label="Adresse">{adresse}</Answer>
                            <OppsummeringSvar felt={samling.erObligatorisk} />
                            <OppsummeringSvar
                                felt={samling.antallKilometerEnVei}
                                valuePostfix="km"
                            />
                            {samling.reisemåte && (
                                <ReisemåteOppsummering reisemåte={samling.reisemåte} />
                            )}
                        </GruppertAnswer>
                    );
                })}
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

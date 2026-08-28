import { BodyShort, FormSummary } from '@navikt/ds-react';
import type React from 'react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import type { EnumFelt, VerdiFelt } from '../../../typer/skjema';
import type { Samling } from '../../../typer/søknad';
import { adressefelterTilVisning } from '../../../utils/adresseUtils';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

type ValidertSamling = Samling & {
    fom: VerdiFelt<string>;
    tom: VerdiFelt<string>;
    erObligatorisk: EnumFelt<string>;
};

const erValidertSamling = (samling: Samling): samling is ValidertSamling =>
    harVerdi(samling.fom?.verdi) &&
    harVerdi(samling.tom?.verdi) &&
    harVerdi(samling.erObligatorisk?.verdi);

const samlingTilOppsummering = (samling: ValidertSamling): string =>
    `${formaterIsoDato(samling.fom.verdi)} - ${formaterIsoDato(samling.tom.verdi)} (${samling.erObligatorisk.verdi === 'JA' ? 'Obligatorisk' : 'Valgfri'})`;

export const SamlingerOppsummering: React.FC<{ samlinger: Samling[] }> = ({ samlinger }) => {
    const validerteSamlinger = samlinger.filter(erValidertSamling);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.samlinger_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {validerteSamlinger.map((samling, index) => {
                    const adresseVisning = adressefelterTilVisning({
                        gateadresse: samling.adresse?.gateadresse?.verdi,
                        postnummer: samling.adresse?.postnummer?.verdi,
                        poststed: samling.adresse?.poststed?.verdi,
                        land: samling.adresse?.land?.verdi
                    });

                    return (
                        <FormSummary.Answer key={samling._id}>
                            <FormSummary.Label>Samling {index + 1}</FormSummary.Label>
                            <FormSummary.Value>
                                <BodyShort>{samlingTilOppsummering(samling)}</BodyShort>
                                {adresseVisning !== '' && (
                                    <BodyShort>
                                        <LocaleTekst
                                            tekst={oppsummeringTekster.adressen_du_skal_reise_til}
                                        />
                                        : {adresseVisning}
                                    </BodyShort>
                                )}
                                {harVerdi(samling.antallKilometerEnVei?.verdi) && (
                                    <BodyShort>
                                        <LocaleTekst
                                            tekst={oppsummeringTekster.reiseavstand_label}
                                        />
                                        : {samling.antallKilometerEnVei?.verdi} km
                                    </BodyShort>
                                )}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    );
                })}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.SAMLINGER} />
        </FormSummary>
    );
};

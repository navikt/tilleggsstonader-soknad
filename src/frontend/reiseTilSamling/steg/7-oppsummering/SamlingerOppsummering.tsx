import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { Answer, GruppertAnswer } from '../../../components/Oppsummering/Answer';
import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { ReisemåteOppsummering } from '../../../components/Oppsummering/ReisemåteOppsummering';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { Samling } from '../../../typer/søknad';
import { adressefelterTilVisning } from '../../../utils/adresseUtils';
import { formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const SamlingerOppsummering: React.FC<{ samlinger: Samling[] }> = ({ samlinger }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.samlinger_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {samlinger.map((samling) => {
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

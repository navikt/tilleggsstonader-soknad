import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Reiseavstand } from '../../../typer/søknad';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const ReiseavstandOppsummering: React.FC<{ reiseavstand: Reiseavstand }> = ({
    reiseavstand,
}) => {
    const adresse = [
        reiseavstand.aktivitetsadresse.gateadresse?.verdi,
        [
            reiseavstand.aktivitetsadresse.postnummer?.verdi,
            reiseavstand.aktivitetsadresse.poststed?.verdi,
        ]
            .filter((del) => !!del)
            .join(' '),
        reiseavstand.aktivitetsadresse.land?.svarTekst,
    ]
        .filter((del) => !!del)
        .join(', ');

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.reiseavstand_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {reiseavstand.antallKilometerEnVei && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {reiseavstand.antallKilometerEnVei.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {reiseavstand.antallKilometerEnVei.verdi} km
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {adresse && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <LocaleTekst tekst={oppsummeringTekster.adressen_du_skal_reise_til} />
                        </FormSummary.Label>
                        <FormSummary.Value>{adresse}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.REISEAVSTAND} />
        </FormSummary>
    );
};

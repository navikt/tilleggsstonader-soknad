import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { Reiseavstand } from '../../../typer/søknad';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const ReiseavstandOppsummering: React.FC<{ reiseavstand: Reiseavstand }> = ({
    reiseavstand,
}) => {
    const { person } = usePerson();

    const avreiseAdresseVisning =
        reiseavstand.skalReiseFraFolkeregAdr?.verdi === 'JA' && person.strukturertAdresse
            ? [
                  person.strukturertAdresse.adressenavn,
                  [person.strukturertAdresse.postnummer, person.strukturertAdresse.poststed]
                      .filter(Boolean)
                      .join(' '),
              ]
                  .filter(Boolean)
                  .join(', ')
            : [
                  reiseavstand.adresseDuSkalReiseFra?.gateadresse?.verdi,
                  [
                      reiseavstand.adresseDuSkalReiseFra?.postnummer?.verdi,
                      reiseavstand.adresseDuSkalReiseFra?.poststed?.verdi,
                  ]
                      .filter(Boolean)
                      .join(' '),
              ]
                  .filter(Boolean)
                  .join(', ');

    const aktivitetsAdresseVisning = [
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
                {avreiseAdresseVisning && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <LocaleTekst tekst={oppsummeringTekster.adressen_du_skal_reise_fra} />
                        </FormSummary.Label>
                        <FormSummary.Value>{avreiseAdresseVisning}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
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
                {aktivitetsAdresseVisning && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <LocaleTekst tekst={oppsummeringTekster.adressen_du_skal_reise_til} />
                        </FormSummary.Label>
                        <FormSummary.Value>{aktivitetsAdresseVisning}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.REISEAVSTAND} />
        </FormSummary>
    );
};

import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { Reiseavstand } from '../../../typer/søknad';
import { adressefelterTilVisning } from '../../../utils/adresseUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const ReiseavstandOppsummering: React.FC<{ reiseavstand: Reiseavstand }> = ({
    reiseavstand,
}) => {
    const { person } = usePerson();

    const avreiseAdresseVisning = () => {
        if (reiseavstand.skalReiseFraFolkeregAdr?.verdi === 'JA') {
            return person.strukturertAdresse
                ? adressefelterTilVisning(person.strukturertAdresse)
                : person.adresse;
        }

        return adressefelterTilVisning({
            gateadresse: reiseavstand.adresseDuSkalReiseFra?.gateadresse?.verdi,
            postnummer: reiseavstand.adresseDuSkalReiseFra?.postnummer?.verdi,
            poststed: reiseavstand.adresseDuSkalReiseFra?.poststed?.verdi,
            land: reiseavstand.adresseDuSkalReiseFra?.land?.verdi,
        });
    };

    const aktivitetsAdresseVisning = adressefelterTilVisning({
        gateadresse: reiseavstand.aktivitetsadresse.gateadresse?.verdi,
        postnummer: reiseavstand.aktivitetsadresse.postnummer?.verdi,
        poststed: reiseavstand.aktivitetsadresse.poststed?.verdi,
        land: reiseavstand.aktivitetsadresse.land?.verdi,
    });

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
                        <FormSummary.Value>{avreiseAdresseVisning()}</FormSummary.Value>
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

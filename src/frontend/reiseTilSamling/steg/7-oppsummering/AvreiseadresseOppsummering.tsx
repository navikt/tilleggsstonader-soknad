import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { Avreiseadresse } from '../../../typer/søknad';
import { adressefelterTilVisning } from '../../../utils/adresseUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const AvreiseadresseOppsummering: React.FC<{ avreiseadresse: Avreiseadresse }> = ({
    avreiseadresse,
}) => {
    const { person } = usePerson();

    const avreiseAdresseVisning = () => {
        if (avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi === 'JA') {
            return person.strukturertAdresse
                ? adressefelterTilVisning(person.strukturertAdresse)
                : person.adresse;
        }

        return adressefelterTilVisning({
            gateadresse: avreiseadresse.adresseDetSkalReisesFra?.gateadresse?.verdi,
            postnummer: avreiseadresse.adresseDetSkalReisesFra?.postnummer?.verdi,
            poststed: avreiseadresse.adresseDetSkalReisesFra?.poststed?.verdi,
            land: avreiseadresse.adresseDetSkalReisesFra?.land?.verdi,
        });
    };

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.avreiseadresse_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {avreiseAdresseVisning() !== '' && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <LocaleTekst tekst={oppsummeringTekster.adressen_du_skal_reise_fra} />
                        </FormSummary.Label>
                        <FormSummary.Value>{avreiseAdresseVisning()}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.AVREISEADRESSE} />
        </FormSummary>
    );
};

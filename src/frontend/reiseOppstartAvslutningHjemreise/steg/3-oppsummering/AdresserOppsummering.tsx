import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { Answer } from '../../../components/Oppsummering/Answer';
import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { formaterAdresse } from '../../../utils/adresseUtils';
import { formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { RouteTilPath } from '../../routing/routesReiseOppstartAvslutningHjemreise';
import { adresserTekster } from '../../tekster/adresser';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { AdresseReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const AdresserOppsummering: React.FC<{
    adresser: AdresseReiseOppstartAvslutningHjemreise;
}> = ({ adresser }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.adresser_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <OppsummeringSvar felt={adresser.måBoBorteHjemmefra} />
                <Answer label={adresserTekster.dato_flytting.label}>
                    {formaterPeriodeTekstlig(
                        adresser.fomFlyttedato?.verdi,
                        adresser.tomFlyttedato?.verdi
                    )}
                </Answer>
                {adresser.adresseOriginaltBosted && (
                    <Answer label={adresserTekster.original_adresse_tittel}>
                        {formaterAdresse(adresser.adresseOriginaltBosted)}
                    </Answer>
                )}
                {adresser.adresseMidlertidigBosted && (
                    <Answer label={adresserTekster.midlertidig_adresse_tittel}>
                        {formaterAdresse(adresser.adresseMidlertidigBosted)}
                    </Answer>
                )}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.ADRESSER} />
        </FormSummary>
    );
};

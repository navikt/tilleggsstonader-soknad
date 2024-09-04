import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import OppholdOppsummering from './Opphold';
import { flervalgTilKommaStreng } from './utils';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import LocaleTekst from '../../Teksthåndtering/LocaleTekst';

const ArbeidOgOppholdOppsummering: React.FC<{ arbeidOgOpphold: ArbeidOgOpphold }> = ({
    arbeidOgOpphold,
}) => {
    const tekster = fellesOppsummeringTekster.arbeid_og_opphold;
    return (
        <>
            {arbeidOgOpphold.jobberIAnnetLand && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <LocaleTekst tekst={tekster.jobb} />
                    </FormSummary.Label>
                    {arbeidOgOpphold.jobberIAnnetLand.verdi === 'NEI' && (
                        <FormSummary.Value>
                            {arbeidOgOpphold.jobberIAnnetLand.svarTekst}
                        </FormSummary.Value>
                    )}
                    {arbeidOgOpphold.jobbAnnetLand && (
                        <FormSummary.Value>
                            {arbeidOgOpphold.jobbAnnetLand.svarTekst}
                        </FormSummary.Value>
                    )}
                </FormSummary.Answer>
            )}

            {arbeidOgOpphold.harPengestøtteAnnetLand && (
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <LocaleTekst tekst={tekster.pengestøtte} />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {flervalgTilKommaStreng(arbeidOgOpphold.harPengestøtteAnnetLand)}
                    </FormSummary.Value>
                    {arbeidOgOpphold.pengestøtteAnnetLand && (
                        <FormSummary.Value>
                            {arbeidOgOpphold.pengestøtteAnnetLand.svarTekst}
                        </FormSummary.Value>
                    )}
                </FormSummary.Answer>
            )}

            {arbeidOgOpphold.harOppholdUtenforNorgeSiste12mnd && (
                <OppholdOppsummering
                    tittel={tekster.oppholdSiste12mnd}
                    harOppholdSvar={arbeidOgOpphold.harOppholdUtenforNorgeSiste12mnd}
                    opphold={arbeidOgOpphold.oppholdUtenforNorgeSiste12mnd}
                />
            )}

            {arbeidOgOpphold.harOppholdUtenforNorgeNeste12mnd && (
                <OppholdOppsummering
                    tittel={tekster.oppholdNeste12mnd}
                    harOppholdSvar={arbeidOgOpphold.harOppholdUtenforNorgeNeste12mnd}
                    opphold={arbeidOgOpphold.oppholdUtenforNorgeNeste12mnd}
                />
            )}
        </>
    );
};

export default ArbeidOgOppholdOppsummering;

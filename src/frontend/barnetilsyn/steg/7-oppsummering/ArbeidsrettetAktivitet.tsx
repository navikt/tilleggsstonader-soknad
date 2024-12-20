import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormSummary, VStack } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../context/SpråkContext';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { Aktivitet } from '../../../typer/søknad';
import { verdiFelterTilTekstElement } from '../../../utils/tekster';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const ArbeidsrettetAktivitet: React.FC<{ aktivitet?: Aktivitet }> = ({ aktivitet }) => {
    const navigate = useNavigate();
    const { locale } = useSpråk();

    const aktiviteterSomTekstfelt =
        aktivitet &&
        aktivitet.aktiviteter &&
        verdiFelterTilTekstElement(aktivitet.aktiviteter.verdier);

    const aktiviteterLabel = aktivitet?.aktiviteter?.label;
    const annenAktivitetLabel = aktivitet?.annenAktivitet?.label;
    const lønnetAktivitetLabel = aktivitet?.lønnetAktivitet?.label;

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={oppsummeringTekster.arbeidsrettet_aktivitet} />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={() => navigate(RouteTilPath.AKTIVITET)}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <VStack gap={'2'}>
                    {aktiviteterSomTekstfelt && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <LocaleTekst tekst={{ nb: aktiviteterLabel || '' }} />
                            </FormSummary.Label>
                            {aktiviteterSomTekstfelt[locale].map((aktivitet) => (
                                <FormSummary.Value key={aktivitet}>{aktivitet}</FormSummary.Value>
                            ))}
                        </FormSummary.Answer>
                    )}
                    {aktivitet?.annenAktivitet && (
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <LocaleTekst tekst={{ nb: annenAktivitetLabel || '' }} />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {aktivitet?.annenAktivitet?.svarTekst}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <LocaleTekst tekst={{ nb: lønnetAktivitetLabel || '' }} />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {aktivitet?.lønnetAktivitet?.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </VStack>
            </FormSummary.Answers>
        </FormSummary>
    );
};

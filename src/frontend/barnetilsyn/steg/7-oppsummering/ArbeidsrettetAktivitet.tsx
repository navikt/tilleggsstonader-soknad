import React from 'react';

import { FormSummary, VStack } from '@navikt/ds-react';

import { OppsummeringPanelHeader } from '../../../components/Oppsummering/OppsummeringPanelHeader';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../context/SpråkContext';
import { Aktivitet } from '../../../typer/søknad';
import { verdiFelterTilTekstElement } from '../../../utils/tekster';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const ArbeidsrettetAktivitet: React.FC<{ aktivitet?: Aktivitet }> = ({ aktivitet }) => {
    const { locale } = useSpråk();

    const aktiviteterSomTekstfelt =
        aktivitet &&
        aktivitet.aktiviteter &&
        verdiFelterTilTekstElement(aktivitet.aktiviteter.verdier);

    const aktiviteterLabel = aktivitet?.aktiviteter?.label;
    const annenAktivitetLabel = aktivitet?.annenAktivitet?.label;
    const lønnetAktivitetLabel = aktivitet?.lønnetAktivitet?.label;

    return (
        <OppsummeringPanelHeader
            tittel={oppsummeringTekster.arbeidsrettet_aktivitet}
            lenke={RouteTilPath.AKTIVITET}
        >
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
                    <FormSummary.Value>{aktivitet?.lønnetAktivitet?.svarTekst}</FormSummary.Value>
                </FormSummary.Answer>
            </VStack>
        </OppsummeringPanelHeader>
    );
};

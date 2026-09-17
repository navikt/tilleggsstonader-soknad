import React from 'react';

import styled from 'styled-components';

import { BodyShort, InlineMessage, Link, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import {
    AVREISE_GATEADRESSE,
    AVREISE_LAND,
    AVREISE_POSTNUMMER,
    AVREISE_POSTSTED,
    avreiseadresseFolkeregistrertTekst,
    avreiseadresseInfoTekst,
    avreiseadresseLenkeTekst,
    avreiseadresseLenkeUrl,
    avreiseadresseManuellTittel,
    avreiseadresseSpørsmålGraf,
    avreiseadresseTittel,
    avreiseadresseVisningsrekkefølge,
    erAdressemanuell,
    erAvreiseadresseSpørsmålNode,
    rensInaktiveAvreiseadresseSvar,
    SKAL_REISE_FRA_FOLKEREG_ADR,
} from './avreiseadresseSpørsmålGraf';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { renderSpørsmålNode } from '../../../felles/spørsmålsgraf/rendering';
import { useSpørsmålsgrafSteg } from '../../../felles/spørsmålsgraf/useSpørsmålsgrafSteg';
import { Side } from '../../components/Side';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';

const AdresseBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

export const AvreiseadresseReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { avreiseadresse, settAvreiseadresse } = useReiseTilSamlingSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const spørsmålsgrafSteg = useSpørsmålsgrafSteg({
        state: avreiseadresse,
        settState: settAvreiseadresse,
        valideringsKontekst: {},
        røtter: avreiseadresseSpørsmålGraf,
        rensInaktiveSvar: rensInaktiveAvreiseadresseSvar,
        erSpørsmålNode: erAvreiseadresseSpørsmålNode,
        settValideringsfeil,
    });

    const aktiveNoder = spørsmålsgrafSteg.finnAktiveNoderIRekkefølge(
        avreiseadresseVisningsrekkefølge
    );
    const hovedspørsmål = aktiveNoder.find((node) => node.id === SKAL_REISE_FRA_FOLKEREG_ADR);
    const adresseNoder = aktiveNoder.filter((node) =>
        [AVREISE_LAND, AVREISE_GATEADRESSE, AVREISE_POSTNUMMER, AVREISE_POSTSTED].includes(node.id)
    );

    return (
        <Side validerSteg={() => spørsmålsgrafSteg.validerSteg(locale)}>
            <LocaleHeading tekst={avreiseadresseTittel} level="2" size="medium" />
            <VStack gap="space-8">
                <BodyShort spacing>
                    <LocaleTekst
                        tekst={avreiseadresseFolkeregistrertTekst}
                        argument0={person.adresse}
                    />
                </BodyShort>
                <InlineMessage status="info">
                    <BodyShort spacing>
                        {avreiseadresseInfoTekst[locale]}
                        <Link
                            href={avreiseadresseLenkeUrl}
                            target="_blank"
                            inlineText
                            rel="noopener noreferrer"
                        >
                            {avreiseadresseLenkeTekst[locale]}
                        </Link>
                        .
                    </BodyShort>
                </InlineMessage>
                {hovedspørsmål &&
                    renderSpørsmålNode({
                        node: hovedspørsmål,
                        state: avreiseadresse,
                        locale,
                        valideringsfeil,
                        oppdaterState: (oppdatering) =>
                            spørsmålsgrafSteg.oppdaterMedGraf(oppdatering),
                        nullstillFeil: spørsmålsgrafSteg.nullstillFeil,
                    })}
                {erAdressemanuell(spørsmålsgrafSteg.aktiveNoder) && (
                    <VStack gap="space-4" style={{ marginBottom: 'var(--a-spacing-2)' }}>
                        <BodyShort weight="semibold">
                            {avreiseadresseManuellTittel[locale]}
                        </BodyShort>
                        <AdresseBoks>
                            <VStack gap="space-16">
                                {adresseNoder.map((node) =>
                                    renderSpørsmålNode({
                                        node,
                                        state: avreiseadresse,
                                        locale,
                                        valideringsfeil,
                                        oppdaterState: (oppdatering) =>
                                            spørsmålsgrafSteg.oppdaterMedGraf(oppdatering),
                                        nullstillFeil: spørsmålsgrafSteg.nullstillFeil,
                                    })
                                )}
                            </VStack>
                        </AdresseBoks>
                    </VStack>
                )}
            </VStack>
        </Side>
    );
};

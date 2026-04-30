import React, { useState } from 'react';

import { Button, GuidePanel, Heading, Label, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { omdirigerTilFyllut } from '../api/useFyllutRedirect';
import { Container } from '../components/Side';
import { LocaleReadMore } from '../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { SkjematypeFyllUt } from '../typer/stønadstyper';
import { LesMer, TekstElement } from '../typer/tekst';

export interface AvsjekkTekster {
    banner_daglig_reise: TekstElement<string>;
    hvorfor_spør_vi: LesMer<string>;
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
}

interface DagligReiseAvsjekkProps {
    tekster: AvsjekkTekster;
    legend: string;
    description?: string;
    jaBetyrNyLøsning: boolean;
}

type RadioButtonValg = 'JA' | 'NEI';

export const DagligReiseAvsjekk: React.FC<DagligReiseAvsjekkProps> = ({
    tekster,
    legend,
    description,
    jaBetyrNyLøsning,
}) => {
    const [svar, setSvar] = useState<RadioButtonValg | undefined>(undefined);
    const [feilmeldingRadio, settFeilmeldingRadio] = useState('');

    const handleChange = (value: RadioButtonValg) => {
        setSvar(value);
        settFeilmeldingRadio('');
    };

    async function startSøknad() {
        if (!svar) {
            settFeilmeldingRadio('Du må velge et av alternativene');
            return;
        }
        const jaVersjon = jaBetyrNyLøsning ? 'NY' : 'GAMMEL';
        const neiVersjon = jaBetyrNyLøsning ? 'GAMMEL' : 'NY';
        await omdirigerTilFyllut(
            SkjematypeFyllUt.SØKNAD_DAGLIG_REISE,
            svar === 'JA' ? jaVersjon : neiVersjon
        );
    }

    return (
        <Container>
            <VStack gap="space-8">
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={tekster.banner_daglig_reise} />
                </Heading>
            </VStack>
            <GuidePanel poster>
                <Label>
                    <LocaleTekst tekst={tekster.veileder_tittel} />
                </Label>
                <LocaleTekstAvsnitt tekst={tekster.veileder_innhold} />
            </GuidePanel>
            <div>
                <RadioGroup
                    legend={legend}
                    description={description}
                    onChange={handleChange}
                    error={feilmeldingRadio}
                >
                    <Radio value={'JA'} key={'JA'}>
                        Ja
                    </Radio>
                    <Radio value={'NEI'} key={'NEI'}>
                        Nei
                    </Radio>
                </RadioGroup>
                <LocaleReadMore tekst={tekster.hvorfor_spør_vi} />
            </div>
            <Button onClick={startSøknad} variant="primary">
                Start
            </Button>
        </Container>
    );
};

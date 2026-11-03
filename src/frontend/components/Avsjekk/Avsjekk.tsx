import React, { useState } from 'react';

import {
    Button,
    GuidePanel,
    Heading,
    Label,
    Radio,
    RadioGroup,
    ReadMore,
    VStack,
} from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { LesMer, TekstElement } from '../../typer/tekst';
import { Container } from '../Side';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../Teksthåndtering/LocaleTekstAvsnitt';

export interface AvsjekkTekster {
    banner: TekstElement<string>;
    hvorfor_spør_vi: LesMer<string[]>;
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
}

interface AvsjekkProps {
    tekster: AvsjekkTekster;
    legend: string;
    description?: string;
    onJa: () => void | Promise<void>;
    onNei: () => void | Promise<void>;
}

type RadioButtonValg = 'JA' | 'NEI';

export const Avsjekk: React.FC<AvsjekkProps> = ({ tekster, legend, description, onJa, onNei }) => {
    const { locale } = useSpråk();
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
        if (svar === 'JA') {
            await onJa();
        } else {
            await onNei();
        }
    }

    return (
        <Container>
            <VStack gap="space-8">
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={tekster.banner} />
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
                <ReadMore header={tekster.hvorfor_spør_vi.header[locale]}>
                    <LocaleTekstAvsnitt tekst={tekster.hvorfor_spør_vi.innhold} />
                </ReadMore>
            </div>
            <Button onClick={startSøknad} variant="primary">
                Start
            </Button>
        </Container>
    );
};

import React, { useState } from 'react';

import { Button, GuidePanel, Heading, Label, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { taxiAvsjekkTekster } from './taxiAvsjekkTekster';
import { omdirigerTilFyllut } from '../api/useFyllutRedirect';
import { Container } from '../components/Side';
import { LocaleReadMore } from '../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

type RadioButtonValg = 'JA' | 'NEI';

export const SkalBrukeTaxiAvsjekk: React.FC = () => {
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
        await omdirigerTilFyllut(
            SkjematypeFyllUt.SØKNAD_DAGLIG_REISE,
            svar === 'JA' ? 'GAMMEL' : 'NY'
        );
    }

    return (
        <Container>
            <VStack gap="space-8">
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={taxiAvsjekkTekster.banner_daglig_reise} />
                </Heading>
            </VStack>
            <GuidePanel poster>
                <Label>
                    <LocaleTekst tekst={taxiAvsjekkTekster.veileder_tittel} />
                </Label>
                <LocaleTekstAvsnitt tekst={taxiAvsjekkTekster.veileder_innhold} />
            </GuidePanel>
            <div>
                <RadioGroup
                    legend={'Skal du reise med taxi?'}
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
                <LocaleReadMore tekst={taxiAvsjekkTekster.hvorfor_spør_vi} />
            </div>
            <Button onClick={startSøknad} variant="primary">
                Start
            </Button>
        </Container>
    );
};

import React, { useState } from 'react';

import { Button, GuidePanel, Heading, Label, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { dagligReiseTekster } from './tekster';
import { Container } from '../components/Side';
import { sendBrukerTilFyllUtSøknad } from '../components/SkjemaRouting/sendSøkerTilFyllUtSøknad';
import { LocaleReadMore } from '../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

type RadioButtonValg = 'JA' | 'NEI';

export const KanBrukeOffentligTransportAvsjekk: React.FC = () => {
    const [svar, setSvar] = useState<RadioButtonValg | undefined>(undefined);
    const [feilmeldingRadio, settFeilmeldingRadio] = useState('');

    const handleChange = (value: RadioButtonValg) => {
        setSvar(value);
        settFeilmeldingRadio('');
    };

    function startSøknad() {
        if (!svar) {
            settFeilmeldingRadio('Du må velge et av alternativene');
            return;
        }
        sendBrukerTilFyllUtSøknad(
            SkjematypeFyllUt.SØKNAD_DAGLIG_REISE,
            svar === 'JA' ? 'NY' : 'GAMMEL'
        );
    }

    return (
        <Container>
            <VStack gap="2">
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={dagligReiseTekster.banner_daglig_reise} />
                </Heading>
            </VStack>
            <GuidePanel poster>
                <Label>
                    <LocaleTekst tekst={dagligReiseTekster.veileder_tittel} />
                </Label>
                <LocaleTekstAvsnitt tekst={dagligReiseTekster.veileder_innhold} />
            </GuidePanel>
            <div>
                <RadioGroup
                    legend={'Kan du reise med offentlig transport hele veien?'}
                    description={
                        'Med offentlig transport menes buss, tog, trikk, t-bane, ferge og lignende.'
                    }
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
                <LocaleReadMore tekst={dagligReiseTekster.hvorfor_spør_vi} />
            </div>
            <Button onClick={startSøknad} variant="primary">
                Start
            </Button>
        </Container>
    );
};

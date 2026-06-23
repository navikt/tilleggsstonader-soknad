import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, GuidePanel, Heading, Label, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { omdirigerTilFyllut } from '../api/useFyllutRedirect';
import { Container } from '../components/Side';
import { LocaleReadMore } from '../components/Teksthåndtering/LocaleReadMore';
import { LocaleTekst } from '../components/Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { SkjematypeFyllUt } from '../typer/skjematype';
import { RouteTilPath } from './routing/routesReiseTilSamling';
import { taxiReiseTilSamlingAvsjekkTekster } from './taxiReiseTilSamlingAvsjekkTekster';

type RadioButtonValg = 'JA' | 'NEI';

export const SkalBrukeTaxiReiseTilSamlingAvsjekk: React.FC = () => {
    const navigate = useNavigate();
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
            await omdirigerTilFyllut(SkjematypeFyllUt.SØKNAD_REISE_TIL_SAMLING, 'GAMMEL');
        } else {
            navigate(RouteTilPath.INTRO);
        }
    }

    const tekster = taxiReiseTilSamlingAvsjekkTekster;

    return (
        <Container>
            <VStack gap="space-8">
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={tekster.banner_tittel} />
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
                <LocaleReadMore tekst={tekster.hvorfor_spør_vi} />
            </div>
            <Button onClick={startSøknad} variant="primary">
                Start
            </Button>
        </Container>
    );
};

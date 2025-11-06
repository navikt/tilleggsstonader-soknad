import React, { useState } from 'react';

import { Button, GuidePanel, Label, Radio, RadioGroup } from '@navikt/ds-react';

import { dagligReiseTekster } from './tekster';
import Environment from '../api/Environment';
import { Container } from '../components/Side';
import { LocaleReadMore } from '../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

type RadioButtonValg = 'JA' | 'NEI';

const Forside: React.FC = () => {
    const env = Environment();
    const [svar, setSvar] = useState<RadioButtonValg | undefined>(undefined);
    const [feilmeldingRadio, settFeilmeldingRadio] = useState('');

    const handleChange = (value: RadioButtonValg) => {
        setSvar(value);
        settFeilmeldingRadio('');
    };

    const startSøknad = () => {
        if (!svar) {
            settFeilmeldingRadio('Du må velge et av alternativene');
            return;
        }
        if (svar === 'JA') {
            window.location.replace(env.urlNyFyllUtSøknad(SkjematypeFyllUt.SØKNAD_DAGLIG_REISE));
        } else {
            window.location.replace(env.urlGammelSøknad(SkjematypeFyllUt.SØKNAD_DAGLIG_REISE));
        }
    };

    return (
        <Container>
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

export default Forside;

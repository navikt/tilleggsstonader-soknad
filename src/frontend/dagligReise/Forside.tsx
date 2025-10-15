import React, { useState } from 'react';

import { Button, GuidePanel, Label, Radio, RadioGroup } from '@navikt/ds-react';

import { dagligReiseTekster } from './tekster';
import { loggSkjemaStartet } from '../api/analytics';
import Environment from '../api/Environment';
import { Container } from '../components/Side';
import { LocaleReadMore } from '../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { SkjematypeFyllUt, Stønadstype } from '../typer/stønadstyper';

type RadioButtonValg = {
    valg: 'JA' | 'NEI' | 'KOMBO';
};

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
        loggSkjemaStartet(Stønadstype.BARNETILSYN);
        if (svar.valg === 'JA') {
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
                    legend={'Kan du reise med offentlig transport?'}
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
                    <Radio value={'KOMBO'} key={'KOMBO'}>
                        Jeg må kombinere offentlig transport med kjøring av egen bil
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

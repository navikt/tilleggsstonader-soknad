import { useState } from 'react';

import { styled } from 'styled-components';

import { Heading } from '@navikt/ds-react';
import { AGray50 } from '@navikt/ds-tokens/dist/tokens';

import { AnnenYtelse, erYtelse, Ytelse } from './typer';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleReadMore from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSøknad } from '../../../context/SøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const GråBoks = styled.div`
    background-color: ${AGray50};
    padding: 2rem 1rem;
`;
const Hovedytelse = () => {
    const { hovedytelse, settHovedytelse } = useSøknad();

    const [ytelse, settYtelse] = useState<Ytelse | undefined>(
        hovedytelse && (erYtelse(hovedytelse.ytelse) ? hovedytelse.ytelse : 'annet')
    );
    const [ytelseFeil, settYtelseFeil] = useState('');

    const [annenYtelse, settAnnenYtelse] = useState<AnnenYtelse | undefined>(
        hovedytelse && !erYtelse(hovedytelse.ytelse) ? hovedytelse.ytelse : undefined
    );
    const [annenYtelseFeil, settAnnenYtelseFeil] = useState('');

    const kanFortsette = (ytelse?: Ytelse, annenYtelse?: AnnenYtelse): boolean => {
        let kanFortsette = true;

        if (ytelse === undefined) {
            kanFortsette = false;
            settYtelseFeil('Du må velge et alternativ');
        } else {
            settYtelseFeil('');
        }

        if (ytelse === 'annet' && annenYtelse === undefined) {
            kanFortsette = false;
            settAnnenYtelseFeil('Du må velge et alternativ');
        } else {
            settAnnenYtelseFeil('');
        }

        return kanFortsette;
    };

    return (
        <Side
            stønadstype={Stønadstype.barnetilsyn}
            stegtittel={hovedytelseInnhold.steg_tittel}
            validerSteg={() => kanFortsette(ytelse, annenYtelse)}
            oppdaterSøknad={() => {
                if (ytelse && ytelse !== 'annet') {
                    settHovedytelse({ ytelse: ytelse });
                } else if (annenYtelse) {
                    settHovedytelse({ ytelse: annenYtelse });
                }
            }}
        >
            <Heading size="medium">
                <LocaleTekst tekst={hovedytelseInnhold.innhold_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={hovedytelseInnhold.guide_innhold} />
            </PellePanel>
            <LocaleRadioGroup
                tekst={hovedytelseInnhold.radio_hovedytelse}
                value={ytelse || ''}
                onChange={(verdi) => {
                    settYtelse(verdi);
                    settYtelseFeil('');
                    settAnnenYtelseFeil('');
                    settAnnenYtelse(undefined);
                }}
                error={ytelseFeil}
            >
                <LocaleReadMore tekst={hovedytelseInnhold.flere_alternativer_lesmer} />
            </LocaleRadioGroup>
            {ytelse === 'annet' && (
                <GråBoks>
                    <LocaleRadioGroup
                        tekst={hovedytelseInnhold.radio_annen_ytelse}
                        value={annenYtelse || ''}
                        onChange={(verdi) => {
                            settAnnenYtelse(verdi);
                            settAnnenYtelseFeil('');
                        }}
                        error={annenYtelseFeil}
                    />
                </GråBoks>
            )}
        </Side>
    );
};

export default Hovedytelse;

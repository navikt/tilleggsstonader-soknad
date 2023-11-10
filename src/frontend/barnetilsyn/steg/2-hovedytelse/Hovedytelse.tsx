import { useState } from 'react';

import { styled } from 'styled-components';

import { Heading } from '@navikt/ds-react';
import { AGray50 } from '@navikt/ds-tokens/dist/tokens';

import { AnnenYtelse, erAnnenYtelse, erYtelse, erYtelseEllerAnnet, YtelseOgAnnet } from './typer';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSøknad } from '../../../context/SøknadContext';
import { EnumFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const GråBoks = styled.div`
    background-color: ${AGray50};
    padding: 2rem 1rem;
`;

const annetState: EnumFelt<YtelseOgAnnet> = {
    label: '',
    svarTekst: '',
    verdi: 'ANNET',
    alternativer: [],
};
const Hovedytelse = () => {
    const { hovedytelse, settHovedytelse } = useSøknad();

    const [ytelse, settYtelse] = useState<EnumFelt<YtelseOgAnnet> | undefined>(
        hovedytelse && (erYtelseEllerAnnet(hovedytelse.ytelse) ? hovedytelse.ytelse : annetState)
    );
    const [ytelseFeil, settYtelseFeil] = useState('');

    const [annenYtelse, settAnnenYtelse] = useState<EnumFelt<AnnenYtelse> | undefined>(
        hovedytelse && erAnnenYtelse(hovedytelse.ytelse) ? hovedytelse.ytelse : undefined
    );
    const [annenYtelseFeil, settAnnenYtelseFeil] = useState('');

    const kanFortsette = (
        ytelse?: EnumFelt<YtelseOgAnnet>,
        annenYtelse?: EnumFelt<AnnenYtelse>
    ): boolean => {
        let kanFortsette = true;

        if (ytelse === undefined) {
            kanFortsette = false;
            settYtelseFeil('Du må velge et alternativ');
        } else {
            settYtelseFeil('');
        }

        if (ytelse?.verdi === 'ANNET' && annenYtelse === undefined) {
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
                if (ytelse && erYtelse(ytelse)) {
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
                value={ytelse?.verdi || ''}
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
            {ytelse?.verdi === 'ANNET' && (
                <GråBoks>
                    <LocaleRadioGroup
                        tekst={hovedytelseInnhold.radio_annen_ytelse}
                        value={annenYtelse?.verdi || ''}
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

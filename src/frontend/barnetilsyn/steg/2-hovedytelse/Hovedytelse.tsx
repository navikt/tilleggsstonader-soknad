import { useState } from 'react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleReadMore from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSøknad } from '../../../context/SøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

export type Ytelse = 'aap' | 'overgangsstønad' | 'gjenlevendepensjon' | 'annet';
export type AnnenYtelse =
    | 'dagpenger'
    | 'tiltakspenger'
    | 'kvalifikasjonsprogrammet'
    | 'introduksjonsprogrammet'
    | 'sykepenger'
    | 'uføretrygd'
    | 'ingen_pengestøtte';

const Hovedytelse = () => {
    const { settHovedytelse } = useSøknad();

    const [ytelse, settYtelse] = useState<Ytelse>();
    const [ytelseFeil, settYtelseFeil] = useState('');

    const [annenYtelse, settAnnenYtelse] = useState<AnnenYtelse>();
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
            <PellePanel>
                <LocaleTekst tekst={hovedytelseInnhold.guide_innhold} />
            </PellePanel>
            <LocaleRadioGroup
                tekst={hovedytelseInnhold.radio_hovedytelse}
                value={ytelse}
                onChange={(verdi) => {
                    settYtelse(verdi);
                    settAnnenYtelse(undefined);
                }}
                error={ytelseFeil}
            >
                <LocaleReadMore tekst={hovedytelseInnhold.flere_alternativer_lesmer} />
            </LocaleRadioGroup>
            {ytelse === 'annet' && (
                <LocaleRadioGroup
                    tekst={hovedytelseInnhold.radio_annen_ytelse}
                    value={annenYtelse}
                    onChange={(verdi) => settAnnenYtelse(verdi)}
                    error={annenYtelseFeil}
                />
            )}
        </Side>
    );
};

export default Hovedytelse;

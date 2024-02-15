import { useState } from 'react';

import { Heading } from '@navikt/ds-react';

import { Ytelse } from './typer';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleCheckboxGroup from '../../../components/Teksthåndtering/LocaleCheckboxGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSøknad } from '../../../context/SøknadContext';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const Hovedytelse = () => {
    const { hovedytelse, settHovedytelse } = useSøknad();

    const [ytelse, settYtelse] = useState<EnumFlereValgFelt<Ytelse> | undefined>(
        hovedytelse && hovedytelse.ytelse
    );

    const [ytelseFeil, settYtelseFeil] = useState('');

    const kanFortsette = (ytelse?: EnumFlereValgFelt<Ytelse>): boolean => {
        let kanFortsette = true;

        if (ytelse === undefined || ytelse.verdier.length === 0) {
            kanFortsette = false;
            settYtelseFeil('Du må velge et alternativ');
        } else {
            settYtelseFeil('');
        }

        return kanFortsette;
    };

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            stegtittel={hovedytelseInnhold.steg_tittel}
            validerSteg={() => kanFortsette(ytelse)}
            oppdaterSøknad={() => {
                if (ytelse !== undefined) {
                    settHovedytelse({ ytelse: ytelse });
                }
            }}
        >
            <Heading size="medium">
                <LocaleTekst tekst={hovedytelseInnhold.innhold_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={hovedytelseInnhold.guide_innhold} />
            </PellePanel>
            <LocaleCheckboxGroup
                tekst={hovedytelseInnhold.checkbox_hovedytelse}
                value={ytelse ? ytelse.verdier : []}
                onChange={(verdi) => {
                    settYtelse(verdi);
                    settYtelseFeil('');
                }}
                error={ytelseFeil}
            />
        </Side>
    );
};

export default Hovedytelse;

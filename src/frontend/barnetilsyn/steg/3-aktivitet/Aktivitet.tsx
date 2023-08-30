import { useState } from 'react';

import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSøknad } from '../../../context/SøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { aktivitet, settAktivitet } = useSøknad();
    const [barnepassPgaUtdanning, settBarnepassPgaUtdanning] = useState<JaNei | undefined>(
        aktivitet ? aktivitet.barnepassPgaUtdanning : undefined
    );
    const [feil, settFeil] = useState('');

    const kanFortsette = (barnepassPgaUtdanning?: JaNei): boolean => {
        let kanFortsette = true;

        if (barnepassPgaUtdanning === undefined) {
            kanFortsette = false;
            settFeil('Du må velge et alternativ');
        }

        return kanFortsette;
    };

    return (
        <Side
            stegtittel={aktivitetTekster.steg_tittel}
            stønadstype={Stønadstype.barnetilsyn}
            validerSteg={() => kanFortsette(barnepassPgaUtdanning)}
            oppdaterSøknad={() => {
                if (barnepassPgaUtdanning !== undefined) {
                    settAktivitet({ barnepassPgaUtdanning: barnepassPgaUtdanning });
                }
            }}
        >
            <LocaleRadioGroup
                tekst={aktivitetTekster.radio_utdanning}
                value={barnepassPgaUtdanning || ''}
                onChange={(verdi) => settBarnepassPgaUtdanning(verdi)}
                error={feil}
            />
        </Side>
    );
};
export default Aktivitet;

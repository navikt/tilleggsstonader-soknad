import React, { useState } from 'react';

import { BodyShort, Heading } from '@navikt/ds-react';

import UtadnningTiltak from './UtdanningTiltak';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleReadMore from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSøknad } from '../../../context/SøknadContext';
import { useTiltak } from '../../../hooks/useTiltak';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { aktivitet, settAktivitet } = useSøknad();

    const { tiltak } = useTiltak();

    const [barnepassPgaUtdanning, settBarnepassPgaUtdanning] = useState<JaNei | undefined>(
        aktivitet ? aktivitet.barnepassPgaUtdanning : undefined
    );
    const [feil, settFeil] = useState('');

    const kanFortsette = (barnepassPgaUtdanning?: JaNei): boolean => {
        if (barnepassPgaUtdanning === undefined) {
            settFeil('Du må velge et alternativ');
            return false;
        }

        return true;
    };

    const oppdaterAktivitetISøknad = () => {
        if (barnepassPgaUtdanning !== undefined) {
            settAktivitet({ barnepassPgaUtdanning: barnepassPgaUtdanning });
        }
    };
    return (
        <Side
            stegtittel={aktivitetTekster.steg_tittel}
            stønadstype={Stønadstype.barnetilsyn}
            validerSteg={() => kanFortsette(barnepassPgaUtdanning)}
            oppdaterSøknad={oppdaterAktivitetISøknad}
        >
            {tiltak.type === 'utdanning' && (
                <>
                    <Heading size={'medium'}>
                        <LocaleTekst tekst={aktivitetTekster.innhold_tittel_utdanning} />
                    </Heading>
                    <BodyShort>
                        <LocaleTekst tekst={aktivitetTekster.innhold_utdanning} />
                    </BodyShort>
                    <UtadnningTiltak tiltak={tiltak} />
                    <LocaleReadMore tekst={aktivitetTekster.noe_feil_utdanning_lesmer} />
                    <LocaleRadioGroup
                        tekst={aktivitetTekster.radio_utdanning}
                        value={barnepassPgaUtdanning || ''}
                        onChange={(verdi) => {
                            settBarnepassPgaUtdanning(verdi);
                            settFeil('');
                        }}
                        error={feil}
                    />
                </>
            )}
        </Side>
    );
};
export default Aktivitet;

import React, { useState } from 'react';

import { Alert, Heading } from '@navikt/ds-react';

import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSøknad } from '../../../context/SøknadContext';
import { EnumFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { aktivitet, settAktivitet } = useSøknad();

    const [utdanning, settUtdanning] = useState<EnumFelt<JaNei> | undefined>(
        aktivitet ? aktivitet.utdanning : undefined
    );
    const [feil, settFeil] = useState('');

    const [fortsattSøke, settFortsattSøke] = useState<JaNei | undefined>(
        aktivitet && aktivitet.utdanning.verdi === 'NEI' ? 'JA' : undefined
    );
    const [fortsattSøkeFeil, settFortsattSøkeFeil] = useState('');

    const kanFortsette = (barnepassPgaUtdanning?: JaNei): boolean => {
        if (barnepassPgaUtdanning === undefined) {
            settFeil('Du må velge et alternativ');
            return false;
        }

        if (barnepassPgaUtdanning === 'NEI' && fortsattSøke !== 'JA') {
            settFortsattSøkeFeil('Du må velge et alternativ');
            return false;
        }

        return true;
    };

    const oppdaterAktivitetISøknad = () => {
        if (utdanning !== undefined) {
            settAktivitet({ utdanning: utdanning });
        }
    };

    return (
        <Side
            stegtittel={aktivitetTekster.steg_tittel}
            stønadstype={Stønadstype.BARNETILSYN}
            validerSteg={() => kanFortsette(utdanning?.verdi)}
            oppdaterSøknad={oppdaterAktivitetISøknad}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={aktivitetTekster.innhold_tittel} />
            </Heading>
            <LocaleRadioGroup
                tekst={aktivitetTekster.radio_utdanning}
                value={utdanning?.verdi || ''}
                onChange={(verdi) => {
                    settUtdanning(verdi);
                    settFortsattSøke(undefined);
                    settFeil('');
                    settFortsattSøkeFeil('');
                }}
                error={feil}
            />
            {utdanning?.verdi === 'NEI' && (
                <>
                    <Alert variant={'info'}>
                        <LocaleTekstAvsnitt tekst={aktivitetTekster.feil_utdanning_infoalert} />
                    </Alert>
                    <LocaleRadioGroup
                        tekst={aktivitetTekster.radio_fortsatt_søke}
                        value={fortsattSøke || ''}
                        onChange={(verdi) => {
                            settFortsattSøke(verdi.verdi);
                            settFortsattSøkeFeil('');
                        }}
                        error={fortsattSøkeFeil}
                    />
                </>
            )}
        </Side>
    );
};
export default Aktivitet;

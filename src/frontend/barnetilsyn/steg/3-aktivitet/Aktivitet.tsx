import React, { useState } from 'react';

import { Alert, BodyShort, Heading } from '@navikt/ds-react';

import UtdanningTiltak from './UtdanningTiltak';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSøknad } from '../../../context/SøknadContext';
import { useTiltak } from '../../../hooks/useTiltak';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { aktivitet, settAktivitet } = useSøknad();

    const { tiltak } = useTiltak();

    const [utdanning, settUtdanning] = useState<JaNei | undefined>(
        aktivitet ? aktivitet.utdanning : undefined
    );
    const [feil, settFeil] = useState('');

    const [fortsattSøke, settFortsattSøke] = useState<JaNei | undefined>(
        aktivitet && aktivitet.utdanning === 'nei' ? 'ja' : undefined
    );
    const [fortsattSøkeFeil, settFortsattSøkeFeil] = useState('');

    const kanFortsette = (barnepassPgaUtdanning?: JaNei): boolean => {
        if (barnepassPgaUtdanning === undefined) {
            settFeil('Du må velge et alternativ');
            return false;
        }

        if (barnepassPgaUtdanning === 'nei' && fortsattSøke !== 'ja') {
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
            stønadstype={Stønadstype.barnetilsyn}
            validerSteg={() => kanFortsette(utdanning)}
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
                    <UtdanningTiltak tiltak={tiltak} />
                    <LocaleReadMore tekst={aktivitetTekster.noe_feil_utdanning_lesmer} />
                    <LocaleRadioGroup
                        tekst={aktivitetTekster.radio_utdanning}
                        value={utdanning || ''}
                        onChange={(verdi) => {
                            settUtdanning(verdi);
                            settFortsattSøke(undefined);
                            settFeil('');
                            settFortsattSøkeFeil('');
                        }}
                        error={feil}
                    />
                    {utdanning === 'nei' && (
                        <>
                            <Alert variant={'info'}>
                                <LocaleTekstAvsnitt
                                    tekst={aktivitetTekster.feil_utdanning_infoalert}
                                />
                            </Alert>
                            <LocaleRadioGroup
                                tekst={aktivitetTekster.radio_fortsatt_søke}
                                value={fortsattSøke || ''}
                                onChange={(verdi) => {
                                    settFortsattSøke(verdi);
                                    settFortsattSøkeFeil('');
                                }}
                                error={fortsattSøkeFeil}
                            />
                        </>
                    )}
                </>
            )}
        </Side>
    );
};
export default Aktivitet;

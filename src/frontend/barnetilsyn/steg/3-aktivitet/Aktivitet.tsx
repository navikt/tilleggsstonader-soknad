import React, { useState } from 'react';

import { Alert, Heading } from '@navikt/ds-react';

import { SøkerStøtteFra } from './SøkerStøtteFra';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSøknad } from '../../../context/SøknadContext';
import { EnumFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { JaNei } from '../../../typer/søknad';
import { TekstElement } from '../../../typer/tekst';
import { manglerVerdi } from '../../../utils/typer';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    const { aktivitet, settAktivitet } = useSøknad();

    const [utdanning, settUtdanning] = useState<EnumFelt<JaNei> | undefined>(
        aktivitet ? aktivitet.utdanning : undefined
    );

    const [søkerFraDato, settSøkerFraDato] = useState<string | undefined>();

    const [feil, settFeil] = useState('');

    const [søkerFraDatoFeil, settSøkerFraDatoFeil] = useState<TekstElement<string> | undefined>();

    const kanFortsette = (barnepassPgaUtdanning?: JaNei): boolean => {
        if (barnepassPgaUtdanning === undefined) {
            settFeil('Du må velge et alternativ');
            return false;
        }

        if (manglerVerdi(søkerFraDato)) {
            settSøkerFraDatoFeil(aktivitetTekster.søker_fra_dato_feilmelding);
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
            stønadstype={Stønadstype.BARNETILSYN}
            validerSteg={() => kanFortsette(utdanning?.verdi)}
            oppdaterSøknad={oppdaterAktivitetISøknad}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={aktivitetTekster.steg_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={aktivitetTekster.guide_innhold} />
            </PellePanel>
            <LocaleRadioGroup
                tekst={aktivitetTekster.radio_utdanning}
                value={utdanning?.verdi || ''}
                onChange={(verdi) => {
                    settUtdanning(verdi);
                    settFeil('');
                }}
                error={feil}
            >
                <LocaleReadMore tekst={aktivitetTekster.radio_utdanning_lesmer} />
            </LocaleRadioGroup>
            {utdanning?.verdi === 'NEI' && (
                <Alert variant={'info'}>
                    <Heading size="small">
                        <LocaleTekst tekst={aktivitetTekster.feil_utdanning_infoalert_title} />
                    </Heading>
                    <LocaleTekstAvsnitt tekst={aktivitetTekster.feil_utdanning_infoalert_innhold} />
                </Alert>
            )}
            <SøkerStøtteFra
                oppdaterSøkerFraDato={(nySøkerFraDato?: string) => settSøkerFraDato(nySøkerFraDato)}
                søkerFraDato={søkerFraDato}
                valideringsfeil={søkerFraDatoFeil}
                resettFeilmelding={() => settSøkerFraDatoFeil(undefined)}
            />
        </Side>
    );
};
export default Aktivitet;

import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt } from '../../../typer/skjema';
import { Radiogruppe } from '../../../typer/tekst';
import { Feilmelding } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    tekst: Radiogruppe<AnnenAktivitetType>;
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    oppdaterAnnenAktivitet: (verdi: EnumFelt<AnnenAktivitetType>) => void;
    feilmelding: Feilmelding | undefined;
}

export const AnnenArbeidsrettetAktivitet: React.FC<Props> = ({
    tekst,
    annenAktivitet,
    oppdaterAnnenAktivitet,
    feilmelding,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={tekst}
                onChange={oppdaterAnnenAktivitet}
                value={annenAktivitet?.verdi || []}
                error={feilmelding?.melding}
            ></LocaleRadioGroup>
            <LocaleReadMoreMedLenke tekst={aktivitetTekster.radio_annet_lesmer} />
        </div>
    );
};

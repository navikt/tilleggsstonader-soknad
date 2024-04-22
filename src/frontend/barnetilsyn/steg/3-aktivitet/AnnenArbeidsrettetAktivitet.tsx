import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt } from '../../../typer/skjema';
import { Radiogruppe } from '../../../typer/tekst';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    tekst: Radiogruppe<AnnenAktivitetType>;
    annenTypeArbeidsrettetAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    setAnnenTypeArbeidsrettetAktivitet: (verdier: EnumFelt<AnnenAktivitetType>) => void;
}

export const AnnenArbeidsrettetAktivitet: React.FC<Props> = ({
    tekst,
    setAnnenTypeArbeidsrettetAktivitet,
    annenTypeArbeidsrettetAktivitet,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                tekst={tekst}
                onChange={setAnnenTypeArbeidsrettetAktivitet}
                value={annenTypeArbeidsrettetAktivitet?.verdi || []}
            ></LocaleRadioGroup>
            <LocaleReadMoreMedLenke tekst={aktivitetTekster.radio_annet_lesmer} />
        </div>
    );
};

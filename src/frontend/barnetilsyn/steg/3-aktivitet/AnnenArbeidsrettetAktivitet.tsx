import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt } from '../../../typer/skjema';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    annenTypeArbeidsrettetAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    setAnnenTypeArbeidsrettetAktivitet: (verdier: EnumFelt<AnnenAktivitetType>) => void;
}

export const AnnenArbeidsrettetAktivitet: React.FC<Props> = ({
    setAnnenTypeArbeidsrettetAktivitet,
    annenTypeArbeidsrettetAktivitet,
}) => {
    return (
        <UnderspørsmålContainer>
            <LocaleRadioGroup
                tekst={aktivitetTekster.radio_annet}
                onChange={setAnnenTypeArbeidsrettetAktivitet}
                value={annenTypeArbeidsrettetAktivitet?.verdi || []}
            ></LocaleRadioGroup>
            <LocaleReadMoreMedLenke tekst={aktivitetTekster.radio_annet_lesmer} />
        </UnderspørsmålContainer>
    );
};

import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt } from '../../../typer/skjema';
import { Valideringsfeil } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    annenTypeArbeidsrettetAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    setAnnenTypeArbeidsrettetAktivitet: (verdier: EnumFelt<AnnenAktivitetType>) => void;
    valideringsfeil: Valideringsfeil;
}

export const AnnenArbeidsrettetAktivitet: React.FC<Props> = ({
    setAnnenTypeArbeidsrettetAktivitet,
    annenTypeArbeidsrettetAktivitet,
    valideringsfeil,
}) => {
    return (
        <UnderspørsmålContainer>
            <LocaleRadioGroup
                tekst={aktivitetTekster.radio_annet}
                onChange={setAnnenTypeArbeidsrettetAktivitet}
                value={annenTypeArbeidsrettetAktivitet?.verdi || []}
                error={valideringsfeil.barnepassPgaUtdanning?.melding}
            ></LocaleRadioGroup>
            <LocaleReadMore tekst={aktivitetTekster.radio_annet_lesmer} />
        </UnderspørsmålContainer>
    );
};

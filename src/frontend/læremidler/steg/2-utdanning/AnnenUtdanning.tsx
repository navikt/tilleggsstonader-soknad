import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { EnumFelt } from '../../../typer/skjema';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';
import { AnnenUtdanningType } from '../../typer/søknad';

interface Props {
    annenUtdanning: EnumFelt<AnnenUtdanningType> | undefined;
    oppdaterAnnenAktivitet: (verdi: EnumFelt<AnnenUtdanningType>) => void;
    feilmelding: Feilmelding | undefined;
}

export const AnnenUtdanning: React.FC<Props> = ({
    annenUtdanning,
    oppdaterAnnenAktivitet,
    feilmelding,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={utdanningTekster.radio_annen_utdanning}
                onChange={oppdaterAnnenAktivitet}
                value={annenUtdanning?.verdi || []}
                error={feilmelding?.melding}
            />
        </div>
    );
};

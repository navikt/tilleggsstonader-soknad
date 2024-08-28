import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    harFunksjonsnedsettelse: EnumFelt<JaNei> | undefined;
    oppdaterHarFunksjonsnedsettelse: (verdi: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
}

export const HarFunksjonsnedsettelse: React.FC<Props> = ({
    harFunksjonsnedsettelse,
    oppdaterHarFunksjonsnedsettelse,
    feilmelding,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={utdanningTekster.radio_mottar_har_funksjonsnedsettelse}
                onChange={oppdaterHarFunksjonsnedsettelse}
                value={harFunksjonsnedsettelse?.verdi || []}
                error={feilmelding?.melding}
            />
        </div>
    );
};

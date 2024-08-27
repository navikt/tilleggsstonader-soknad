import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    mottarUtstyrsstipend: EnumFelt<JaNei> | undefined;
    oppdaterMottarUtstyrsstipend: (verdi: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
}

export const MottarUtstyrsstipend: React.FC<Props> = ({
    mottarUtstyrsstipend,
    oppdaterMottarUtstyrsstipend,
    feilmelding,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={utdanningTekster.radio_mottar_utstyrsstipend}
                onChange={oppdaterMottarUtstyrsstipend}
                value={mottarUtstyrsstipend?.verdi || []}
                error={feilmelding?.melding}
            />
        </div>
    );
};

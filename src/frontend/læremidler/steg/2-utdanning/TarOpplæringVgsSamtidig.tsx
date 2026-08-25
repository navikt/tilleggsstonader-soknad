import React from 'react';

import { BlåVenstreRammeContainer } from '../../../components/BlåVenstreRammeContainer';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    tarOpplæringVgsSamtidig: EnumFelt<JaNei> | undefined;
    oppdaterTarOpplæringVgsSamtidig: (verdi: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
}

export const TarOpplæringVgsSamtidig: React.FC<Props> = ({
    tarOpplæringVgsSamtidig,
    oppdaterTarOpplæringVgsSamtidig,
    feilmelding,
}) => {
    return (
        <BlåVenstreRammeContainer>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={utdanningTekster.radio_tar_opplæring_vgs_samtidig}
                onChange={oppdaterTarOpplæringVgsSamtidig}
                value={tarOpplæringVgsSamtidig?.verdi || []}
                error={feilmelding?.melding}
            />
        </BlåVenstreRammeContainer>
    );
};

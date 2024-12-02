import React from 'react';

import { BlåVenstreRammeContainer } from '../../../components/BlåVenstreRammeContainer';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    harTidligereFullførtVgs: EnumFelt<JaNei> | undefined;
    oppdaterHarTidligereFullførtVgs: (verdi: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
}

export const HarTidligereFullførtVgs: React.FC<Props> = ({
    harTidligereFullførtVgs,
    oppdaterHarTidligereFullførtVgs,
    feilmelding,
}) => {
    return (
        <BlåVenstreRammeContainer>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={utdanningTekster.radio_har_fullført_vgs}
                onChange={oppdaterHarTidligereFullførtVgs}
                value={harTidligereFullførtVgs?.verdi || []}
                error={feilmelding?.melding}
            />
        </BlåVenstreRammeContainer>
    );
};

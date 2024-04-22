import React from 'react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    lønnetAktivitet: EnumFelt<JaNei> | undefined;
    setLønnetAktivitet: (verdier: EnumFelt<JaNei>) => void;
}

export const LønnetTiltak: React.FC<Props> = ({ lønnetAktivitet, setLønnetAktivitet }) => {
    return (
        <div>
            <LocaleRadioGroup
                tekst={aktivitetTekster.radio_lonnet}
                value={lønnetAktivitet?.verdi || []}
                onChange={setLønnetAktivitet}
            ></LocaleRadioGroup>
            <LocaleReadMoreMedLenke tekst={aktivitetTekster.radio_annet_lesmer} />
        </div>
    );
};

import React from 'react';

import { Alert } from '@navikt/ds-react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
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
                tekst={aktivitetTekster.radio_lønnet_tiltak}
                value={lønnetAktivitet?.verdi || []}
                onChange={setLønnetAktivitet}
            ></LocaleRadioGroup>
            {lønnetAktivitet?.verdi === 'JA' && (
                <Alert variant={'info'}>
                    <LocaleTekstAvsnitt tekst={aktivitetTekster.lønnet_tiltak_infoalert_innhold} />
                </Alert>
            )}
        </div>
    );
};

import React from 'react';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

import { ArbeidsrettetAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { Locale } from '../../../typer/tekst';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    arbeidsrettedeAktiviteter: Record<string, ArbeidsrettetAktivitetMedLabel> | undefined;
    oppdaterValgteAktiviteter: (verdier: string[]) => void;
    locale: Locale;
}

const ArbeidsrettedeAktiviteter: React.FC<Props> = ({
    arbeidsrettedeAktiviteter,
    oppdaterValgteAktiviteter,
    locale,
}) => {
    return (
        <CheckboxGroup
            legend={aktivitetTekster.hvilken_aktivitet_spm[locale]}
            onChange={oppdaterValgteAktiviteter}
        >
            {arbeidsrettedeAktiviteter
                ? Object.values(arbeidsrettedeAktiviteter).map((aktivitet) => (
                      <Checkbox value={aktivitet.id}>{aktivitet.label}</Checkbox>
                  ))
                : null}
            <Checkbox value="ANNET">{aktivitetTekster.checkboks_annet_tekst[locale]}</Checkbox>
        </CheckboxGroup>
    );
};

export default ArbeidsrettedeAktiviteter;

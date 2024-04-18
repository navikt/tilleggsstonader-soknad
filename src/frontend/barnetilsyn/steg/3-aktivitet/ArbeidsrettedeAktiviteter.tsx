import React from 'react';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

import { ArbeidsrettetAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { Locale } from '../../../typer/tekst';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    arbeidsrettedeAktiviteter: Record<string, ArbeidsrettetAktivitetMedLabel> | undefined;
    oppdaterValgteAktiviteter: (verdier: string[]) => void;
    locale: Locale;
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined;
}

const ArbeidsrettedeAktiviteter: React.FC<Props> = ({
    arbeidsrettedeAktiviteter,
    oppdaterValgteAktiviteter,
    locale,
    valgteAktiviteter,
}) => {
    return (
        <CheckboxGroup
            legend={aktivitetTekster.hvilken_aktivitet_spm[locale]}
            onChange={oppdaterValgteAktiviteter}
            value={valgteAktiviteter?.verdier?.map((verdi) => verdi.verdi) || []}
        >
            {arbeidsrettedeAktiviteter
                ? Object.values(arbeidsrettedeAktiviteter).map((aktivitet) => (
                      <Checkbox key={aktivitet.id} value={aktivitet.id}>
                          {aktivitet ? aktivitet.label : ''}
                      </Checkbox>
                  ))
                : null}
            <Checkbox value="ANNET">{aktivitetTekster.checkboks_annet_tekst[locale]}</Checkbox>
        </CheckboxGroup>
    );
};

export default ArbeidsrettedeAktiviteter;

import React from 'react';

import { Checkbox, CheckboxGroup, List } from '@navikt/ds-react';

import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { ArbeidsrettetAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { Locale } from '../../../typer/tekst';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    arbeidsrettedeAktiviteterMedLabeler: ArbeidsrettetAktivitetMedLabel[] | undefined;
    oppdaterValgteAktiviteter: (verdier: string[]) => void;
    locale: Locale;
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined;
}

const ArbeidsrettedeAktiviteter: React.FC<Props> = ({
    arbeidsrettedeAktiviteterMedLabeler,
    oppdaterValgteAktiviteter,
    locale,
    valgteAktiviteter,
}) => {
    return (
        <CheckboxGroup
            legend={aktivitetTekster.hvilken_aktivitet.spm[locale]}
            onChange={oppdaterValgteAktiviteter}
            value={valgteAktiviteter?.verdier?.map((verdi) => verdi.verdi) || []}
        >
            <LocaleReadMoreMedChildren header={aktivitetTekster.hvilken_aktivitet.les_mer.header}>
                <LocaleTekstAvsnitt tekst={aktivitetTekster.hvilken_aktivitet.les_mer.del1} />
                <List>
                    {aktivitetTekster.hvilken_aktivitet.les_mer.del2_lenker.map((lenke, indeks) => (
                        <List.Item key={indeks}>
                            <LocaleInlineLenke tekst={lenke} />
                        </List.Item>
                    ))}
                </List>
                <LocaleInlineLenke tekst={aktivitetTekster.hvilken_aktivitet.les_mer.del3} />
            </LocaleReadMoreMedChildren>
            {arbeidsrettedeAktiviteterMedLabeler
                ? arbeidsrettedeAktiviteterMedLabeler.map((aktivitet) => (
                      <Checkbox key={aktivitet.id} value={aktivitet.id}>
                          {aktivitet ? aktivitet.label : ''}
                      </Checkbox>
                  ))
                : null}
            <Checkbox value="ANNET">
                {aktivitetTekster.hvilken_aktivitet.checkboks_annet_tekst[locale]}
            </Checkbox>
        </CheckboxGroup>
    );
};

export default ArbeidsrettedeAktiviteter;

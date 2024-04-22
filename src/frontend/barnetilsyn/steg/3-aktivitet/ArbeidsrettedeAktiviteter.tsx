import React, { useMemo } from 'react';

import { Checkbox, CheckboxGroup, List } from '@navikt/ds-react';

import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { Locale } from '../../../typer/tekst';
import { Feilmelding } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>;
    oppdaterValgteAktiviteter: (verdier: string[]) => void;
    locale: Locale;
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined;
    feilmelding: Feilmelding | undefined;
}

const ArbeidsrettedeAktiviteter: React.FC<Props> = ({
    registerAktiviteter,
    oppdaterValgteAktiviteter,
    locale,
    valgteAktiviteter,
    feilmelding,
}) => {
    const registerAktiviteterListe = useMemo(
        () => Object.values(registerAktiviteter),
        [registerAktiviteter]
    );

    return (
        <CheckboxGroup
            id={feilmelding?.id}
            legend={aktivitetTekster.hvilken_aktivitet.spm[locale]}
            onChange={oppdaterValgteAktiviteter}
            value={valgteAktiviteter?.verdier?.map((verdi) => verdi.verdi) || []}
            error={feilmelding?.melding}
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
            {registerAktiviteterListe.map((aktivitet) => (
                <Checkbox key={aktivitet.id} value={aktivitet.id}>
                    {aktivitet ? aktivitet.label : ''}
                </Checkbox>
            ))}
            <Checkbox value="ANNET">
                {aktivitetTekster.hvilken_aktivitet.checkboks_annet_tekst[locale]}
            </Checkbox>
        </CheckboxGroup>
    );
};

export default ArbeidsrettedeAktiviteter;

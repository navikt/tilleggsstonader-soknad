import React from 'react';

import { List } from '@navikt/ds-react';

import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { TekstElement } from '../../../typer/tekst';
import { aktivitetTekster } from '../../tekster/aktivitet';

interface Props {
    header: TekstElement<string>;
}

export const LesMerHvilkenAktivitet: React.FC<Props> = ({ header }) => {
    return (
        <LocaleReadMoreMedChildren header={header}>
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
    );
};

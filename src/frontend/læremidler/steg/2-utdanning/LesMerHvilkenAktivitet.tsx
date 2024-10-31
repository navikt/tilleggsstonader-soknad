import React from 'react';

import { BodyLong } from '@navikt/ds-react';

import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { TekstElement } from '../../../typer/tekst';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    header: TekstElement<string>;
}

export const LesMerHvilkenAktivitet: React.FC<Props> = ({ header }) => {
    return (
        <LocaleReadMoreMedChildren header={header}>
            <BodyLong spacing>
                <LocaleTekst tekst={utdanningTekster.hvilken_aktivitet.les_mer.del1} />
            </BodyLong>
            <BodyLong spacing>
                <LocaleTekst tekst={utdanningTekster.hvilken_aktivitet.les_mer.del2} />
            </BodyLong>
            <LocaleInlineLenke tekst={utdanningTekster.hvilken_aktivitet.les_mer.del3} />
        </LocaleReadMoreMedChildren>
    );
};

import React from 'react';

import { Punktliste } from '../typer/tekst';
import { LocaleHeading } from './Teksthåndtering/LocaleHeading';
import { LocalePunktliste } from './Teksthåndtering/LocalePunktliste';

export const InfoPunktliste: React.FC<{ liste: Punktliste[] }> = ({ liste }) => {
    return liste.map((tekst, indeks) => (
        <React.Fragment key={indeks}>
            <LocaleHeading tekst={tekst.tittel} level="2" size="xsmall" />
            <LocalePunktliste innhold={tekst.innhold} />
        </React.Fragment>
    ));
};

import React from 'react';

import { BodyShort, InlineMessage } from '@navikt/ds-react';

import { folkeregistrertAdresseTekster } from './tekster';
import { LocaleInlineLenke } from '../Teksthåndtering/LocaleInlineLenke';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';

export const FolkeregistrertAdresseInformasjon: React.FC<{ adresse: string }> = ({ adresse }) => {
    return (
        <>
            <BodyShort>
                <LocaleTekst
                    tekst={folkeregistrertAdresseTekster.folkereg_adresse}
                    argument0={adresse}
                />
            </BodyShort>
            <InlineMessage status="info">
                <LocaleInlineLenke tekst={folkeregistrertAdresseTekster.info_tekst} />
            </InlineMessage>
        </>
    );
};

export const ManglerFolkeregistrertAdresseInformasjon: React.FC = () => {
    return (
        <InlineMessage status="info">
            <LocaleInlineLenke tekst={folkeregistrertAdresseTekster.info_adresse_mangler} />
        </InlineMessage>
    );
};

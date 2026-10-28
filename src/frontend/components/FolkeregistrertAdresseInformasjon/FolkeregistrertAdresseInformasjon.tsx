import React from 'react';

import { BodyShort, InlineMessage } from '@navikt/ds-react';

import { folkeregistrertAdresseTekster } from './tekster';
import { harVerdi } from '../../utils/typeUtils';
import { LocaleInlineLenke } from '../Teksthåndtering/LocaleInlineLenke';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';

export const FolkeregistrertAdresseInformasjon: React.FC<{
    adresse: string;
}> = ({ adresse }) => {
    if (!harVerdi(adresse)) {
        return <ManglerFolkeregistrertAdresseInformasjon />;
    }

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

const ManglerFolkeregistrertAdresseInformasjon: React.FC = () => {
    return (
        <InlineMessage status="info">
            <LocaleInlineLenke tekst={folkeregistrertAdresseTekster.info_adresse_mangler} />
        </InlineMessage>
    );
};

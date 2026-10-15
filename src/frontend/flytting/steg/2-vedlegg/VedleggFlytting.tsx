import { BodyShort } from '@navikt/ds-react';

import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { TekstElement } from '../../../typer/tekst';

const vedleggTekster: {
    tittel: TekstElement<string>;
    kravIkkeAvklart: TekstElement<string>;
} = {
    tittel: { nb: 'Vedlegg' },
    kravIkkeAvklart: { nb: 'Dokumentasjonskrav for Flytting er ikke avklart ennå.' },
};

export const VedleggFlytting = () => (
    <Side validerSteg={() => true}>
        <LocaleHeading tekst={vedleggTekster.tittel} level="2" size="medium" />
        <BodyShort>
            <LocaleTekst tekst={vedleggTekster.kravIkkeAvklart} />
        </BodyShort>
    </Side>
);

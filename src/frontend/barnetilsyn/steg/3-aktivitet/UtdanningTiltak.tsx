import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import { Tiltak } from './typer';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { aktivitetTekster } from '../../tekster/aktivitet';

const UtdanningTiltak: React.FC<{ tiltak: Tiltak }> = ({ tiltak }) => {
    return (
        <div>
            <BodyShort>
                <LocaleTekst tekst={aktivitetTekster.godkjent_utdanning} />
            </BodyShort>
            <BodyShort>{`${tiltak.periode.fom} - ${tiltak.periode.tom}`}</BodyShort>
        </div>
    );
};

export default UtdanningTiltak;

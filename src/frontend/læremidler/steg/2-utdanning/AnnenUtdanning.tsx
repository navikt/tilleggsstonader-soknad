import React from 'react';

import { Alert, BodyShort, Heading } from '@navikt/ds-react';

import { aktivitetTekster } from '../../../barnetilsyn/tekster/aktivitet';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { EnumFelt } from '../../../typer/skjema';
import { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';
import { AnnenUtdanningType } from '../../typer/søknad';

interface Props {
    annenUtdanning: EnumFelt<AnnenUtdanningType> | undefined;
    oppdaterAnnenUtdanning: (verdi: EnumFelt<AnnenUtdanningType>) => void;
    feilmelding: Feilmelding | undefined;
}

export const AnnenUtdanning: React.FC<Props> = ({
    annenUtdanning,
    oppdaterAnnenUtdanning,
    feilmelding,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={utdanningTekster.radio_annen_utdanning}
                onChange={oppdaterAnnenUtdanning}
                value={annenUtdanning?.verdi || []}
                error={feilmelding?.melding}
            />
            {annenUtdanning?.verdi === AnnenUtdanningType.INGEN_UTDANNING && (
                <Alert variant={'info'}>
                    <Heading size="small">
                        <LocaleTekst tekst={utdanningTekster.ingen_utdanning_alert_tittel} />
                    </Heading>
                    <BodyShort>
                        <LocaleTekst tekst={utdanningTekster.ingen_utdanning_alert_innhold} />
                    </BodyShort>
                </Alert>
            )}
            <LocaleReadMoreMedLenke tekst={aktivitetTekster.radio_annet_lesmer} />
        </div>
    );
};

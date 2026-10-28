import React from 'react';

import { VStack } from '@navikt/ds-react';

import { EnumFelt } from '../../typer/skjema';
import { JaNei } from '../../typer/søknad';
import { InfoAlert, Radiogruppe } from '../../typer/tekst';
import { Feilmelding } from '../../typer/validering';
import { LocaleInfoCard } from '../Teksthåndtering/LocaleInfoCard';
import { LocaleRadioGroup } from '../Teksthåndtering/LocaleRadioGroup';

interface Props {
    lønnetAktivitet: EnumFelt<JaNei> | undefined;
    oppdaterLønnetAktivitet: (verdier: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
    radioTekst: Radiogruppe<JaNei>;
    infoalertInnhold: InfoAlert;
}

export const LønnetTiltak: React.FC<Props> = ({
    lønnetAktivitet,
    oppdaterLønnetAktivitet,
    feilmelding,
    radioTekst,
    infoalertInnhold,
}) => {
    return (
        <VStack gap="space-8">
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={radioTekst}
                value={lønnetAktivitet?.verdi || []}
                onChange={oppdaterLønnetAktivitet}
                error={feilmelding?.melding}
            ></LocaleRadioGroup>
            {lønnetAktivitet?.verdi === 'JA' && <LocaleInfoCard tekst={infoalertInnhold} />}
        </VStack>
    );
};

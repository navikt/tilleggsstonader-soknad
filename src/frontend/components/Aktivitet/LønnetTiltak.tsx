import React from 'react';

import { Alert } from '@navikt/ds-react';

import { EnumFelt } from '../../typer/skjema';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';
import { Feilmelding } from '../../typer/validering';
import { LocaleRadioGroup } from '../Teksthåndtering/LocaleRadioGroup';
import { LocaleTekstAvsnitt } from '../Teksthåndtering/LocaleTekstAvsnitt';

interface Props {
    lønnetAktivitet: EnumFelt<JaNei> | undefined;
    oppdaterLønnetAktivitet: (verdier: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
    radioTekst: Radiogruppe<JaNei>;
    infoalertInnhold: TekstElement<string[]>;
}

export const LønnetTiltak: React.FC<Props> = ({
    lønnetAktivitet,
    oppdaterLønnetAktivitet,
    feilmelding,
    radioTekst,
    infoalertInnhold,
}) => {
    return (
        <div>
            <LocaleRadioGroup
                id={feilmelding?.id}
                tekst={radioTekst}
                value={lønnetAktivitet?.verdi || []}
                onChange={oppdaterLønnetAktivitet}
                error={feilmelding?.melding}
            ></LocaleRadioGroup>
            {lønnetAktivitet?.verdi === 'JA' && (
                <Alert variant={'info'}>
                    <LocaleTekstAvsnitt tekst={infoalertInnhold} />
                </Alert>
            )}
        </div>
    );
};

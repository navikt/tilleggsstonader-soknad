import { Alert } from '@navikt/ds-react';
import type React from 'react';

import type { EnumFelt } from '../../typer/skjema';
import type { JaNei } from '../../typer/søknad';
import type { Radiogruppe, TekstElement } from '../../typer/tekst';
import type { Feilmelding } from '../../typer/validering';
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
    infoalertInnhold
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

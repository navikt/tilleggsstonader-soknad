import React, { useRef, useState } from 'react';

import styled from 'styled-components';

import { UploadIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button } from '@navikt/ds-react';

import { MAKS_FILSTØRRELSE_FORMATTERT, MAX_FILSTØRRELSE, TILLATE_FILTYPER } from './utils';
import { lastOppVedlegg } from '../../api/api';
import { useSpråk } from '../../context/SpråkContext';
import { Dokument, DokumentasjonFelt } from '../../typer/skjema';
import { TekstElement } from '../../typer/tekst';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';

const StyledKnapp = styled(Button)`
    width: max-content;
    margin-top: 1rem;
`;

const teksterFeilmeldinger: {
    enFil: TekstElement<string>;
    maksstørrelse: TekstElement<string>;
    filtype: TekstElement<string>;
    feiletOpplasting: TekstElement<string>;
} = {
    enFil: {
        nb: `Må laste opp en og en fil`,
    },
    maksstørrelse: {
        nb: `"[0]" er for stor (maksimal filstørrelse er ${MAKS_FILSTØRRELSE_FORMATTERT}).`,
    },
    filtype: {
        nb: '"[0]" – Ugyldig filtype.',
    },
    feiletOpplasting: {
        nb: 'Feilet opplasting av "[0]".',
    },
};
const Filopplaster: React.FC<{
    dokumentasjonFelt: DokumentasjonFelt;
    oppdaterVedlegg: (vedlegg: Dokument[]) => void;
}> = ({ dokumentasjonFelt, oppdaterVedlegg }) => {
    const { locale } = useSpråk();
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const [feilmelding, settFeilmelding] = useState<string>();
    const [laster, settLaster] = useState<boolean>(false);

    const lastOppValgteFiler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filer = event.target.files;
        if (filer?.length !== 1) {
            settFeilmelding(teksterFeilmeldinger.enFil[locale]);
            return;
        }
        const fil = filer[0];

        if (fil.size > MAX_FILSTØRRELSE) {
            settFeilmelding(
                hentBeskjedMedEttParameter(fil.name, teksterFeilmeldinger.maksstørrelse[locale])
            );
        } else if (!TILLATE_FILTYPER.includes(fil.type)) {
            settFeilmelding(
                hentBeskjedMedEttParameter(fil.name, teksterFeilmeldinger.filtype[locale])
            );
        } else {
            settLaster(true);
            lastOppVedlegg(fil)
                .then((id) =>
                    oppdaterVedlegg([
                        ...dokumentasjonFelt.opplastedeVedlegg,
                        { id: id, navn: fil.name },
                    ])
                )
                .catch(() => {
                    settFeilmelding(
                        hentBeskjedMedEttParameter(
                            fil.name,
                            teksterFeilmeldinger.feiletOpplasting[locale]
                        )
                    );
                })
                .finally(() => settLaster(false));
        }
    };

    return (
        <>
            {dokumentasjonFelt.opplastedeVedlegg.map((dokument) => (
                <BodyShort key={dokument.id} size="small">
                    {dokument.navn}
                </BodyShort>
            ))}
            {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
            <StyledKnapp
                onClick={() => hiddenFileInput.current?.click()}
                icon={<UploadIcon title="a11y-title" />}
                disabled={laster}
            >
                {dokumentasjonFelt.label}
            </StyledKnapp>
            <input
                type="file"
                onChange={lastOppValgteFiler}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
            />
        </>
    );
};
export default Filopplaster;

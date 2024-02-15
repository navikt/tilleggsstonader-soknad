import React, { useRef, useState } from 'react';

import styled from 'styled-components';

import { UploadIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button } from '@navikt/ds-react';

import { MAX_FILSTØRRELSE, TILLATE_FILTYPER } from './utils';
import { lastOppVedlegg } from '../../api/api';
import { vedleggTekster } from '../../barnetilsyn/tekster/vedlegg';
import { useSpråk } from '../../context/SpråkContext';
import { Dokument, DokumentasjonFelt } from '../../typer/skjema';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const StyledKnapp = styled(Button)`
    width: max-content;
    margin-top: 1rem;
`;

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
                <LocaleTekst tekst={vedleggTekster.typerVedlegg[dokumentasjonFelt.type].knapp} />
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

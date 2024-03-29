import React, { useRef, useState } from 'react';

import styled from 'styled-components';

import { UploadIcon } from '@navikt/aksel-icons';
import { Alert, Button, Checkbox, VStack } from '@navikt/ds-react';
import { ABlue50, ABlue500 } from '@navikt/ds-tokens/dist/tokens';

import FilVisning from './Fil';
import { MAX_FILSTØRRELSE, TILLATE_FILTYPER } from './utils';
import { lastOppVedlegg } from '../../api/api';
import { useSpråk } from '../../context/SpråkContext';
import { filopplastingTekster, teksterFeilmeldinger } from '../../tekster/filopplasting';
import { Dokument, DokumentasjonFelt } from '../../typer/skjema';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const Container = styled(VStack).attrs({ gap: '2', align: 'center' })`
    border: 1px dashed ${ABlue500};
    background-color: ${ABlue50};
    padding: 1rem 0 0.5rem 0;
`;

const Filopplaster: React.FC<{
    dokumentasjonFelt: DokumentasjonFelt;
    toggleHarSendtInnTidligere: () => void;
    leggTilDokument: (vedlegg: Dokument) => void;
    slettDokument: (vedlegg: Dokument) => void;
}> = ({ dokumentasjonFelt, toggleHarSendtInnTidligere, leggTilDokument, slettDokument }) => {
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
                .then((id) => leggTilDokument({ id: id, navn: fil.name }))
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
                <FilVisning
                    key={dokument.id}
                    dokument={dokument}
                    slettDokument={() => slettDokument(dokument)}
                />
            ))}
            <Container>
                {feilmelding && <Alert variant="error">{feilmelding}</Alert>}
                <Button
                    onClick={() => hiddenFileInput.current?.click()}
                    icon={<UploadIcon title="a11y-title" />}
                    disabled={laster}
                >
                    <LocaleTekst tekst={filopplastingTekster.last_opp_fil_knapp} />
                </Button>
                <Checkbox
                    checked={dokumentasjonFelt.harSendtInn}
                    onChange={toggleHarSendtInnTidligere}
                >
                    <LocaleTekst tekst={filopplastingTekster.delt_tidligere_knapp} />
                </Checkbox>
                <input
                    type="file"
                    onChange={lastOppValgteFiler}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
            </Container>
        </>
    );
};
export default Filopplaster;

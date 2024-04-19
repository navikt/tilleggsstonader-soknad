import React, { useRef, useState } from 'react';

import styled from 'styled-components';

import { UploadIcon } from '@navikt/aksel-icons';
import { Alert, Button, VStack } from '@navikt/ds-react';
import { ABlue50, ABlue500 } from '@navikt/ds-tokens/dist/tokens';

import { utledFeilmelding } from './feilmeldingOpplasting';
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
    leggTilDokument: (vedlegg: Dokument) => void;
    slettDokument: (vedlegg: Dokument) => void;
}> = ({ dokumentasjonFelt, leggTilDokument, slettDokument }) => {
    const { locale } = useSpråk();
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const [feilmelding, settFeilmelding] = useState<string>();
    const [laster, settLaster] = useState<boolean>(false);

    /**
     * Hack for å få skjermlesere til å trigge feilmelding etter at annet blir lest opp for å trigge opplesing av feilmelding
     */
    const settFeilmeldingMedDelay = (feilmelding: string) => {
        setTimeout(() => {
            settFeilmelding(feilmelding);
        }, 1500);
    };

    const lastOppValgteFiler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filer = event.target.files;
        if (filer?.length !== 1) {
            settFeilmelding(teksterFeilmeldinger.enFil[locale]);
            return;
        }
        const fil = filer[0];

        if (fil.size > MAX_FILSTØRRELSE) {
            settFeilmeldingMedDelay(
                hentBeskjedMedEttParameter(fil.name, teksterFeilmeldinger.maksstørrelse[locale])
            );
        } else if (!TILLATE_FILTYPER.includes(fil.type)) {
            settFeilmeldingMedDelay(
                hentBeskjedMedEttParameter(fil.name, teksterFeilmeldinger.filtype[locale])
            );
        } else {
            settLaster(true);
            settFeilmelding(undefined);
            lastOppVedlegg(fil)
                .then((id) => leggTilDokument({ id: id, navn: fil.name }))
                .catch((err) => {
                    settFeilmelding(utledFeilmelding(err, fil, locale));
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
                <Button
                    onClick={() => hiddenFileInput.current?.click()}
                    icon={<UploadIcon />}
                    disabled={laster}
                >
                    <LocaleTekst tekst={filopplastingTekster.last_opp_fil_knapp} />
                </Button>
                <input
                    type="file"
                    onChange={lastOppValgteFiler}
                    onClick={(e) => {
                        // @ts-ignore hack for å kunne laste opp samme fila på nytt i tilfelle opplasting feiler
                        e.target.value = null;
                    }}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />

                {feilmelding && (
                    <div role="alert" aria-live="assertive">
                        <Alert variant="error">{feilmelding}</Alert>
                    </div>
                )}
            </Container>
        </>
    );
};
export default Filopplaster;

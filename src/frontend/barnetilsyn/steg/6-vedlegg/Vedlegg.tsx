import React, { useState } from 'react';

import { styled } from 'styled-components';

import { Heading } from '@navikt/ds-react';

import VedleggFelt from '../../../components/Filopplaster/VedleggFelt';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import VedleggGenerellInfo from '../../../components/VedleggGenerellInfo';
import { useSøknad } from '../../../context/SøknadContext';
import { Dokument, DokumentasjonFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { typerVedleggTekster, vedleggTekster } from '../../tekster/vedlegg';

const VedleggContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 1rem 0;
`;

const Vedlegg = () => {
    const { dokumentasjon, settDokumentasjon } = useSøknad();

    // TODO: 🤔 Vurder om denne staten er nødvendig, eller om contexten kan oppdateres direkte
    const [nyDokumentasjon, settNyDokumentasjon] = useState<DokumentasjonFelt[]>(dokumentasjon);

    // TODO: Bruk ID og ikke indeks for å oppdatere
    const oppdaterVedlegg = (vedlegg: Dokument[], indeks: number) => {
        const nyDokumentasjonListe = [...nyDokumentasjon];
        nyDokumentasjonListe[indeks] = {
            ...nyDokumentasjonListe[indeks],
            opplastedeVedlegg: vedlegg,
        };
        settNyDokumentasjon(nyDokumentasjonListe);
    };

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            stegtittel={vedleggTekster.steg_tittel}
            oppdaterSøknad={() => settDokumentasjon(nyDokumentasjon)}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={vedleggTekster.innhold_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={vedleggTekster.guide_innhold} />
            </PellePanel>
            <VedleggContainer>
                {nyDokumentasjon.map((dok, indeks) => (
                    <section key={indeks}>
                        <VedleggFelt
                            vedlegg={typerVedleggTekster[dok.type]}
                            argument0={dok.barnId} // TODO: Oppdater med barnets navn hentet på id
                            dokumentasjonFelt={nyDokumentasjon[indeks]}
                            oppdaterVedlegg={(dokument: Dokument[]) =>
                                oppdaterVedlegg(dokument, indeks)
                            }
                        />
                    </section>
                ))}
            </VedleggContainer>
            <VedleggGenerellInfo />
        </Side>
    );
};

export default Vedlegg;

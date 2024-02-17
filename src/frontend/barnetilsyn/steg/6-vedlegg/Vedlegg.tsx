import React, { useState } from 'react';

import { styled } from 'styled-components';

import { BodyShort, Heading, Label, List } from '@navikt/ds-react';

import { fjernVedlegg, leggTilVedlegg } from './utils';
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

const Dokumentasjonskrav = () => {
    const { dokumentasjon } = useSøknad();
    return (
        <div>
            <Label>
                <LocaleTekst tekst={vedleggTekster.dokumentasjonskrav_tittel} />
            </Label>
            <List>
                {dokumentasjon.map((doc, indeks) => (
                    <List.Item key={indeks}> {doc.label} </List.Item>
                ))}
            </List>
            <BodyShort>
                <LocaleTekst tekst={vedleggTekster.dokumentasjonskrav_samlet_faktura} />
            </BodyShort>
        </div>
    );
};

const Vedlegg = () => {
    const { dokumentasjon, settDokumentasjon } = useSøknad();

    // TODO: 🤔 Vurder om denne staten er nødvendig, eller om contexten kan oppdateres direkte
    const [nyDokumentasjon, settNyDokumentasjon] = useState<DokumentasjonFelt[]>(dokumentasjon);

    const leggTilDokument = (dokumentasjonFelt: DokumentasjonFelt, vedlegg: Dokument) => {
        settNyDokumentasjon((prevState) => leggTilVedlegg(prevState, dokumentasjonFelt, vedlegg));
    };

    const slettDokument = (
        dokumentasjonFelt: DokumentasjonFelt,
        dokumentSomSkalSlettet: Dokument
    ) => {
        settNyDokumentasjon((prevState) =>
            fjernVedlegg(prevState, dokumentasjonFelt, dokumentSomSkalSlettet)
        );
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
            <Dokumentasjonskrav></Dokumentasjonskrav>
            <VedleggGenerellInfo />
            <VedleggContainer>
                {nyDokumentasjon.map((dok, indeks) => (
                    <section key={indeks}>
                        <VedleggFelt
                            vedlegg={typerVedleggTekster[dok.type]}
                            argument0={dok.barnId} // TODO: Oppdater med barnets navn hentet på id
                            dokumentasjonFelt={nyDokumentasjon[indeks]}
                            leggTilDokument={(dokument: Dokument) => leggTilDokument(dok, dokument)}
                            slettDokument={(dokument) => slettDokument(dok, dokument)}
                        />
                    </section>
                ))}
            </VedleggContainer>
        </Side>
    );
};

export default Vedlegg;

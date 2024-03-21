import React, { useEffect } from 'react';

import { styled } from 'styled-components';

import { Heading } from '@navikt/ds-react';

import Dokumentasjonskrav from './Dokumentasjonskrav';
import {
    fjernVedlegg,
    leggTilVedlegg,
    opprettDokumentasjonsfelt,
    toggleHarSendtInn,
} from './utils';
import VedleggFelt from '../../../components/Filopplaster/VedleggFelt';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import VedleggGenerellInfo from '../../../components/VedleggGenerellInfo';
import { useSpråk } from '../../../context/SpråkContext';
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
    const { locale } = useSpråk();
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useSøknad();

    useEffect(() => {
        settDokumentasjon((prevState) =>
            opprettDokumentasjonsfelt(dokumentasjonsbehov, prevState, locale)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dokumentasjonsbehov, locale]);

    const leggTilDokument = (dokumentasjonFelt: DokumentasjonFelt, vedlegg: Dokument) => {
        settDokumentasjon((prevState) => leggTilVedlegg(prevState, dokumentasjonFelt, vedlegg));
    };

    const slettDokument = (
        dokumentasjonFelt: DokumentasjonFelt,
        dokumentSomSkalSlettet: Dokument
    ) => {
        settDokumentasjon((prevState) =>
            fjernVedlegg(prevState, dokumentasjonFelt, dokumentSomSkalSlettet)
        );
    };

    const toggleHarSendtInnTidligere = (dokumentasjonFelt: DokumentasjonFelt) => {
        settDokumentasjon((prevState) => toggleHarSendtInn(prevState, dokumentasjonFelt));
    };

    return (
        <Side stønadstype={Stønadstype.BARNETILSYN}>
            <Heading size={'medium'}>
                <LocaleTekst tekst={vedleggTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={vedleggTekster.guide_innhold} />
            </PellePanel>
            <Dokumentasjonskrav></Dokumentasjonskrav>
            <VedleggGenerellInfo />
            <VedleggContainer>
                {dokumentasjon.map((dok, indeks) => (
                    <section key={indeks}>
                        <VedleggFelt
                            tittel={dok.label}
                            vedlegg={typerVedleggTekster[dok.type]}
                            dokumentasjonFelt={dok}
                            toggleHarSendtInnTidligere={() => toggleHarSendtInnTidligere(dok)}
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

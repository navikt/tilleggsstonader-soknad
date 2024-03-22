import React, { useEffect, useRef } from 'react';

import { styled } from 'styled-components';

import { ErrorSummary, Heading } from '@navikt/ds-react';

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
import { typerVedleggTekster, vedleggFeilmeldinger, vedleggTekster } from '../../tekster/vedlegg';

const VedleggContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 1rem 0;
`;

const Vedlegg = () => {
    const { locale } = useSpråk();
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useSøknad();

    const errorRef = useRef<HTMLDivElement>(null);

    const [dokumentasjonSomMangler, settDokumentasjonSomMangler] = React.useState<
        DokumentasjonFelt[]
    >([]);

    useEffect(() => {
        settDokumentasjon((prevState) =>
            opprettDokumentasjonsfelt(dokumentasjonsbehov, prevState, locale)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        errorRef.current && errorRef.current.focus();
    }, [dokumentasjonSomMangler.length]);

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

    const validerSteg = () => {
        const manglerOpplasting = dokumentasjon.filter((dok) => dok.opplastedeVedlegg.length === 0);

        settDokumentasjonSomMangler(manglerOpplasting);
        return manglerOpplasting.length === 0;
    };

    return (
        <Side stønadstype={Stønadstype.BARNETILSYN} validerSteg={validerSteg}>
            <Heading size={'medium'}>
                <LocaleTekst tekst={vedleggTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={vedleggTekster.guide_innhold} />
            </PellePanel>
            <Dokumentasjonskrav />
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
                            visFeilmelding={dokumentasjonSomMangler.includes(dok)}
                        />
                    </section>
                ))}
            </VedleggContainer>
            {dokumentasjonSomMangler.length > 0 && (
                <ErrorSummary
                    ref={errorRef}
                    heading={<LocaleTekst tekst={vedleggFeilmeldinger.overskrift} />}
                >
                    {dokumentasjonSomMangler.map((dok, indeks) => (
                        <ErrorSummary.Item key={indeks}>{dok.label}</ErrorSummary.Item>
                    ))}
                </ErrorSummary>
            )}
        </Side>
    );
};

export default Vedlegg;

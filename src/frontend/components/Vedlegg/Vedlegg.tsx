import React, { useEffect, useRef } from 'react';

import { styled } from 'styled-components';

import { BodyShort, Heading } from '@navikt/ds-react';

import Dokumentasjonskrav from './Dokumentasjonskrav';
import { opprettDokumentasjonsfelt, leggTilVedlegg, fjernVedlegg } from './utils';
import VedleggManglerModal from './VedleggManglerModal';
import { useSpråk } from '../../context/SpråkContext';
import { typerVedleggTekster, vedleggTekster } from '../../tekster/vedlegg';
import { DokumentasjonFelt, Dokument, Dokumentasjonsbehov } from '../../typer/skjema';
import VedleggFelt from '../Filopplaster/VedleggFelt';
import { PellePanel } from '../PellePanel/PellePanel';
import Side from '../Side';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../Teksthåndtering/LocaleTekstAvsnitt';
import VedleggGenerellInfo from '../VedleggGenerellInfo';

const VedleggContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 1rem 0;
`;

interface Props {
    dokumentasjon: DokumentasjonFelt[];
    settDokumentasjon: React.Dispatch<React.SetStateAction<DokumentasjonFelt[]>>;
    dokumentasjonsbehov: Dokumentasjonsbehov[];
}

const Vedlegg: React.FC<Props> = ({ dokumentasjon, settDokumentasjon, dokumentasjonsbehov }) => {
    const { locale } = useSpråk();

    const ref = useRef<HTMLDialogElement>(null);
    const [ikkeOpplastedeDokumenter, settIkkeOpplastedeDokumenter] = React.useState<string[]>([]);

    useEffect(() => {
        settDokumentasjon((prevState) =>
            opprettDokumentasjonsfelt(dokumentasjonsbehov, prevState, locale)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const validerSteg = () => {
        const manglerOpplasting = dokumentasjon
            .filter((dok) => dok.opplastedeVedlegg.length === 0)
            .map((dok) => dok.label);

        settIkkeOpplastedeDokumenter(manglerOpplasting);

        if (manglerOpplasting.length > 0) {
            ref.current?.showModal();
            return false;
        }

        return true;
    };

    return (
        <Side validerSteg={validerSteg}>
            <Heading size={'medium'}>
                <LocaleTekst tekst={vedleggTekster.tittel} />
            </Heading>
            {dokumentasjonsbehov.length === 0 ? (
                <BodyShort>
                    <LocaleTekst tekst={vedleggTekster.ingen_dokumentasjonsbehov} />
                </BodyShort>
            ) : (
                <>
                    <PellePanel>
                        <LocaleTekstAvsnitt tekst={vedleggTekster.guide_innhold} />
                    </PellePanel>
                    <Dokumentasjonskrav dokumentasjonsbehov={dokumentasjonsbehov} />
                    <VedleggGenerellInfo />
                    <VedleggContainer>
                        {dokumentasjon.map((dok, indeks) => (
                            <section key={indeks}>
                                <VedleggFelt
                                    tittel={dok.label}
                                    vedlegg={typerVedleggTekster[dok.type]}
                                    dokumentasjonFelt={dok}
                                    leggTilDokument={(dokument: Dokument) =>
                                        leggTilDokument(dok, dokument)
                                    }
                                    slettDokument={(dokument) => slettDokument(dok, dokument)}
                                />
                            </section>
                        ))}
                    </VedleggContainer>
                    <VedleggManglerModal
                        innerRef={ref}
                        dokumenterSomMangler={ikkeOpplastedeDokumenter}
                    />
                </>
            )}
        </Side>
    );
};

export default Vedlegg;

import React, { useEffect, useRef, useState } from 'react';

import { styled } from 'styled-components';

import { BodyShort, GuidePanel } from '@navikt/ds-react';

import Dokumentasjonskrav from './Dokumentasjonskrav';
import VedleggManglerModal from './VedleggManglerModal';
import { fjernVedlegg, leggTilVedlegg, opprettDokumentasjonsfelt } from './VedleggUtils';
import { useSpråk } from '../../context/SpråkContext';
import { vedleggTekster } from '../../tekster/vedlegg';
import { Dokument, DokumentasjonFelt, Dokumentasjonsbehov } from '../../typer/skjema';
import { Filopplaster } from '../Filopplaster/Filopplaster';
import Side from '../Side';
import { LocaleHeading } from '../Teksthåndtering/LocaleHeading';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../Teksthåndtering/LocaleTekstAvsnitt';
import VedleggGenerellInfo from '../VedleggGenerellInfo';

const VedleggContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 1rem 0;
`;

export type DokumentasjonFeltMedVedleggstekst = DokumentasjonFelt & {
    tittel: string;
    beskrivelse: string;
};

interface Props {
    dokumentasjon: DokumentasjonFeltMedVedleggstekst[];
    settDokumentasjon: React.Dispatch<React.SetStateAction<DokumentasjonFelt[]>>;
    dokumentasjonsbehov: Dokumentasjonsbehov[];
}

const Vedlegg: React.FC<Props> = ({ dokumentasjon, settDokumentasjon, dokumentasjonsbehov }) => {
    const { locale } = useSpråk();

    const vedleggManglerModalRef = useRef<HTMLDialogElement>(null);
    const [ikkeOpplastedeDokumenter, settIkkeOpplastedeDokumenter] = useState<string[]>([]);

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
        dokumentSomSkalSlettesId: string
    ) => {
        settDokumentasjon((prevState) =>
            fjernVedlegg(prevState, dokumentasjonFelt, dokumentSomSkalSlettesId)
        );
    };

    const validerSteg = () => {
        const manglerOpplasting = dokumentasjon
            .filter((dok) => dok.opplastedeVedlegg.length === 0)
            .map((dok) => dok.label);

        settIkkeOpplastedeDokumenter(manglerOpplasting);

        if (manglerOpplasting.length > 0) {
            vedleggManglerModalRef.current?.showModal();
            return false;
        }

        return true;
    };

    return (
        <Side validerSteg={validerSteg}>
            <LocaleHeading tekst={vedleggTekster.tittel} level="2" size={'medium'} />
            {dokumentasjonsbehov.length === 0 ? (
                <BodyShort>
                    <LocaleTekst tekst={vedleggTekster.ingen_dokumentasjonsbehov} />
                </BodyShort>
            ) : (
                <>
                    <GuidePanel>
                        <LocaleTekstAvsnitt tekst={vedleggTekster.guide_innhold} />
                    </GuidePanel>
                    <Dokumentasjonskrav dokumentasjonsbehov={dokumentasjonsbehov} />
                    <VedleggGenerellInfo />
                    <VedleggContainer>
                        {dokumentasjon.map((dok) => (
                            <section key={dok.label}>
                                <Filopplaster
                                    opplastedeVedlegg={dok.opplastedeVedlegg}
                                    tittel={dok.tittel}
                                    beskrivelse={dok.beskrivelse}
                                    leggTilDokument={(dokument: Dokument) =>
                                        leggTilDokument(dok, dokument)
                                    }
                                    slettDokument={(dokumentId) => slettDokument(dok, dokumentId)}
                                />
                            </section>
                        ))}
                    </VedleggContainer>

                    <VedleggManglerModal
                        innerRef={vedleggManglerModalRef}
                        dokumenterSomMangler={ikkeOpplastedeDokumenter}
                    />
                </>
            )}
        </Side>
    );
};

export default Vedlegg;

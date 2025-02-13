import React, { useEffect, useRef } from 'react';

import { styled } from 'styled-components';

import { BodyShort, Heading } from '@navikt/ds-react';

import Dokumentasjonskrav from './Dokumentasjonskrav';
import { fjernVedlegg, leggTilVedlegg, opprettDokumentasjonsfelt } from './utils';
import VedleggManglerModal from './VedleggManglerModal';
import { usePerson } from '../../context/PersonContext';
import { useSpråk } from '../../context/SpråkContext';
import { typerVedleggTekster, vedleggTekster } from '../../tekster/vedlegg';
import { Dokument, DokumentasjonFelt, Dokumentasjonsbehov } from '../../typer/skjema';
import { hentBeskjedMedEttParameter } from '../../utils/tekster';
import { Filopplaster } from '../Filopplaster/Filopplaster';
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
    const { person } = usePerson();

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
            ref.current?.showModal();
            return false;
        }

        return true;
    };

    const finnBarnSomVedleggGjelder = (dokumentasjonsfelt: DokumentasjonFelt) => {
        return dokumentasjonsfelt?.barnId
            ? person.barn.find((barn) => barn.ident === dokumentasjonsfelt?.barnId)
            : undefined;
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
                        {dokumentasjon.map((dok) => (
                            <section key={dok.label}>
                                <Filopplaster
                                    opplastedeVedlegg={dok.opplastedeVedlegg}
                                    tittel={hentBeskjedMedEttParameter(
                                        finnBarnSomVedleggGjelder(dok)?.fornavn ?? '',
                                        typerVedleggTekster[dok.type].tittel[locale]
                                    )}
                                    beskrivelse={
                                        <LocaleTekst
                                            tekst={typerVedleggTekster[dok.type].beskrivelse}
                                            argument0={
                                                finnBarnSomVedleggGjelder(dok)?.fornavn ?? ''
                                            }
                                        />
                                    }
                                    leggTilDokument={(dokument: Dokument) =>
                                        leggTilDokument(dok, dokument)
                                    }
                                    slettDokument={(dokumentId) => slettDokument(dok, dokumentId)}
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

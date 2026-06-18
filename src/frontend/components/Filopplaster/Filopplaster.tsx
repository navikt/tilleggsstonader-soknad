import React, { useState } from 'react';

import styled from 'styled-components';

import {
    FileAccepted,
    FileObject,
    FileRejected,
    FileRejectionReason,
    FileUpload,
    Heading,
    VStack,
} from '@navikt/ds-react';

import { utledFeilmelding } from './feilmeldingOpplasting';
import {
    MAX_FILSTØRRELSE,
    TILLATE_FILENDELSER,
    TILLATTE_SAMTIDIGE_OPPLASTINGER,
} from './filopplasterUtils';
import { lastOppVedlegg } from '../../api/api';
import { useSpråk } from '../../context/SpråkContext';
import { fellesTekster } from '../../tekster/felles';
import { teksterFeilmeldinger } from '../../tekster/filopplasting';
import { vedleggTekster } from '../../tekster/vedlegg';
import { Dokument } from '../../typer/skjema';
import { LocaleTekst } from '../Teksthåndtering/LocaleTekst';

type AvslåttFil = FileRejected & { feil: unknown };
type FilAvslåttGrunn = FileRejectionReason | 'ukjent';

const FilListe = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Filopplaster: React.FC<{
    opplastedeVedlegg: Dokument[];
    tittel: string;
    beskrivelse?: string;
    leggTilDokument: (vedlegg: Dokument) => void;
    slettDokument: (vedlegg: Dokument) => void;
}> = ({ opplastedeVedlegg, tittel, beskrivelse, leggTilDokument, slettDokument }) => {
    const { locale } = useSpråk();
    const [avslåtteFiler, setAvslåtteFiler] = useState<AvslåttFil[]>([]);
    const [vedleggLastesOpp, settVedleggLastesOpp] = useState<FileAccepted[]>([]);

    const fjernFil = (filSomSkalFjernes: AvslåttFil) => {
        setAvslåtteFiler((prevState) => prevState.filter((fil) => fil !== filSomSkalFjernes));
    };

    const finnFeilmelding = (
        avslåttGrunn: FilAvslåttGrunn,
        err: unknown,
        filObjekt: FileObject
    ) => {
        if (avslåttGrunn === 'fileType') {
            return teksterFeilmeldinger.filtype[locale];
        }
        if (avslåttGrunn === 'fileSize') {
            return teksterFeilmeldinger.maksstørrelse[locale];
        }
        return utledFeilmelding(err, filObjekt.file, locale);
    };

    const lastOppValgteFiler = (filer: FileObject[]) => {
        settVedleggLastesOpp((prev) => [...prev, ...filer.filter((f) => !f.error)]);

        filer.forEach((filObjekt) => {
            if (filObjekt.error) {
                setAvslåtteFiler((prev) => [...prev, { ...filObjekt, feil: null }]);
                return;
            }

            const file = filObjekt.file;
            lastOppVedlegg(file)
                .then((id) => {
                    const previewUrl = URL.createObjectURL(file);
                    leggTilDokument({
                        id,
                        navn: file.name,
                        previewUrl,
                    });
                })
                .catch((err) => {
                    setAvslåtteFiler((prev) => [
                        ...prev,
                        {
                            file,
                            error: true,
                            feil: err,
                            reasons: ['ukjent'],
                        },
                    ]);
                })
                .finally(() => {
                    settVedleggLastesOpp((prev) => prev.filter((o) => o !== filObjekt));
                });
        });
    };
    const åpneFil = (dokument: Dokument) => {
        if (!dokument.previewUrl) return;
        window.open(dokument.previewUrl, '_blank', 'noopener,noreferrer');
    };
    return (
        <VStack gap="space-24">
            <FileUpload.Dropzone
                label={tittel}
                description={beskrivelse}
                accept={TILLATE_FILENDELSER}
                maxSizeInBytes={MAX_FILSTØRRELSE}
                fileLimit={{
                    max: TILLATTE_SAMTIDIGE_OPPLASTINGER,
                    current: opplastedeVedlegg.length,
                }}
                onSelect={lastOppValgteFiler}
            />
            {(opplastedeVedlegg.length > 0 || vedleggLastesOpp.length > 0) && (
                <VStack gap="space-8">
                    <Heading level="3" size="xsmall">
                        <LocaleTekst
                            tekst={fellesTekster.flere_vedlegg}
                            argument0={opplastedeVedlegg.length.toString()}
                        />
                    </Heading>
                    <FilListe>
                        {opplastedeVedlegg.map((dokument) => (
                            <FileUpload.Item
                                key={dokument.id}
                                file={{ name: dokument.navn }}
                                style={{
                                    marginBottom: '1rem',
                                    cursor: 'pointer',
                                }}
                                onClick={() => åpneFil(dokument)}
                                button={{
                                    action: 'delete',
                                    onClick: (e) => {
                                        e.stopPropagation();
                                        slettDokument(dokument);
                                    },
                                }}
                            />
                        ))}
                        {vedleggLastesOpp.map((vedlegg) => (
                            <FileUpload.Item
                                key={vedlegg.file.name}
                                file={{ name: vedlegg.file.name }}
                                style={{ marginBottom: '1rem' }}
                                status="uploading"
                                translations={{
                                    uploading: vedleggTekster.laster_opp[locale],
                                }}
                                button={{
                                    action: 'delete',
                                    onClick: () =>
                                        settVedleggLastesOpp((prev) =>
                                            prev.filter((v) => v !== vedlegg)
                                        ),
                                }}
                            />
                        ))}
                    </FilListe>
                </VStack>
            )}
            {avslåtteFiler.length > 0 && (
                <VStack gap="space-8">
                    <Heading level="3" size="xsmall">
                        <LocaleTekst tekst={fellesTekster.vedlegg_med_feil} />
                    </Heading>
                    <FilListe>
                        {avslåtteFiler.map((avslåttFil) => (
                            <FileUpload.Item
                                key={avslåttFil.file.name}
                                file={{ name: avslåttFil.file.name }}
                                style={{ marginBottom: '1rem' }}
                                error={finnFeilmelding(
                                    avslåttFil.reasons[0] as FilAvslåttGrunn,
                                    avslåttFil.feil,
                                    avslåttFil
                                )}
                                button={{
                                    action: 'delete',
                                    onClick: () => fjernFil(avslåttFil),
                                }}
                            />
                        ))}
                    </FilListe>
                </VStack>
            )}
        </VStack>
    );
};

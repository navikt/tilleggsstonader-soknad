import React, { useState } from 'react';

import {
    FileObject,
    FileRejected,
    FileRejectionReason,
    FileUpload,
    Heading,
    VStack,
} from '@navikt/ds-react';

import { utledFeilmelding } from './feilmeldingOpplasting';
import { MAX_FILSTØRRELSE, TILLATE_FILENDELSER, TILLATE_SAMTDIGE_OPPLASTINGER } from './utils';
import { lastOppVedlegg } from '../../api/api';
import { useSpråk } from '../../context/SpråkContext';
import { fellesTekster } from '../../tekster/felles';
import { teksterFeilmeldinger } from '../../tekster/filopplasting';
import { Dokument } from '../../typer/skjema';
import { TekstElement } from '../../typer/tekst';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

type AkseptertFil = FileObject & { dokumentId: string };
type AvslåttFil = FileRejected & { feil: unknown };
type FilObjekt = AkseptertFil | AvslåttFil;
type FilAvslåttGrunn = FileRejectionReason | 'ukjent';

const erFilObjektAkseptertFil = (fil: FilObjekt): fil is AkseptertFil => {
    return (fil as AkseptertFil).dokumentId !== undefined;
};

export const Filopplaster: React.FC<{
    tittel: string;
    beskrivelse: TekstElement<string>;
    leggTilDokument: (vedlegg: Dokument) => void;
    slettDokument: (vedlegg: Dokument) => void;
}> = ({ tittel, beskrivelse, leggTilDokument, slettDokument }) => {
    const { locale } = useSpråk();
    const [files, setFiles] = useState<FilObjekt[]>([]);

    const aksepterteFiler = files.filter((file) => !file.error);
    const avslåtteFiler = files.filter((f): f is AvslåttFil => f.error);

    const fjernFil = (filSomSkalFjernes: FilObjekt) => {
        if (erFilObjektAkseptertFil(filSomSkalFjernes)) {
            slettDokument({ id: filSomSkalFjernes.dokumentId, navn: filSomSkalFjernes.file.name });
        }
        setFiles(files.filter((fil) => fil !== filSomSkalFjernes));
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
        const nyeFiler: FilObjekt[] = [];
        filer.forEach((filObjekt) => {
            lastOppVedlegg(filObjekt.file)
                .then((id) => {
                    leggTilDokument({ id: id, navn: filObjekt.file.name });
                    nyeFiler.push({ ...filObjekt, dokumentId: id });
                })
                .catch((err) => {
                    const avslåttFil: AvslåttFil = {
                        file: filObjekt.file,
                        error: true,
                        feil: err,
                        reasons: ['ukjent'],
                    };
                    nyeFiler.push(avslåttFil);
                })
                .finally(() => {
                    setFiles([...files, ...nyeFiler]);
                });
        });
    };

    return (
        <VStack gap="6">
            <FileUpload.Dropzone
                label={tittel}
                description={<LocaleTekst tekst={beskrivelse} />}
                accept={TILLATE_FILENDELSER}
                maxSizeInBytes={MAX_FILSTØRRELSE}
                fileLimit={{ max: TILLATE_SAMTDIGE_OPPLASTINGER, current: aksepterteFiler.length }}
                onSelect={(nyeFiler) => lastOppValgteFiler(nyeFiler)}
            />

            {aksepterteFiler.length > 0 && (
                <VStack gap="2">
                    <Heading level="3" size="xsmall">
                        <LocaleTekst
                            tekst={fellesTekster.flere_vedlegg}
                            argument0={aksepterteFiler.length.toString()}
                        />
                    </Heading>
                    <VStack as="ul" gap="3">
                        {aksepterteFiler.map((file, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={file.file}
                                button={{
                                    action: 'delete',
                                    onClick: () => fjernFil(file),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}
            {avslåtteFiler.length > 0 && (
                <VStack gap="2">
                    <Heading level="3" size="xsmall">
                        <LocaleTekst tekst={fellesTekster.vedlegg_med_feil} />
                    </Heading>
                    <VStack as="ul" gap="3">
                        {avslåtteFiler.map((rejected, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={rejected.file}
                                error={finnFeilmelding(
                                    rejected.reasons[0] as FilAvslåttGrunn,
                                    rejected.feil,
                                    rejected
                                )}
                                button={{
                                    action: 'delete',
                                    onClick: () => fjernFil(rejected),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}
        </VStack>
    );
};

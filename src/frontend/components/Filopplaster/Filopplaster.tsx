import React, { useState } from 'react';

import styled from 'styled-components';

import {
    FileObject,
    FileRejected,
    FileRejectionReason,
    FileUpload,
    Heading,
    List,
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

type AvslåttFil = FileRejected & { feil: unknown };
type FilAvslåttGrunn = FileRejectionReason | 'ukjent';

const FilListe = styled(List).attrs({ as: 'ul' })`
    list-style-type: none;
    padding: 0;
`;

export const Filopplaster: React.FC<{
    opplastedeVedlegg: Dokument[];
    tittel: string;
    beskrivelse: TekstElement<string>;
    leggTilDokument: (vedlegg: Dokument) => void;
    slettDokument: (vedlegg: string) => void;
}> = ({ opplastedeVedlegg, tittel, beskrivelse, leggTilDokument, slettDokument }) => {
    const { locale } = useSpråk();
    const [avslåtteFiler, setAvslåtteFiler] = useState<AvslåttFil[]>([]);

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
        filer.forEach((filObjekt) => {
            if (!filObjekt.error) {
                lastOppVedlegg(filObjekt.file)
                    .then((id) => {
                        leggTilDokument({ id: id, navn: filObjekt.file.name });
                    })
                    .catch((err) => {
                        const avslåttFil: AvslåttFil = {
                            file: filObjekt.file,
                            error: true,
                            feil: err,
                            reasons: ['ukjent'],
                        };
                        setAvslåtteFiler((prevState) => [...prevState, avslåttFil]);
                    });
            } else {
                setAvslåtteFiler((prevState) => [...prevState, { ...filObjekt, feil: null }]);
            }
        });
    };

    return (
        <VStack gap="6">
            <FileUpload.Dropzone
                label={tittel}
                description={<LocaleTekst tekst={beskrivelse} />}
                accept={TILLATE_FILENDELSER}
                maxSizeInBytes={MAX_FILSTØRRELSE}
                fileLimit={{
                    max: TILLATE_SAMTDIGE_OPPLASTINGER,
                    current: opplastedeVedlegg.length,
                }}
                onSelect={(nyeFiler) => lastOppValgteFiler(nyeFiler)}
            />
            {opplastedeVedlegg.length > 0 && (
                <VStack gap="2">
                    <Heading level="3" size="xsmall">
                        <LocaleTekst
                            tekst={fellesTekster.flere_vedlegg}
                            argument0={opplastedeVedlegg.length.toString()}
                        />
                    </Heading>
                    <FilListe>
                        {opplastedeVedlegg.map((dokument, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={{ name: dokument.navn }}
                                style={{ marginBottom: '1rem' }}
                                button={{
                                    action: 'delete',
                                    onClick: () => slettDokument(dokument.id),
                                }}
                            />
                        ))}
                    </FilListe>
                </VStack>
            )}
            {avslåtteFiler.length > 0 && (
                <VStack gap="2">
                    <Heading level="3" size="xsmall">
                        <LocaleTekst tekst={fellesTekster.vedlegg_med_feil} />
                    </Heading>
                    <FilListe>
                        {avslåtteFiler.map((avslåttFil, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
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

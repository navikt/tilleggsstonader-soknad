import React, { RefObject } from 'react';

import { useNavigate } from 'react-router-dom';

import { BodyLong, Button, HStack, List, Modal } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../context/SpråkContext';
import { vedleggModalTekster } from '../../tekster/vedlegg';

interface Props {
    innerRef: RefObject<HTMLDialogElement>;
    dokumenterSomMangler: string[];
}

const VedleggManglerModal: React.FC<Props> = ({ innerRef, dokumenterSomMangler }) => {
    const { locale } = useSpråk();
    const navigate = useNavigate();

    return (
        <Modal ref={innerRef} header={{ heading: vedleggModalTekster.heading[locale] }}>
            <Modal.Body>
                <HStack gap="6">
                    <List title={vedleggModalTekster.punktliste_tittel[locale]}>
                        {dokumenterSomMangler.map((dokument, indeks) => (
                            <List.Item key={indeks}>{dokument}</List.Item>
                        ))}
                    </List>
                    <BodyLong>
                        <LocaleTekst tekst={vedleggModalTekster.ekstra_info1} />
                    </BodyLong>
                    <BodyLong>
                        <LocaleTekst tekst={vedleggModalTekster.ekstra_info2} />
                    </BodyLong>
                    <BodyLong size="large" weight="semibold">
                        <LocaleTekst tekst={vedleggModalTekster.vil_du_fortsette} />
                    </BodyLong>
                </HStack>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={() => navigate('/pass-av-barn/oppsummering')}>
                    <LocaleTekst tekst={vedleggModalTekster.fortsettKnapp} />
                </Button>
                <Button type="button" variant="secondary" onClick={() => innerRef.current?.close()}>
                    <LocaleTekst tekst={vedleggModalTekster.avbrytKnapp} />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VedleggManglerModal;

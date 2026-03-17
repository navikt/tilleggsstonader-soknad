import React, { RefObject } from 'react';

import { useNavigate } from 'react-router-dom';

import { BodyLong, Box, Button, Heading, HStack, List, Modal } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { vedleggModalTekster } from '../../tekster/vedlegg';
import { finnOppsummeringRoute } from '../../utils/routeUtils';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

interface Props {
    innerRef: RefObject<HTMLDialogElement | null>;
    dokumenterSomMangler: string[];
}

const VedleggManglerModal: React.FC<Props> = ({ innerRef, dokumenterSomMangler }) => {
    const { locale } = useSpråk();
    const { stønadstype } = useSøknad();
    const navigate = useNavigate();

    return (
        <Modal ref={innerRef} header={{ heading: vedleggModalTekster.heading[locale] }}>
            <Modal.Body>
                <HStack gap="space-24">
                    <div>
                        <Heading as="h3" size="small">
                            {vedleggModalTekster.punktliste_tittel[locale]}
                        </Heading>
                        <Box marginBlock="space-16" asChild>
                            <List>
                                {dokumenterSomMangler.map((dokument, indeks) => (
                                    <List.Item key={indeks}>{dokument}</List.Item>
                                ))}
                            </List>
                        </Box>
                    </div>
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
                <Button type="button" onClick={() => navigate(finnOppsummeringRoute(stønadstype))}>
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

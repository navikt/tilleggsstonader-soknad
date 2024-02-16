import React from 'react';

import { Accordion, Label } from '@navikt/ds-react';

import LocalePunktliste from './Teksthåndtering/LocalePunktliste';
import LocaleTekst from './Teksthåndtering/LocaleTekst';
import { vedleggTekster } from '../barnetilsyn/tekster/vedlegg';

const VedleggGenerellInfo = () => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <LocaleTekst
                        tekst={
                            vedleggTekster.accordians.har_ikke_vedlegg_digital
                                .har_ikke_vedlegg_digital
                        }
                    />
                </Accordion.Header>
                <Accordion.Content>
                    <Label>
                        <LocaleTekst
                            tekst={vedleggTekster.accordians.har_ikke_vedlegg_digital.slik_ta_bilde}
                        />
                    </Label>
                    <LocalePunktliste
                        innhold={vedleggTekster.accordians.har_ikke_vedlegg_digital.instruksjoner}
                    />
                    <Label>
                        <LocaleTekst
                            tekst={
                                vedleggTekster.accordians.har_ikke_vedlegg_digital.ettet_tatt_bilde
                            }
                        />
                    </Label>
                    <LocalePunktliste
                        innhold={
                            vedleggTekster.accordians.har_ikke_vedlegg_digital.instruksjoner_etter
                        }
                    />
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <LocaleTekst tekst={vedleggTekster.accordians.format_kvalitet.tittel} />
                </Accordion.Header>
                <Accordion.Content>
                    <LocaleTekst tekst={vedleggTekster.accordians.format_kvalitet.innhold} />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default VedleggGenerellInfo;

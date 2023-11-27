import React, { useState } from 'react';

import { styled } from 'styled-components';

import { UploadIcon } from '@navikt/aksel-icons';
import { Accordion, BodyLong, BodyShort, Button, Heading, Label } from '@navikt/ds-react';

import Filopplaster from '../../../components/Filopplaster/Filopplaster';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocalePunktliste from '../../../components/Teksthåndtering/LocalePunktliste';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Dokument, DokumentasjonFelt, Vedleggstype } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { vedleggTekster } from '../../tekster/vedlegg';

const StyledKnapp = styled(Button)`
    width: max-content;
    margin-top: 1rem;
`;

const VedleggContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 1rem 0;
`;

const Vedlegg = () => {
    const { dokumentasjon, settDokumentasjon } = useSøknad();
    const { locale } = useSpråk();
    const [nyDokumentasjon, settNyDokumentasjon] = useState<DokumentasjonFelt[]>(
        dokumentasjon.length
            ? dokumentasjon
            : [
                  {
                      type: Vedleggstype.EKSEMPEL,
                      label: vedleggTekster.typerVedlegg[Vedleggstype.EKSEMPEL].label[locale],
                      harSendtInn: false,
                      opplastedeVedlegg: [],
                  },
              ]
    );

    return (
        <Side
            stønadstype={Stønadstype.barnetilsyn}
            stegtittel={vedleggTekster.steg_tittel}
            oppdaterSøknad={() => settDokumentasjon(nyDokumentasjon)}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={vedleggTekster.innhold_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={vedleggTekster.guide_innhold} />
            </PellePanel>
            <VedleggContainer>
                <section>
                    <Heading size={'small'}>
                        <LocaleTekst tekst={vedleggTekster.pass_ronja_espen} />
                    </Heading>
                    <BodyShort>
                        <LocaleTekst tekst={vedleggTekster.du_må_legge_ved} />
                    </BodyShort>
                    <LocalePunktliste innhold={vedleggTekster.vedlegg_espen_ronja} />
                    <BodyShort>
                        <LocaleTekst tekst={vedleggTekster.samlet_faktura} />
                    </BodyShort>
                    <LocaleReadMore tekst={vedleggTekster.faktura_lesmer} />
                    <Filopplaster
                        dokumentasjonFelt={nyDokumentasjon[0]}
                        oppdaterVedlegg={(dokument: Dokument[]) => {
                            settNyDokumentasjon([
                                { ...nyDokumentasjon[0], opplastedeVedlegg: dokument },
                            ]);
                        }}
                    />
                </section>
                <section>
                    <Heading size={'small'}>
                        <LocaleTekst tekst={vedleggTekster.legeerklæring_espen_tittel} />
                    </Heading>
                    <BodyLong>
                        <LocaleTekst tekst={vedleggTekster.legeerklæring_espen} />
                    </BodyLong>
                    <StyledKnapp icon={<UploadIcon title="a11y-title" />}>
                        <LocaleTekst tekst={vedleggTekster.last_opp_legeerklæring} />
                    </StyledKnapp>
                </section>
            </VedleggContainer>
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
                                tekst={
                                    vedleggTekster.accordians.har_ikke_vedlegg_digital.slik_ta_bilde
                                }
                            />
                        </Label>
                        <LocalePunktliste
                            innhold={
                                vedleggTekster.accordians.har_ikke_vedlegg_digital.instruksjoner
                            }
                        />
                        <Label>
                            <LocaleTekst
                                tekst={
                                    vedleggTekster.accordians.har_ikke_vedlegg_digital
                                        .ettet_tatt_bilde
                                }
                            />
                        </Label>
                        <LocalePunktliste
                            innhold={
                                vedleggTekster.accordians.har_ikke_vedlegg_digital
                                    .instruksjoner_etter
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
        </Side>
    );
};

export default Vedlegg;

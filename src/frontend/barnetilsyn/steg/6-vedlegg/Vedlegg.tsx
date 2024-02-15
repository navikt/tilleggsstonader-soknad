import { useState } from 'react';

import { styled } from 'styled-components';

import { Accordion, Heading, Label } from '@navikt/ds-react';

import VedleggFelt from '../../../components/Filopplaster/VedleggFelt';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocalePunktliste from '../../../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSøknad } from '../../../context/SøknadContext';
import { Dokument, DokumentasjonFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { typerVedleggTekster, vedleggTekster } from '../../tekster/vedlegg';

const VedleggContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 1rem 0;
`;

const Vedlegg = () => {
    const { dokumentasjon, settDokumentasjon } = useSøknad();
    const [nyDokumentasjon, settNyDokumentasjon] = useState<DokumentasjonFelt[]>(dokumentasjon);

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
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
                {nyDokumentasjon.map((dok, indeks) => (
                    <section key={indeks}>
                        <VedleggFelt
                            vedlegg={typerVedleggTekster[dok.type]}
                            argument0={dok.barnId} // TODO: Oppdater med barnets navn hentet på id
                            dokumentasjonFelt={nyDokumentasjon[indeks]}
                            oppdaterVedlegg={(dokument: Dokument[]) => {
                                const nyDokumentasjonListe = [...nyDokumentasjon];
                                nyDokumentasjonListe[indeks] = {
                                    ...nyDokumentasjonListe[indeks],
                                    opplastedeVedlegg: dokument,
                                };
                                settNyDokumentasjon(nyDokumentasjonListe);
                            }}
                        />
                    </section>
                ))}
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

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ChevronLeftIcon, PaperclipIcon } from '@navikt/aksel-icons';
import {
    Accordion,
    BodyLong,
    BodyShort,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    Label,
} from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleReadMore from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSøknad } from '../../../context/SøknadContext';
import { JaNeiTilTekst } from '../../../tekster/felles';
import { Stønadstype } from '../../../typer/stønadstyper';
import { formaterAdresse, formaterIsoDato, hentFornavn } from '../../../utils/formatering';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import {
    barnepassTekster,
    PassTypeTilTekst,
    ÅrsakEkstraPassTilTekst,
} from '../../tekster/barnepass';
import { YtelseTilTekst } from '../../tekster/hovedytelse';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { personaliaTekster } from '../../tekster/personalia';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
`;

const Oppsummering = () => {
    const { hovedytelse, barnMedBarnepass } = useSøknad();
    const { person } = usePerson();
    const navigate = useNavigate();

    const [harBekreftet, settHarBekreftet] = useState(false);
    const [feil, settFeil] = useState<string>('');

    return (
        <Side
            stegtittel={oppsummeringTekster.steg_tittel}
            stønadstype={Stønadstype.barnetilsyn}
            validerSteg={() => {
                if (!harBekreftet) {
                    settFeil('Du må bekrefte for å sende inn søknaden');
                    return false;
                }
                settFeil('');
                return true;
            }}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={oppsummeringTekster.steg_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={oppsummeringTekster.guide_innhold} />
            </PellePanel>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={oppsummeringTekster.accordians.om_deg.tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <FlexDiv>
                            <div>
                                <Label>
                                    <LocaleTekst tekst={personaliaTekster.adresse_label} />
                                </Label>
                                <BodyShort>{formaterAdresse(person.adresse)}</BodyShort>
                                <LocaleReadMore tekst={personaliaTekster.adresse_lesmer} />
                            </div>
                            <div>
                                <Label>
                                    <LocaleTekst tekst={personaliaTekster.telefonnr_label} />
                                </Label>
                                <BodyShort>{person.telefonnr}</BodyShort>
                            </div>
                            <div>
                                <Label>
                                    <LocaleTekst tekst={personaliaTekster.epost_label} />
                                </Label>
                                <BodyShort>{person.epost}</BodyShort>
                                <LocaleReadMore tekst={personaliaTekster.tlf_epost_lesmer} />
                            </div>
                            <div>
                                <Label>
                                    <LocaleTekst tekst={personaliaTekster.kontonr_label} />
                                </Label>
                                <BodyShort>{person.epost}</BodyShort>
                                <LocaleReadMore tekst={personaliaTekster.kontonr_lesmer} />
                            </div>
                        </FlexDiv>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={oppsummeringTekster.accordians.ytelse.tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Label>
                            <LocaleTekst tekst={oppsummeringTekster.accordians.ytelse.label} />
                        </Label>
                        {hovedytelse && (
                            <BodyShort>
                                <LocaleTekst tekst={YtelseTilTekst[hovedytelse.ytelse]} />
                            </BodyShort>
                        )}
                        <Button
                            variant={'tertiary'}
                            onClick={() => navigate(RouteTilPath.HOVEDYTELSE)}
                            iconPosition="left"
                            icon={<ChevronLeftIcon aria-hidden />}
                        >
                            <LocaleTekst
                                tekst={oppsummeringTekster.accordians.ytelse.endre_button}
                            />
                        </Button>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst
                            tekst={oppsummeringTekster.accordians.aktivitet_utdanning.tittel}
                        />
                    </Accordion.Header>
                    <Accordion.Content>
                        {/*TODO: Hardkodet*/}
                        <Label>Utdanning</Label>
                        <BodyShort>Livets skole</BodyShort>
                        <BodyShort>Universitetsgaten 22</BodyShort>
                        <BodyLong spacing>2004 Lillestrøm</BodyLong>

                        <BodyShort>1. januar 2023 - 30. juni 2026</BodyShort>
                        <Button
                            variant={'tertiary'}
                            onClick={() => navigate(RouteTilPath.AKTIVITET)}
                            iconPosition="left"
                            icon={<ChevronLeftIcon aria-hidden />}
                        >
                            <LocaleTekst
                                tekst={
                                    oppsummeringTekster.accordians.aktivitet_utdanning.endre_button
                                }
                            />
                        </Button>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={oppsummeringTekster.accordians.dine_barn.tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Label>
                            <LocaleTekst tekst={oppsummeringTekster.accordians.dine_barn.label} />
                        </Label>
                        {person.barn
                            .filter((barn) => barn.skalHaBarnepass)
                            .map((barn) => (
                                <BodyShort key={barn.id}>
                                    {barn.navn}, født {formaterIsoDato(barn.fødselsdato)}
                                </BodyShort>
                            ))}
                        <Button
                            variant={'tertiary'}
                            onClick={() => navigate(RouteTilPath.DINE_BARN)}
                            iconPosition="left"
                            icon={<ChevronLeftIcon aria-hidden />}
                        >
                            <LocaleTekst
                                tekst={oppsummeringTekster.accordians.dine_barn.endre_button}
                            />
                        </Button>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={oppsummeringTekster.accordians.barnepass.tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <FlexDiv>
                            {barnMedBarnepass.map((barnepass) => {
                                const barn = person.barn.find(
                                    (barn) => barn.id === barnepass.barnId
                                );
                                return barn ? (
                                    <div key={barnepass.barnId}>
                                        <Label>
                                            <LocaleTekst
                                                tekst={barnepassTekster.hvem_passer_radio.header}
                                                argument0={hentFornavn(barn.navn)}
                                            />
                                        </Label>
                                        <BodyShort>
                                            <LocaleTekst
                                                tekst={PassTypeTilTekst[barnepass.passType]}
                                            />
                                        </BodyShort>
                                        {barn.alder >= 9 && (
                                            <>
                                                <Label>
                                                    <LocaleTekst
                                                        tekst={
                                                            barnepassTekster.startet_femte_radio
                                                                .header
                                                        }
                                                        argument0={hentFornavn(barn.navn)}
                                                    />
                                                </Label>
                                                <BodyShort>
                                                    <LocaleTekst
                                                        tekst={
                                                            barnepass.startetIFemte
                                                                ? JaNeiTilTekst.ja
                                                                : JaNeiTilTekst.nei
                                                        }
                                                    />
                                                </BodyShort>
                                                <Label>
                                                    <LocaleTekst
                                                        tekst={
                                                            barnepassTekster.årsak_ekstra_pass_radio
                                                                .header
                                                        }
                                                        argument0={hentFornavn(barn.navn)}
                                                    />
                                                </Label>
                                                {barnepass.årsakBarnepass && (
                                                    <BodyShort>
                                                        <LocaleTekst
                                                            tekst={
                                                                ÅrsakEkstraPassTilTekst[
                                                                    barnepass.årsakBarnepass
                                                                ]
                                                            }
                                                        />
                                                    </BodyShort>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ) : null;
                            })}
                            <Button
                                variant={'tertiary'}
                                onClick={() => navigate(RouteTilPath.BARNEPASS)}
                                iconPosition="left"
                                icon={<ChevronLeftIcon aria-hidden />}
                            >
                                <LocaleTekst
                                    tekst={oppsummeringTekster.accordians.barnepass.endre_button}
                                />
                            </Button>
                        </FlexDiv>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={oppsummeringTekster.accordians.vedlegg.tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <Label spacing>
                            <LocaleTekst tekst={oppsummeringTekster.accordians.vedlegg.label} />
                        </Label>
                        {/*TODO: Hardkodet*/}
                        <BodyLong>Faktura på pass for Espen og Ronja</BodyLong>
                        <BodyLong>
                            <PaperclipIcon /> barnehage.pdf
                        </BodyLong>
                        <BodyLong spacing>
                            <PaperclipIcon /> sfo.pdf
                        </BodyLong>

                        <BodyLong>Legeerklæring for Espen</BodyLong>
                        <BodyLong spacing>
                            <PaperclipIcon /> legen.pdf
                        </BodyLong>
                        <Button
                            variant={'tertiary'}
                            onClick={() => navigate(RouteTilPath.VEDLEGG)}
                            iconPosition="left"
                            icon={<ChevronLeftIcon aria-hidden />}
                        >
                            <LocaleTekst
                                tekst={oppsummeringTekster.accordians.vedlegg.endre_button}
                            />
                        </Button>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>

            <CheckboxGroup
                value={[harBekreftet]}
                onChange={(verdier) => {
                    settHarBekreftet(verdier.includes(true));
                    settFeil('');
                }}
                legend={<LocaleTekst tekst={oppsummeringTekster.bekreft_checkboks} />}
                hideLegend
                error={feil}
            >
                <Checkbox value={true} error={!!feil}>
                    <LocaleTekst tekst={oppsummeringTekster.bekreft_checkboks} />
                </Checkbox>
            </CheckboxGroup>
        </Side>
    );
};

export default Oppsummering;

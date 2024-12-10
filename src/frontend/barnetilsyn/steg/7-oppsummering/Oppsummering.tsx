import React from 'react';

import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ChevronLeftIcon, PaperclipIcon } from '@navikt/aksel-icons';
import { Accordion, BodyLong, BodyShort, Button, Heading, Label, VStack } from '@navikt/ds-react';
import { AccordionItemProps } from '@navikt/ds-react/esm/accordion/AccordionItem';

import ArbeidOgOppholdOppsummering from './ArbeidOgOppholdOppsummering';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocalePunktliste from '../../../components/Teksthåndtering/LocalePunktliste';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { usePerson } from '../../../context/PersonContext';
import { JaNeiTilTekst } from '../../../tekster/felles';
import { Barn, Barnepass } from '../../../typer/barn';
import { Person } from '../../../typer/person';
import { DokumentasjonFelt } from '../../../typer/skjema';
import { Aktivitet, Hovedytelse } from '../../../typer/søknad';
import { TekstElement } from '../../../typer/tekst';
import { formaterIsoDato } from '../../../utils/formatering';
import { verdiFelterTilTekstElement } from '../../../utils/tekster';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import {
    barnepassTekster,
    PassTypeTilTekst,
    ÅrsakEkstraPassTilTekst,
} from '../../tekster/barnepass';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
`;

interface Props extends AccordionItemProps {
    header: TekstElement<string>;
    endreKnapp?: {
        route: string;
        tekst: TekstElement<string>;
    };
}
const AccordionItem: React.FC<Props> = ({ header, endreKnapp, children, ...props }) => {
    const navigate = useNavigate();
    return (
        <Accordion.Item {...props}>
            <Accordion.Header>
                <LocaleTekst tekst={header} />
            </Accordion.Header>

            <Accordion.Content>
                <VStack gap={'5'}>{children}</VStack>
                {endreKnapp && (
                    <Button
                        variant={'tertiary'}
                        onClick={() => navigate(endreKnapp.route)}
                        iconPosition="left"
                        icon={<ChevronLeftIcon aria-hidden />}
                    >
                        <LocaleTekst tekst={endreKnapp.tekst} />
                    </Button>
                )}
            </Accordion.Content>
        </Accordion.Item>
    );
};

const OmDeg: React.FC<{ person: Person }> = ({ person }) => (
    <AccordionItem header={oppsummeringTekster.accordians.om_deg.tittel} defaultOpen>
        <FlexDiv>
            <div>
                <Label>
                    <LocaleTekst tekst={oppsummeringTekster.accordians.om_deg.navn_label} />
                </Label>
                <BodyShort>{person.visningsnavn}</BodyShort>
            </div>
            <div>
                <Label>
                    <LocaleTekst tekst={oppsummeringTekster.accordians.om_deg.adresse_label} />
                </Label>
                <BodyShort>{person.adresse}</BodyShort>
                <LocaleReadMoreMedLenke
                    tekst={oppsummeringTekster.accordians.om_deg.adresse_lesmer}
                />
            </div>
        </FlexDiv>
    </AccordionItem>
);

const DinSituasjon: React.FC<{ hovedytelse: Hovedytelse | undefined }> = ({ hovedytelse }) => {
    const ytelser = hovedytelse && verdiFelterTilTekstElement(hovedytelse.ytelse.verdier);
    const ytelseslabel = hovedytelse?.ytelse.label;

    return (
        <AccordionItem
            header={oppsummeringTekster.accordians.din_situasjon.tittel}
            endreKnapp={{
                route: RouteTilPath.HOVEDYTELSE,
                tekst: oppsummeringTekster.accordians.din_situasjon.endre_button,
            }}
        >
            {ytelser && <LocalePunktliste innhold={ytelser} tittel={{ nb: ytelseslabel || '' }} />}
            {hovedytelse && (
                <ArbeidOgOppholdOppsummering arbeidOgOpphold={hovedytelse.arbeidOgOpphold} />
            )}
        </AccordionItem>
    );
};

const ArbeidsrettetAktivitet: React.FC<{ aktivitet: Aktivitet | undefined }> = ({ aktivitet }) => {
    const aktiviteterSomTekstfelt =
        aktivitet &&
        aktivitet.aktiviteter &&
        verdiFelterTilTekstElement(aktivitet.aktiviteter.verdier);

    const aktiviteterLabel = aktivitet?.aktiviteter?.label;
    const annenAktivitetLabel = aktivitet?.annenAktivitet?.label;
    const lønnetAktivitetLabel = aktivitet?.lønnetAktivitet?.label;

    return (
        <AccordionItem
            header={oppsummeringTekster.accordians.arbeidsrettet_aktivitet.tittel}
            endreKnapp={{
                route: RouteTilPath.AKTIVITET,
                tekst: oppsummeringTekster.accordians.arbeidsrettet_aktivitet.endre_button,
            }}
        >
            {aktiviteterSomTekstfelt && (
                <LocalePunktliste
                    innhold={aktiviteterSomTekstfelt}
                    tittel={{ nb: aktiviteterLabel || '' }}
                />
            )}
            <Label>
                <LocaleTekst tekst={{ nb: annenAktivitetLabel || '' }} />
            </Label>
            {aktivitet?.annenAktivitet?.svarTekst}
            <Label>
                <LocaleTekst tekst={{ nb: lønnetAktivitetLabel || '' }} />
            </Label>
            {aktivitet?.lønnetAktivitet?.svarTekst}
        </AccordionItem>
    );
};

const DineBarn: React.FC<{ person: Person; valgteBarnIdenter: string[] }> = ({
    person,
    valgteBarnIdenter,
}) => (
    <AccordionItem
        header={oppsummeringTekster.accordians.dine_barn.tittel}
        endreKnapp={{
            route: RouteTilPath.DINE_BARN,
            tekst: oppsummeringTekster.accordians.dine_barn.endre_button,
        }}
    >
        <Label>
            <LocaleTekst tekst={oppsummeringTekster.accordians.dine_barn.label} />
        </Label>
        {person.barn
            .filter((barn) => valgteBarnIdenter.some((ident) => ident === barn.ident))
            .map((barn) => (
                <BodyShort key={barn.ident}>
                    {barn.visningsnavn}, født {formaterIsoDato(barn.fødselsdato)}
                </BodyShort>
            ))}
    </AccordionItem>
);

const BarnOver9År: React.FC<{ barn: Barn; barnepass: Barnepass }> = ({ barn, barnepass }) => (
    <>
        <Label>
            <LocaleTekst
                tekst={barnepassTekster.startet_femte_radio.header}
                argument0={barn.fornavn}
            />
        </Label>
        <BodyShort spacing>
            <LocaleTekst tekst={barnepass.startetIFemte ? JaNeiTilTekst.JA : JaNeiTilTekst.NEI} />
        </BodyShort>
        {barnepass.årsak && (
            <>
                <Label>
                    <LocaleTekst
                        tekst={barnepassTekster.årsak_ekstra_pass_radio.header}
                        argument0={barn.fornavn}
                    />
                </Label>
                <BodyShort spacing>
                    <LocaleTekst tekst={ÅrsakEkstraPassTilTekst[barnepass.årsak.verdi]} />
                </BodyShort>
            </>
        )}
    </>
);

const PassAvBarn: React.FC<{ person: Person; barnMedBarnepass: Barnepass[] }> = ({
    person,
    barnMedBarnepass,
}) => (
    <AccordionItem
        header={oppsummeringTekster.accordians.barnepass.tittel}
        endreKnapp={{
            route: RouteTilPath.BARNEPASS,
            tekst: oppsummeringTekster.accordians.barnepass.endre_button,
        }}
    >
        <FlexDiv>
            {barnMedBarnepass.map((barnepass) => {
                const barn = person.barn.find((barn) => barn.ident === barnepass.ident);
                return barn ? (
                    <div key={barnepass.ident}>
                        <Label>
                            <LocaleTekst
                                tekst={barnepassTekster.hvem_passer_radio.header}
                                argument0={barn.fornavn}
                            />
                        </Label>
                        <BodyShort spacing>
                            <LocaleTekst tekst={PassTypeTilTekst[barnepass.type.verdi]} />
                        </BodyShort>
                        {barn.alder >= 9 && <BarnOver9År barn={barn} barnepass={barnepass} />}
                    </div>
                ) : null;
            })}
        </FlexDiv>
    </AccordionItem>
);

const Vedlegg: React.FC<{ dokumentasjon: DokumentasjonFelt[] }> = ({ dokumentasjon }) => (
    <AccordionItem
        header={oppsummeringTekster.accordians.vedlegg.tittel}
        endreKnapp={{
            route: RouteTilPath.VEDLEGG,
            tekst: oppsummeringTekster.accordians.vedlegg.endre_button,
        }}
    >
        {dokumentasjon.map((dokumentasjonsfelt, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
                <Label>{dokumentasjonsfelt.label}</Label>
                {dokumentasjonsfelt.opplastedeVedlegg.map((vedlegg) => (
                    <BodyLong key={vedlegg.id}>
                        <PaperclipIcon /> {vedlegg.navn}
                    </BodyLong>
                ))}
            </div>
        ))}
    </AccordionItem>
);

const Oppsummering = () => {
    const { hovedytelse, aktivitet, valgteBarnIdenter, barnMedBarnepass, dokumentasjon } =
        usePassAvBarnSøknad();
    const { person } = usePerson();

    return (
        <Side>
            <Heading size={'medium'}>
                <LocaleTekst tekst={oppsummeringTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={oppsummeringTekster.guide_innhold} />
            </PellePanel>
            <Accordion>
                <OmDeg person={person} />
                <DinSituasjon hovedytelse={hovedytelse} />
                <ArbeidsrettetAktivitet aktivitet={aktivitet} />
                <DineBarn person={person} valgteBarnIdenter={valgteBarnIdenter} />
                <PassAvBarn person={person} barnMedBarnepass={barnMedBarnepass} />
                <Vedlegg dokumentasjon={dokumentasjon} />
            </Accordion>
        </Side>
    );
};

export default Oppsummering;

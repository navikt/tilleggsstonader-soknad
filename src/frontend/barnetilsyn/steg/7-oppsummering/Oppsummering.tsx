import React, { useState } from 'react';

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
import LocalePunktliste from '../../../components/Teksthåndtering/LocalePunktliste';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSøknad } from '../../../context/SøknadContext';
import { JaNeiTilTekst } from '../../../tekster/felles';
import { Barn, Barnepass } from '../../../typer/barn';
import { Person } from '../../../typer/person';
import { DokumentasjonFelt } from '../../../typer/skjema';
import { Stønadstype } from '../../../typer/stønadstyper';
import { Hovedytelse } from '../../../typer/søknad';
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

const AccordionItem: React.FC<{
    header: TekstElement<string>;
    endreKnapp?: {
        route: string;
        tekst: TekstElement<string>;
    };
    children: React.ReactNode;
}> = ({ header, endreKnapp, children }) => {
    const navigate = useNavigate();
    return (
        <Accordion.Item>
            <Accordion.Header>
                <LocaleTekst tekst={header} />
            </Accordion.Header>

            <Accordion.Content>
                <div>{children}</div>
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
    <AccordionItem header={oppsummeringTekster.accordians.om_deg.tittel}>
        <FlexDiv>
            <div>
                <Label>
                    <LocaleTekst tekst={oppsummeringTekster.accordians.om_deg.adresse_label} />
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

    const boddSammenhengende = hovedytelse?.boddSammenhengende;
    const planleggerBoINorgeNeste12mnd = hovedytelse?.planleggerBoINorgeNeste12mnd;
    // TODO: Hent ut svar om arbeid i eller utenfor norge også. Radiofeltene finnes ikke per nå.

    return (
        <AccordionItem
            header={oppsummeringTekster.accordians.din_situasjon.tittel}
            endreKnapp={{
                route: RouteTilPath.HOVEDYTELSE,
                tekst: oppsummeringTekster.accordians.din_situasjon.endre_button,
            }}
        >
            {ytelser && <LocalePunktliste innhold={ytelser} tittel={{ nb: ytelseslabel || '' }} />}
            {boddSammenhengende && (
                <>
                    <Label>{boddSammenhengende.label}</Label>
                    <BodyShort spacing>{boddSammenhengende.svarTekst}</BodyShort>
                </>
            )}
            {planleggerBoINorgeNeste12mnd && (
                <>
                    <Label>{planleggerBoINorgeNeste12mnd.label}</Label>
                    <BodyShort spacing>{planleggerBoINorgeNeste12mnd.svarTekst}</BodyShort>
                </>
            )}
        </AccordionItem>
    );
};

const AktivitetUtdanning: React.FC = () => (
    <AccordionItem
        header={oppsummeringTekster.accordians.aktivitet_utdanning.tittel}
        endreKnapp={{
            route: RouteTilPath.AKTIVITET,
            tekst: oppsummeringTekster.accordians.aktivitet_utdanning.endre_button,
        }}
    >
        {/*TODO: Legg inn tekster for aktivitet når vi får på plass radioknapper.*/}
        <BodyShort>
            Her skal det komme tekst som er avhengig av hovedytelse og valgt aktivitet.
        </BodyShort>
    </AccordionItem>
);

const DineBarn: React.FC<{ person: Person }> = ({ person }) => (
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
            .filter((barn) => barn.skalHaBarnepass)
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
        <BodyShort>
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
                <BodyShort>
                    <LocaleTekst tekst={ÅrsakEkstraPassTilTekst[barnepass.årsak.verdi]} />
                </BodyShort>
            </>
        )}
    </>
);

const BarnMedBarnepass: React.FC<{ person: Person; barnMedBarnepass: Barnepass[] }> = ({
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
                        <BodyShort>
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
        <Label spacing>
            <LocaleTekst tekst={oppsummeringTekster.accordians.vedlegg.label} />
        </Label>
        {dokumentasjon.map((d, i) => (
            <React.Fragment key={i}>
                <BodyLong>{d.label}</BodyLong>
                {d.opplastedeVedlegg.map((vedlegg) => (
                    <BodyLong spacing key={vedlegg.id}>
                        <PaperclipIcon /> {vedlegg.navn}
                    </BodyLong>
                ))}
            </React.Fragment>
        ))}
    </AccordionItem>
);

const Oppsummering = () => {
    const { hovedytelse, barnMedBarnepass, dokumentasjon } = useSøknad();
    const { person } = usePerson();
    const [harBekreftet, settHarBekreftet] = useState(false);
    const [feil, settFeil] = useState<string>('');

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
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
                <LocaleTekst tekst={oppsummeringTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={oppsummeringTekster.guide_innhold} />
            </PellePanel>
            <Accordion>
                <OmDeg person={person} />
                <DinSituasjon hovedytelse={hovedytelse} />
                <AktivitetUtdanning />
                <DineBarn person={person} />
                <BarnMedBarnepass person={person} barnMedBarnepass={barnMedBarnepass} />
                <Vedlegg dokumentasjon={dokumentasjon} />
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

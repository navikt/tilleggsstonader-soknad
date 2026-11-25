import React from 'react';

import styled from 'styled-components';

import {
    ArrowRightLeftIcon,
    BankNoteIcon,
    BoatIcon,
    CarIcon,
    CheckmarkIcon,
    HouseIcon,
    LocationPinIcon,
    ParkingIcon,
    PersonGroupIcon,
    RaindropIcon,
    ReceiptIcon,
    RoadblockIcon,
    SnowIcon,
    TrainIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, Label, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import { useSpråk } from '../../../context/SpråkContext';
import { Samling } from '../../../typer/søknad';
import { adressefelterTilVisning } from '../../../utils/adresseUtils';
import { formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { samlingerTekster } from '../../tekster/samlinger';

const SamlingBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

const IkonKolonne = styled(Box)`
    width: 1.5rem;
    display: inline-flex;
    justify-content: center;
    padding-top: 0.25rem;
`;

const SpørsmålRad = styled.div`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    column-gap: 0.5rem;
    align-items: start;
`;

const SpørsmålMedSvar: React.FC<{
    ikon?: React.ReactNode;
    spørsmål: string;
    svar: React.ReactNode;
}> = ({ ikon, spørsmål, svar }) => (
    <VStack gap="space-4">
        <SpørsmålRad>
            <IkonKolonne aria-hidden as="span">
                {ikon}
            </IkonKolonne>
            <Label>{spørsmål}</Label>
        </SpørsmålRad>
        <Box paddingInline="space-40">{svar}</Box>
    </VStack>
);

const AvkryssetSvarRad = styled.div`
    display: grid;
    grid-template-columns: 1.5rem minmax(0, 1fr);
    column-gap: 0.5rem;
    align-items: start;
`;

const AvkryssetSvar: React.FC<{ tekst: string }> = ({ tekst }) => (
    <AvkryssetSvarRad>
        <IkonKolonne aria-hidden as="span">
            <CheckmarkIcon aria-hidden />
        </IkonKolonne>
        <BodyShort>{tekst}</BodyShort>
    </AvkryssetSvarRad>
);

const AvkryssetSvarListe: React.FC<{ verdier: string[] }> = ({ verdier }) => (
    <VStack gap="space-4">
        {verdier.map((verdi) => (
            <AvkryssetSvar key={verdi} tekst={verdi} />
        ))}
    </VStack>
);

export const LagretSamlingVisning: React.FC<{
    samling: Samling;
    visSlett: boolean;
    onRediger: () => void;
    onSlett?: () => void;
}> = ({ samling, visSlett, onRediger, onSlett }) => {
    const { locale } = useSpråk();

    const adresseTekst = adressefelterTilVisning({
        gateadresse: samling.adresse?.gateadresse?.verdi,
        postnummer: samling.adresse?.postnummer?.verdi,
        poststed: samling.adresse?.poststed?.verdi,
        land: samling.adresse?.land?.verdi,
    });

    const transportmidler = samling.reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier ?? [];
    const unntakFraOffentligTransport = samling.reisemåte?.unntakFraOffentligTransport?.årsaker;
    const leveringOgHentingIBarnehage =
        samling.reisemåte?.unntakFraOffentligTransport?.leveringOgHentingIBarnehage;
    const harValgtBarnehage = unntakFraOffentligTransport?.verdier.some(
        (valg) => valg.verdi === 'LEVERING_HENTING_I_BARNEHAGE'
    );
    const unntakFraPrivatBil = samling.reisemåte?.unntakFraPrivatBil;
    const privatBil = samling.reisemåte?.privatBil;
    const utgifterPrivatBil = privatBil?.utgifterPrivatBil;

    return (
        <SamlingBoks>
            <VStack gap="space-16">
                {samling.fom?.verdi && samling.tom?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<LocationPinIcon aria-hidden />}
                        spørsmål={samlingerTekster.dato.label[locale]}
                        svar={
                            <BodyShort>
                                {formaterPeriodeTekstlig(samling.fom.verdi, samling.tom.verdi)}
                            </BodyShort>
                        }
                    />
                )}

                {samling.erObligatorisk?.svarTekst && (
                    <SpørsmålMedSvar
                        ikon={<PersonGroupIcon aria-hidden />}
                        spørsmål={samling.erObligatorisk.label}
                        svar={<AvkryssetSvar tekst={samling.erObligatorisk.svarTekst} />}
                    />
                )}

                {samling._brukSammeAdresseSomForrige?.svarTekst && (
                    <SpørsmålMedSvar
                        ikon={<HouseIcon aria-hidden />}
                        spørsmål={samling._brukSammeAdresseSomForrige.label}
                        svar={
                            <AvkryssetSvar tekst={samling._brukSammeAdresseSomForrige.svarTekst} />
                        }
                    />
                )}

                {samling.antallKilometerEnVei?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<ArrowRightLeftIcon aria-hidden />}
                        spørsmål={samling.antallKilometerEnVei.label}
                        svar={<BodyShort>{`${samling.antallKilometerEnVei.verdi} km`}</BodyShort>}
                    />
                )}

                {adresseTekst && (
                    <SpørsmålMedSvar
                        ikon={<HouseIcon aria-hidden />}
                        spørsmål={samlingerTekster.adresse_tittel[locale]}
                        svar={<BodyShort>{adresseTekst}</BodyShort>}
                    />
                )}

                {transportmidler.length > 0 && (
                    <SpørsmålMedSvar
                        ikon={<TrainIcon aria-hidden />}
                        spørsmål={samling.reisemåte?.hvilkeTransportmidlerBleBenyttet?.label || ''}
                        svar={
                            <AvkryssetSvarListe
                                verdier={transportmidler.map((valg) => valg.label)}
                            />
                        }
                    />
                )}

                {unntakFraOffentligTransport?.verdier.length ? (
                    <SpørsmålMedSvar
                        ikon={<TrainIcon aria-hidden />}
                        spørsmål={unntakFraOffentligTransport.label}
                        svar={
                            <AvkryssetSvarListe
                                verdier={unntakFraOffentligTransport.verdier.map(
                                    (valg) => valg.label
                                )}
                            />
                        }
                    />
                ) : null}

                {harValgtBarnehage && leveringOgHentingIBarnehage?.gateadresse?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<LocationPinIcon aria-hidden />}
                        spørsmål={leveringOgHentingIBarnehage.gateadresse.label}
                        svar={
                            <BodyShort>{leveringOgHentingIBarnehage.gateadresse.verdi}</BodyShort>
                        }
                    />
                )}

                {harValgtBarnehage && leveringOgHentingIBarnehage?.postnummer?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<LocationPinIcon aria-hidden />}
                        spørsmål={leveringOgHentingIBarnehage.postnummer.label}
                        svar={<BodyShort>{leveringOgHentingIBarnehage.postnummer.verdi}</BodyShort>}
                    />
                )}

                {unntakFraPrivatBil?.verdier.length ? (
                    <SpørsmålMedSvar
                        ikon={<CarIcon aria-hidden />}
                        spørsmål={unntakFraPrivatBil.label}
                        svar={
                            <AvkryssetSvarListe
                                verdier={unntakFraPrivatBil.verdier.map((valg) => valg.label)}
                            />
                        }
                    />
                ) : null}

                {samling.reisemåte?.offentligTransport?.totalUtgifterOffentligTransport?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<ReceiptIcon aria-hidden />}
                        spørsmål={
                            samling.reisemåte.offentligTransport.totalUtgifterOffentligTransport
                                .label
                        }
                        svar={
                            <BodyShort>
                                {`${samling.reisemåte.offentligTransport.totalUtgifterOffentligTransport.verdi} kr`}
                            </BodyShort>
                        }
                    />
                )}

                {privatBil?.benyttetEgenBil?.svarTekst && (
                    <SpørsmålMedSvar
                        ikon={<CarIcon aria-hidden />}
                        spørsmål={privatBil.benyttetEgenBil.label}
                        svar={<AvkryssetSvar tekst={privatBil.benyttetEgenBil.svarTekst} />}
                    />
                )}

                {privatBil?.betalteForReisen?.svarTekst && (
                    <SpørsmålMedSvar
                        ikon={<BankNoteIcon aria-hidden />}
                        spørsmål={privatBil.betalteForReisen.label}
                        svar={<AvkryssetSvar tekst={privatBil.betalteForReisen.svarTekst} />}
                    />
                )}

                {privatBil?.infoBilKunDelerAvStrekning?.strekningHvorBilBleBenyttet?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<CarIcon aria-hidden />}
                        spørsmål={
                            privatBil.infoBilKunDelerAvStrekning.strekningHvorBilBleBenyttet.label
                        }
                        svar={
                            <BodyShort>
                                {
                                    privatBil.infoBilKunDelerAvStrekning.strekningHvorBilBleBenyttet
                                        .verdi
                                }
                            </BodyShort>
                        }
                    />
                )}

                {privatBil?.infoBilKunDelerAvStrekning?.antallKilometerKjørt?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<CarIcon aria-hidden />}
                        spørsmål={privatBil.infoBilKunDelerAvStrekning.antallKilometerKjørt.label}
                        svar={
                            <BodyShort>
                                {`${privatBil.infoBilKunDelerAvStrekning.antallKilometerKjørt.verdi} km`}
                            </BodyShort>
                        }
                    />
                )}

                {utgifterPrivatBil?.parkering?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<ParkingIcon aria-hidden />}
                        spørsmål={utgifterPrivatBil.parkering.label}
                        svar={<BodyShort>{`${utgifterPrivatBil.parkering.verdi} kr`}</BodyShort>}
                    />
                )}

                {utgifterPrivatBil?.bompenger?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<RoadblockIcon aria-hidden />}
                        spørsmål={utgifterPrivatBil.bompenger.label}
                        svar={<BodyShort>{`${utgifterPrivatBil.bompenger.verdi} kr`}</BodyShort>}
                    />
                )}

                {utgifterPrivatBil?.ferge?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<BoatIcon aria-hidden />}
                        spørsmål={utgifterPrivatBil.ferge.label}
                        svar={<BodyShort>{`${utgifterPrivatBil.ferge.verdi} kr`}</BodyShort>}
                    />
                )}

                {utgifterPrivatBil?.piggdekkavgift?.verdi && (
                    <SpørsmålMedSvar
                        ikon={<SnowIcon aria-hidden />}
                        spørsmål={utgifterPrivatBil.piggdekkavgift.label}
                        svar={
                            <BodyShort>{`${utgifterPrivatBil.piggdekkavgift.verdi} kr`}</BodyShort>
                        }
                    />
                )}

                {utgifterPrivatBil?.drivstoffType?.svarTekst && (
                    <SpørsmålMedSvar
                        ikon={<RaindropIcon aria-hidden />}
                        spørsmål={utgifterPrivatBil.drivstoffType.label}
                        svar={<BodyShort>{utgifterPrivatBil.drivstoffType.svarTekst}</BodyShort>}
                    />
                )}

                {samling.reisemåte?.drosje?.harTTKort?.svarTekst && (
                    <SpørsmålMedSvar
                        ikon={<CarIcon aria-hidden />}
                        spørsmål={samling.reisemåte.drosje.harTTKort.label}
                        svar={
                            <AvkryssetSvar tekst={samling.reisemåte.drosje.harTTKort.svarTekst} />
                        }
                    />
                )}

                <HStack gap="space-16">
                    <Button variant="secondary" data-color="neutral" onClick={onRediger}>
                        {samlingerTekster.knapp_rediger[locale]}
                    </Button>
                    {visSlett && onSlett && (
                        <Button variant="tertiary" data-color="neutral" onClick={onSlett}>
                            {samlingerTekster.knapp_slett[locale]}
                        </Button>
                    )}
                </HStack>
            </VStack>
        </SamlingBoks>
    );
};

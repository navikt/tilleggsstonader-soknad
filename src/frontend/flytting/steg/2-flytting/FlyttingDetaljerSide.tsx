import { BodyLong, Heading, InlineMessage, VStack } from '@navikt/ds-react';

import {
    adresseFeilIder,
    adresseFraFeilIder,
    errorKeySkalFlytteFraFolkeregistrertAdresse,
    feilId,
    validerFlyttingDetaljer,
} from './validering';
import { AdresseVelger } from '../../../components/AdresseVelger/AdresseVelger';
import { AlertIkkeRett } from '../../../components/AlertIkkeRett';
import { DateInput } from '../../../components/DateInput';
import { Side } from '../../../components/Side';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { LocaleTextField } from '../../../components/Teksthåndtering/LocaleTextField';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Person } from '../../../typer/person';
import { EnumFelt, VerdiFelt } from '../../../typer/skjema';
import { Adresse, JaNei } from '../../../typer/søknad';
import { InputFelt } from '../../../typer/tekst';
import { inneholderFeil } from '../../../typer/validering';
import { mapAdresse } from '../../../utils/adresseUtils';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';
import { flyttingDetaljerTekster as tekster } from '../../tekster/flyttingDetaljer';
import {
    egenutgiftFelter,
    flyttebyråTilbudIndekser,
    FlyttingDetaljer,
} from '../../typer/flyttingDetaljer';

export const FlyttingDetaljerSide = () => {
    const { flyttingDetaljer: detaljer, settFlyttingDetaljer } = useFlyttingSøknad();
    const { person } = usePerson();
    const { locale } = useSpråk();
    const { valideringsfeil: feil, settValideringsfeil } = useValideringsfeil();
    const manglerFolkeregistrertAdresse = !erStrukturertAdresseDefinert(person);

    const fjernFeil = (...felter: string[]) =>
        settValideringsfeil((tidligere) =>
            Object.fromEntries(
                Object.entries(tidligere).filter(
                    ([id]) => !felter.some((felt) => feilId(felt) === id)
                )
            )
        );

    const oppdater = <K extends keyof FlyttingDetaljer>(felt: K, verdi: FlyttingDetaljer[K]) => {
        settFlyttingDetaljer((tidligere) => ({ ...tidligere, [felt]: verdi }));
        fjernFeil(felt);
    };

    const verdiFelt = (verdi: string, tekst: InputFelt): VerdiFelt<string> | undefined =>
        verdi.trim() ? { verdi, label: tekst.label[locale] } : undefined;

    const validerSteg = () => {
        const nyeFeil = validerFlyttingDetaljer(detaljer, locale, manglerFolkeregistrertAdresse);
        settValideringsfeil(nyeFeil);
        const harFeil = inneholderFeil(nyeFeil);
        if (!harFeil && manglerFolkeregistrertAdresse) {
            settFlyttingDetaljer((tidligere) => ({
                ...tidligere,
                skalFlytteFraFolkeregistrertAdresse: svarNeiFlytterIkkeFraFolkeregistrertAdresse(),
            }));
        }
        return !harFeil;
    };

    const svarNeiFlytterIkkeFraFolkeregistrertAdresse = (): EnumFelt<JaNei> => {
        const radio = tekster.radio_skalFlytteFraFolkeregistrertAdresse;
        return {
            label: radio.header[locale],
            verdi: 'NEI',
            alternativer: Object.values(radio.alternativer).map((alternativ) => alternativ[locale]),
            svarTekst: radio.alternativer.NEI[locale],
        };
    };

    const håndterSkalFlytteFraFolkeregistrertAdresse = (felt: EnumFelt<JaNei>) => {
        settFlyttingDetaljer((tidligere) => ({
            ...tidligere,
            skalFlytteFraFolkeregistrertAdresse: felt,
            adresseDetSkalFlyttesFra: felt.verdi === 'JA' ? mapAdresse(person) : undefined,
        }));
        fjernFeil(
            'skalFlytteFraFolkeregistrertAdresse',
            'adresseFra_land',
            'adresseFra_gateadresse',
            'adresseFra_postnummer',
            'adresseFra_poststed'
        );
    };

    const håndterAdresseFraEndring = (verdi: Partial<Adresse>, felt: keyof Adresse) => {
        settFlyttingDetaljer((tidligere) => ({
            ...tidligere,
            adresseDetSkalFlyttesFra: { ...tidligere?.adresseDetSkalFlyttesFra, ...verdi },
        }));
        fjernFeil(`adresseFra_${felt}`);
    };

    return (
        <Side validerSteg={validerSteg}>
            <Heading size="medium" level="2">
                <LocaleTekst tekst={tekster.tittel} />
            </Heading>
            <LocaleRadioGroup
                id={feilId('årsak')}
                tekst={tekster.radio_årsak}
                value={detaljer?.årsak?.verdi ?? ''}
                error={feil[feilId('årsak')]?.melding}
                onChange={(verdi) => {
                    oppdater('årsak', verdi);
                }}
            />
            {detaljer?.årsak?.verdi === 'NY_JOBB' && (
                <InlineMessage status="info">
                    <LocaleTekst tekst={tekster.varsel_arbeidskontrakt} />
                </InlineMessage>
            )}
            <DateInput
                id={feilId('flyttedato')}
                label={tekster.dato_flytting.label[locale]}
                description={tekster.dato_flytting.description?.[locale]}
                value={detaljer?.flyttedato?.verdi}
                onChange={(verdi) =>
                    oppdater(
                        'flyttedato',
                        verdi ? { verdi, label: tekster.dato_flytting.label[locale] } : undefined
                    )
                }
                error={feil[feilId('flyttedato')]?.melding}
            />
            {manglerFolkeregistrertAdresse ? (
                <VStack gap="space-16">
                    <Heading size="small" level="3">
                        <LocaleTekst tekst={tekster.adresse_fra_tittel} />
                    </Heading>
                    <AdresseVelger
                        adresse={detaljer?.adresseDetSkalFlyttesFra}
                        tekster={tekster.adresse_fra_spørsmål}
                        feil={feil}
                        feilIder={adresseFraFeilIder}
                        onChange={håndterAdresseFraEndring}
                    />
                </VStack>
            ) : (
                <VStack gap="space-16">
                    <InlineMessage status="info">
                        <LocaleTekst tekst={tekster.folkereg_adresse} argument0={person.adresse} />
                    </InlineMessage>
                    <LocaleRadioGroup
                        id={errorKeySkalFlytteFraFolkeregistrertAdresse}
                        tekst={tekster.radio_skalFlytteFraFolkeregistrertAdresse}
                        value={detaljer?.skalFlytteFraFolkeregistrertAdresse?.verdi ?? ''}
                        error={feil[errorKeySkalFlytteFraFolkeregistrertAdresse]?.melding}
                        onChange={håndterSkalFlytteFraFolkeregistrertAdresse}
                    />
                    {detaljer?.skalFlytteFraFolkeregistrertAdresse?.verdi === 'NEI' && (
                        <VStack gap="space-16">
                            <Heading size="small" level="3">
                                <LocaleTekst tekst={tekster.adresse_fra_tittel} />
                            </Heading>
                            <AdresseVelger
                                adresse={detaljer.adresseDetSkalFlyttesFra}
                                tekster={tekster.adresse_fra_spørsmål}
                                feil={feil}
                                feilIder={adresseFraFeilIder}
                                onChange={håndterAdresseFraEndring}
                            />
                        </VStack>
                    )}
                </VStack>
            )}
            <VStack gap="space-16">
                <Heading size="small" level="3">
                    <LocaleTekst tekst={tekster.adresse_tittel} />
                </Heading>
                <AdresseVelger
                    adresse={detaljer?.adresse}
                    tekster={tekster.adresse_spørsmål}
                    feil={feil}
                    feilIder={adresseFeilIder}
                    onChange={(verdi, felt) => {
                        settFlyttingDetaljer((tidligere) => ({
                            ...tidligere,
                            adresse: { ...tidligere?.adresse, ...verdi },
                        }));
                        fjernFeil(`adresse_${felt}`);
                    }}
                />
            </VStack>
            <LocaleRadioGroup
                id={feilId('flyttemåte')}
                tekst={tekster.radio_flyttemåte}
                value={detaljer?.flyttemåte?.verdi ?? ''}
                error={feil[feilId('flyttemåte')]?.melding}
                onChange={(verdi) => {
                    oppdater('flyttemåte', verdi);
                    fjernFeil(
                        ...(verdi.verdi === 'FLYTTEBYRÅ'
                            ? ['avstand', ...egenutgiftFelter]
                            : [
                                  ...flyttebyråTilbudIndekser.flatMap((index) => [
                                      `tilbud${index + 1}_navn`,
                                      `tilbud${index + 1}_beløp`,
                                  ]),
                              ])
                    );
                }}
            />
            {detaljer?.flyttemåte && (
                <InlineMessage status="info">
                    <LocaleTekst
                        tekst={
                            detaljer.flyttemåte.verdi === 'FLYTTER_SELV'
                                ? tekster.varsel_dokumentasjon_flytter_selv
                                : tekster.varsel_dokumentasjon_flyttebyrå
                        }
                    />
                </InlineMessage>
            )}
            <LocaleRadioGroup
                id={feilId('utgifterDekketPåAnnenMåte')}
                tekst={tekster.radio_annen_dekning}
                value={detaljer?.utgifterDekketPåAnnenMåte?.verdi ?? ''}
                error={feil[feilId('utgifterDekketPåAnnenMåte')]?.melding}
                onChange={(verdi) => oppdater('utgifterDekketPåAnnenMåte', verdi)}
            />
            {detaljer?.utgifterDekketPåAnnenMåte?.verdi === 'JA' && (
                <AlertIkkeRett beskrivelse={tekster.varsel_annen_dekning} />
            )}
            {detaljer?.flyttemåte?.verdi === 'FLYTTER_SELV' && (
                <UnderspørsmålContainer>
                    <VStack gap="space-16">
                        <Heading size="small" level="3">
                            <LocaleTekst tekst={tekster.egenutgifter_tittel} />
                        </Heading>
                        {(['avstand', ...egenutgiftFelter] as const).map((felt) => {
                            const tekst =
                                felt === 'avstand'
                                    ? tekster.antall_km
                                    : tekster.egenutgifter_beløp[felt];
                            return (
                                <LocaleTextField
                                    key={felt}
                                    id={feilId(felt)}
                                    tekst={tekst}
                                    inputMode="decimal"
                                    htmlSize={12}
                                    value={detaljer.utgifterEgenFlytting?.[felt]?.verdi ?? ''}
                                    error={feil[feilId(felt)]?.melding}
                                    onChange={(event) => {
                                        const verdi = verdiFelt(event.target.value, tekst);
                                        settFlyttingDetaljer((tidligere) => ({
                                            ...tidligere,
                                            utgifterEgenFlytting: {
                                                ...tidligere?.utgifterEgenFlytting,
                                                [felt]: verdi,
                                            },
                                        }));
                                        fjernFeil(felt);
                                    }}
                                />
                            );
                        })}
                    </VStack>
                </UnderspørsmålContainer>
            )}
            {detaljer?.flyttemåte?.verdi === 'FLYTTEBYRÅ' && (
                <UnderspørsmålContainer>
                    <VStack gap="space-24">
                        <Heading size="small" level="3">
                            <LocaleTekst tekst={tekster.tilbud_tittel} />
                        </Heading>
                        <BodyLong>
                            <LocaleTekst tekst={tekster.info_tilbud} />
                        </BodyLong>
                        {flyttebyråTilbudIndekser.map((index) => (
                            <VStack key={index} gap="space-16">
                                {(['navn', 'beløp'] as const).map((felt) => {
                                    const feltId = `tilbud${index + 1}_${felt}`;
                                    const tekst = tekster.tilbud_spørsmål[index][felt];
                                    return (
                                        <LocaleTextField
                                            key={felt}
                                            id={feilId(feltId)}
                                            tekst={tekst}
                                            inputMode={felt === 'beløp' ? 'decimal' : 'text'}
                                            htmlSize={felt === 'beløp' ? 12 : undefined}
                                            maxLength={felt === 'navn' ? 200 : undefined}
                                            value={
                                                detaljer.flyttebyrå?.tilbud[index]?.[felt]?.verdi ??
                                                ''
                                            }
                                            error={feil[feilId(feltId)]?.melding}
                                            onChange={(event) => {
                                                const verdi = verdiFelt(event.target.value, tekst);
                                                settFlyttingDetaljer((tidligere) => ({
                                                    ...tidligere,
                                                    flyttebyrå: {
                                                        ...tidligere?.flyttebyrå,
                                                        tilbud: flyttebyråTilbudIndekser.map(
                                                            (tilbudIndex) => ({
                                                                ...tidligere?.flyttebyrå?.tilbud[
                                                                    tilbudIndex
                                                                ],
                                                                ...(tilbudIndex === index && {
                                                                    [felt]: verdi,
                                                                }),
                                                            })
                                                        ),
                                                    },
                                                }));
                                                fjernFeil(feltId);
                                            }}
                                        />
                                    );
                                })}
                            </VStack>
                        ))}
                    </VStack>
                </UnderspørsmålContainer>
            )}
        </Side>
    );
};

function erStrukturertAdresseDefinert(person: Person): boolean {
    if (person.strukturertAdresse === undefined) {
        return false;
    }
    return Object.values(person.strukturertAdresse).some((felt) => felt != null);
}

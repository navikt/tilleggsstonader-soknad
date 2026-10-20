import { Heading, BodyLong, VStack } from '@navikt/ds-react';

import { DatoInput } from './DatoInput';
import {
    adresseFeilIder,
    feilId,
    harValgtDyrereTilbud,
    validerFlyttingDetaljer,
} from './validering';
import { AdresseVelger } from '../../../components/AdresseVelger/AdresseVelger';
import { AlertIkkeRett } from '../../../components/AlertIkkeRett';
import { Side } from '../../../components/Side';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { LocaleTextField } from '../../../components/Teksthåndtering/LocaleTextField';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { VerdiFelt } from '../../../typer/skjema';
import { InputFelt } from '../../../typer/tekst';
import { inneholderFeil } from '../../../typer/validering';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';
import { flyttingDetaljerTekster as tekster } from '../../tekster/flyttingDetaljer';
import { egenutgiftFelter, FlyttingDetaljer } from '../../typer/flyttingDetaljer';

export const FlyttingDetaljerSide = () => {
    const { flyttingDetaljer: detaljer, settFlyttingDetaljer } = useFlyttingSøknad();
    const { locale } = useSpråk();
    const { valideringsfeil: feil, settValideringsfeil } = useValideringsfeil();

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
        const nyeFeil = validerFlyttingDetaljer(detaljer, locale);
        settValideringsfeil(nyeFeil);
        return !inneholderFeil(nyeFeil);
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
                    // TODO: Vurder å rydde første arbeidsdag ved bytte til aktivitet.
                    oppdater('årsak', verdi);
                    if (verdi.verdi === 'AKTIVITET') fjernFeil('førsteArbeidsdag');
                }}
            />
            <DatoInput
                id={feilId('flyttedato')}
                tekst={tekster.dato_flytting}
                verdi={detaljer?.flyttedato}
                onChange={(verdi) => oppdater('flyttedato', verdi)}
                error={feil[feilId('flyttedato')]?.melding}
            />
            {detaljer?.årsak?.verdi === 'NY_JOBB' && (
                <DatoInput
                    id={feilId('førsteArbeidsdag')}
                    tekst={tekster.dato_første_arbeidsdag}
                    verdi={detaljer.førsteArbeidsdag}
                    onChange={(verdi) => oppdater('førsteArbeidsdag', verdi)}
                    error={feil[feilId('førsteArbeidsdag')]?.melding}
                />
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
                    // TODO: Vurder å rydde utgifter og tilbud i den inaktive grenen.
                    oppdater('flyttemåte', verdi);
                    fjernFeil(
                        ...(verdi.verdi === 'FLYTTEBYRÅ'
                            ? ['avstand', ...egenutgiftFelter]
                            : [
                                  'tilbud1_navn',
                                  'tilbud1_beløp',
                                  'tilbud2_navn',
                                  'tilbud2_beløp',
                                  'valgtTilbud',
                              ])
                    );
                }}
            />
            <LocaleRadioGroup
                id={feilId('utgifterDekketPåAnnenMåte')}
                tekst={tekster.radio_annen_dekning}
                value={detaljer?.utgifterDekketPåAnnenMåte?.verdi ?? ''}
                error={feil[feilId('utgifterDekketPåAnnenMåte')]?.melding}
                onChange={(verdi) => oppdater('utgifterDekketPåAnnenMåte', verdi)}
            />
            {detaljer?.flyttemåte?.verdi === 'FLYTTER_SELV' && (
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
            )}
            {detaljer?.flyttemåte?.verdi === 'FLYTTEBYRÅ' && (
                <VStack gap="space-24">
                    <Heading size="small" level="3">
                        <LocaleTekst tekst={tekster.tilbud_tittel} />
                    </Heading>
                    <BodyLong>
                        <LocaleTekst tekst={tekster.info_tilbud} />
                    </BodyLong>
                    {(['tilbud1', 'tilbud2'] as const).map((tilbud) => (
                        <VStack key={tilbud} gap="space-16">
                            {(['navn', 'beløp'] as const).map((felt) => (
                                <LocaleTextField
                                    key={felt}
                                    id={feilId(`${tilbud}_${felt}`)}
                                    tekst={tekster[`${tilbud}_spørsmål`][felt]}
                                    inputMode={felt === 'beløp' ? 'decimal' : 'text'}
                                    value={detaljer.flyttebyrå?.[tilbud]?.[felt]?.verdi ?? ''}
                                    error={feil[feilId(`${tilbud}_${felt}`)]?.melding}
                                    onChange={(event) => {
                                        const verdi = verdiFelt(
                                            event.target.value,
                                            tekster[`${tilbud}_spørsmål`][felt]
                                        );
                                        settFlyttingDetaljer((tidligere) => ({
                                            ...tidligere,
                                            flyttebyrå: {
                                                ...tidligere?.flyttebyrå,
                                                [tilbud]: {
                                                    ...tidligere?.flyttebyrå?.[tilbud],
                                                    [felt]: verdi,
                                                },
                                            },
                                        }));
                                        fjernFeil(`${tilbud}_${felt}`);
                                    }}
                                />
                            ))}
                        </VStack>
                    ))}
                    <LocaleRadioGroup
                        id={feilId('valgtTilbud')}
                        tekst={tekster.radio_valgt_tilbud}
                        value={detaljer.flyttebyrå?.valgtTilbud?.verdi ?? ''}
                        error={feil[feilId('valgtTilbud')]?.melding}
                        onChange={(verdi) => {
                            oppdater('flyttebyrå', { ...detaljer.flyttebyrå, valgtTilbud: verdi });
                            fjernFeil('valgtTilbud');
                        }}
                    />
                    {harValgtDyrereTilbud(detaljer.flyttebyrå) && (
                        <AlertIkkeRett beskrivelse={tekster.advarsel_dyrere_tilbud} />
                    )}
                </VStack>
            )}
        </Side>
    );
};

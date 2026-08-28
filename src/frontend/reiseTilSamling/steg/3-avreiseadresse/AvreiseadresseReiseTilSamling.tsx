import { BodyShort, InlineMessage, Link, TextField, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';
// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';
import styled from 'styled-components';
import { Landvelger } from '../../../components/Landvelger/Landvelger';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import type { EnumFelt } from '../../../typer/skjema';
import type { JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';
import { avreiseadresseTekster } from '../../tekster/avreiseadresse';
import {
    errorKeyAvreiseGateadresse,
    errorKeyAvreiseLand,
    errorKeyAvreisePostnummer,
    errorKeyAvreisePoststed,
    errorKeySkalReiseFraFolkeregAdr,
    validerAvreiseadresse
} from './validering';

const AdresseBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

const PostnummerFelt = styled(TextField)`
    max-width: 6rem;
`;

export const AvreiseadresseReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { avreiseadresse, settAvreiseadresse, settAdresseDetSkalReisesFra } =
        useReiseTilSamlingSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (verdi !== undefined && verdi !== '') {
            settValideringsfeil((prev) => ({ ...prev, [errorKey]: undefined }));
        }
    };

    const kanFortsette = (): boolean => {
        const feil = validerAvreiseadresse(avreiseadresse, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSkalReiseFraFolkeregAdr = (felt: EnumFelt<JaNei>) => {
        settAvreiseadresse((prev) => ({
            ...prev,
            skalReiseFraFolkeregistrertAdresse: felt,
            adresseDetSkalReisesFra: felt.verdi === 'NEI' ? prev.adresseDetSkalReisesFra : undefined
        }));
        settValideringsfeil((prev) => ({ ...prev, [errorKeySkalReiseFraFolkeregAdr]: undefined }));
    };

    const skalReiseFraFolkeregAdr = avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi;

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={avreiseadresseTekster.tittel} level="2" size="medium" />
            <VStack gap="space-8">
                <BodyShort spacing>
                    <LocaleTekst
                        tekst={avreiseadresseTekster.folkereg_adresse}
                        argument0={person.adresse}
                    />
                </BodyShort>
                <InlineMessage status="info">
                    <BodyShort spacing>
                        {avreiseadresseTekster.avreiseadresse_fra_folkereg_info[locale]}
                        <Link
                            href={avreiseadresseTekster.avreiseadresse_fra_folkereg_lenke_url}
                            target="_blank"
                            inlineText
                            rel="noopener noreferrer"
                        >
                            {avreiseadresseTekster.avreiseadresse_fra_folkereg_lenke_tekst[locale]}
                        </Link>
                        .
                    </BodyShort>
                </InlineMessage>
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeySkalReiseFraFolkeregAdr]?.id}
                    tekst={avreiseadresseTekster.radio_skalReiseFraFolkeregAdr}
                    value={avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi ?? ''}
                    onChange={oppdaterSkalReiseFraFolkeregAdr}
                    error={valideringsfeil[errorKeySkalReiseFraFolkeregAdr]?.melding}
                />
                {skalReiseFraFolkeregAdr === 'NEI' && (
                    <VStack gap="space-4" style={{ marginBottom: 'var(--a-spacing-2)' }}>
                        <BodyShort weight="semibold">
                            {avreiseadresseTekster.avreiseadresse_tittel[locale]}
                        </BodyShort>
                        <AdresseBoks>
                            <VStack gap="space-16">
                                <Landvelger
                                    id={valideringsfeil[errorKeyAvreiseLand]?.id}
                                    label={avreiseadresseTekster.velg_land_label}
                                    value={avreiseadresse.adresseDetSkalReisesFra?.land?.verdi}
                                    onChange={(verdi) => {
                                        settAdresseDetSkalReisesFra({ land: verdi });
                                        nullstillFeil(verdi.verdi, errorKeyAvreiseLand);
                                    }}
                                    medNorskeOmråder={true}
                                    error={valideringsfeil[errorKeyAvreiseLand]?.melding}
                                    defaultNorge
                                />
                                <TextField
                                    id={valideringsfeil[errorKeyAvreiseGateadresse]?.id}
                                    label={
                                        avreiseadresseTekster.avreiseadresse_vegadresse_label[
                                            locale
                                        ]
                                    }
                                    value={
                                        avreiseadresse.adresseDetSkalReisesFra?.gateadresse
                                            ?.verdi ?? ''
                                    }
                                    error={valideringsfeil[errorKeyAvreiseGateadresse]?.melding}
                                    onChange={(e) => {
                                        const verdi = e.target.value;
                                        settAdresseDetSkalReisesFra({
                                            gateadresse: {
                                                label: avreiseadresseTekster
                                                    .avreiseadresse_vegadresse_label[locale],
                                                verdi
                                            }
                                        });
                                        nullstillFeil(verdi, errorKeyAvreiseGateadresse);
                                    }}
                                />
                                <PostnummerFelt
                                    id={valideringsfeil[errorKeyAvreisePostnummer]?.id}
                                    label={
                                        avreiseadresseTekster.avreiseadresse_postnummer_label[
                                            locale
                                        ]
                                    }
                                    value={
                                        avreiseadresse.adresseDetSkalReisesFra?.postnummer?.verdi ??
                                        ''
                                    }
                                    error={valideringsfeil[errorKeyAvreisePostnummer]?.melding}
                                    inputMode="numeric"
                                    onChange={(e) => {
                                        const verdi = e.target.value;
                                        settAdresseDetSkalReisesFra({
                                            postnummer: {
                                                label: avreiseadresseTekster
                                                    .avreiseadresse_postnummer_label[locale],
                                                verdi
                                            }
                                        });
                                        nullstillFeil(verdi, errorKeyAvreisePostnummer);
                                    }}
                                />
                                <TextField
                                    id={valideringsfeil[errorKeyAvreisePoststed]?.id}
                                    label={
                                        avreiseadresseTekster.avreiseadresse_poststed_label[locale]
                                    }
                                    value={
                                        avreiseadresse.adresseDetSkalReisesFra?.poststed?.verdi ??
                                        ''
                                    }
                                    error={valideringsfeil[errorKeyAvreisePoststed]?.melding}
                                    onChange={(e) => {
                                        const verdi = e.target.value;
                                        settAdresseDetSkalReisesFra({
                                            poststed: {
                                                label: avreiseadresseTekster
                                                    .avreiseadresse_poststed_label[locale],
                                                verdi
                                            }
                                        });
                                        nullstillFeil(verdi, errorKeyAvreisePoststed);
                                    }}
                                />
                            </VStack>
                        </AdresseBoks>
                    </VStack>
                )}
            </VStack>
        </Side>
    );
};

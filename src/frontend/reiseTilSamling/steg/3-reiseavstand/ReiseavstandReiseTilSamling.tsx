import React from 'react';

import styled from 'styled-components';

import { BodyShort, InlineMessage, Link, TextField, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import {
    errorKeyAntallKm,
    errorKeyAvreiseGateadresse,
    errorKeyAvreiseLand,
    errorKeyAvreisePostnummer,
    errorKeyAvreisePoststed,
    errorKeyGateadresse,
    errorKeyLand,
    errorKeyPostnummer,
    errorKeyPoststed,
    errorKeySkalReiseFraFolkeregAdr,
    validerReiseavstand,
} from './validering';
import { Landvelger } from '../../../components/Landvelger/Landvelger';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { reiseavstandTekster } from '../../tekster/reiseavstand';

const AdresseBoks = styled.div`
    background: ${BgSunken};
    padding: 1.5rem;
    border-radius: 4px;
`;

const PostnummerFelt = styled(TextField)`
    max-width: 6rem;
`;

const KmFelt = styled(TextField)`
    input {
        width: 6rem;
    }
`;

export const ReiseavstandReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { reiseavstand, settReiseavstand, settAktivitetsadresse, settAdresseDuSkalReiseFra } =
        useReiseTilSamlingSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const nullstillFeil = (verdi: string | undefined, errorKey: string) => {
        if (verdi !== undefined && verdi !== '') {
            settValideringsfeil((prev) => ({ ...prev, [errorKey]: undefined }));
        }
    };

    const kanFortsette = (): boolean => {
        const feil = validerReiseavstand(reiseavstand, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSkalReiseFraFolkeregAdr = (verdi: EnumFelt<JaNei>) => {
        settReiseavstand((prev) => ({
            ...prev,
            skalReiseFraFolkeregAdr: verdi,
            adresseDuSkalReiseFra: verdi.verdi === 'JA' ? undefined : prev.adresseDuSkalReiseFra,
        }));
        settValideringsfeil((prev) => ({ ...prev, [errorKeySkalReiseFraFolkeregAdr]: undefined }));
    };

    const skalReiseFraFolkeregAdr = reiseavstand.skalReiseFraFolkeregAdr?.verdi;

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={reiseavstandTekster.tittel} level="2" size="medium" />
            <VStack gap="space-4">
                <BodyShort spacing>{reiseavstandTekster.info_minsteavstand[locale]}</BodyShort>
                <BodyShort spacing>
                    <LocaleTekst
                        tekst={reiseavstandTekster.folkereg_adresse}
                        argument0={person.adresse}
                    />
                </BodyShort>
                <InlineMessage status="info">
                    <BodyShort spacing>
                        {reiseavstandTekster.avreiseadresse_fra_folkereg_info[locale]}
                        <Link
                            href={reiseavstandTekster.avreiseadresse_fra_folkereg_lenke_url}
                            target="_blank"
                            inlineText
                            rel="noopener noreferrer"
                        >
                            {reiseavstandTekster.avreiseadresse_fra_folkereg_lenke_tekst[locale]}
                        </Link>
                        .
                    </BodyShort>
                </InlineMessage>
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeySkalReiseFraFolkeregAdr]?.id}
                    tekst={reiseavstandTekster.radio_skalReiseFraFolkeregAdr}
                    value={reiseavstand.skalReiseFraFolkeregAdr?.verdi ?? ''}
                    onChange={oppdaterSkalReiseFraFolkeregAdr}
                    error={valideringsfeil[errorKeySkalReiseFraFolkeregAdr]?.melding}
                />
                {skalReiseFraFolkeregAdr === 'NEI' && (
                    <VStack gap="space-4" style={{ marginBottom: 'var(--a-spacing-2)' }}>
                        <BodyShort weight="semibold">
                            {reiseavstandTekster.avreiseadresse_tittel[locale]}
                        </BodyShort>
                        <AdresseBoks>
                            <VStack gap="space-16">
                                <Landvelger
                                    id={valideringsfeil[errorKeyAvreiseLand]?.id}
                                    label={reiseavstandTekster.velg_land_label}
                                    value={reiseavstand.adresseDuSkalReiseFra?.land?.verdi}
                                    onChange={(verdi) => {
                                        settAdresseDuSkalReiseFra({ land: verdi });
                                        nullstillFeil(verdi.verdi, errorKeyAvreiseLand);
                                    }}
                                    medNorskeOmråder={true}
                                    error={valideringsfeil[errorKeyAvreiseLand]?.melding}
                                    defaultNorge
                                />
                                <TextField
                                    id={valideringsfeil[errorKeyAvreiseGateadresse]?.id}
                                    label={
                                        reiseavstandTekster.avreiseadresse_vegadresse_label[locale]
                                    }
                                    value={
                                        reiseavstand.adresseDuSkalReiseFra?.gateadresse?.verdi ?? ''
                                    }
                                    error={valideringsfeil[errorKeyAvreiseGateadresse]?.melding}
                                    onChange={(e) => {
                                        const verdi = e.target.value;
                                        settAdresseDuSkalReiseFra({
                                            gateadresse: {
                                                label: reiseavstandTekster
                                                    .avreiseadresse_vegadresse_label[locale],
                                                verdi,
                                            },
                                        });
                                        nullstillFeil(verdi, errorKeyAvreiseGateadresse);
                                    }}
                                />
                                <PostnummerFelt
                                    id={valideringsfeil[errorKeyAvreisePostnummer]?.id}
                                    label={
                                        reiseavstandTekster.avreiseadresse_postnummer_label[locale]
                                    }
                                    value={
                                        reiseavstand.adresseDuSkalReiseFra?.postnummer?.verdi ?? ''
                                    }
                                    error={valideringsfeil[errorKeyAvreisePostnummer]?.melding}
                                    inputMode="numeric"
                                    onChange={(e) => {
                                        const verdi = e.target.value;
                                        settAdresseDuSkalReiseFra({
                                            postnummer: {
                                                label: reiseavstandTekster
                                                    .avreiseadresse_postnummer_label[locale],
                                                verdi,
                                            },
                                        });
                                        nullstillFeil(verdi, errorKeyAvreisePostnummer);
                                    }}
                                />
                                <TextField
                                    id={valideringsfeil[errorKeyAvreisePoststed]?.id}
                                    label={
                                        reiseavstandTekster.avreiseadresse_poststed_label[locale]
                                    }
                                    value={
                                        reiseavstand.adresseDuSkalReiseFra?.poststed?.verdi ?? ''
                                    }
                                    error={valideringsfeil[errorKeyAvreisePoststed]?.melding}
                                    onChange={(e) => {
                                        const verdi = e.target.value;
                                        settAdresseDuSkalReiseFra({
                                            poststed: {
                                                label: reiseavstandTekster
                                                    .avreiseadresse_poststed_label[locale],
                                                verdi,
                                            },
                                        });
                                        nullstillFeil(verdi, errorKeyAvreisePoststed);
                                    }}
                                />
                            </VStack>
                        </AdresseBoks>
                    </VStack>
                )}
                <KmFelt
                    id={valideringsfeil[errorKeyAntallKm]?.id}
                    label={reiseavstandTekster.antall_km_label[locale]}
                    description={reiseavstandTekster.antall_km_beskrivelse[locale]}
                    inputMode="numeric"
                    value={reiseavstand.antallKilometerEnVei?.verdi ?? ''}
                    error={valideringsfeil[errorKeyAntallKm]?.melding}
                    onChange={(e) => {
                        const verdi = e.target.value;
                        settReiseavstand((prev) => ({
                            ...prev,
                            antallKilometerEnVei: {
                                label: reiseavstandTekster.antall_km_label[locale],
                                verdi,
                            },
                        }));
                        nullstillFeil(verdi, errorKeyAntallKm);
                    }}
                />
            </VStack>
            <VStack gap="space-4">
                <BodyShort weight="semibold">
                    {reiseavstandTekster.aktivitetsadresse_tittel[locale]}
                </BodyShort>
                <AdresseBoks style={{ paddingBottom: '2rem' }}>
                    <VStack gap="space-16">
                        <Landvelger
                            id={valideringsfeil[errorKeyLand]?.id}
                            label={reiseavstandTekster.velg_land_label}
                            value={reiseavstand.aktivitetsadresse.land?.verdi}
                            onChange={(verdi) => {
                                settAktivitetsadresse({ land: verdi });
                                nullstillFeil(verdi.verdi, errorKeyLand);
                            }}
                            medNorskeOmråder={true}
                            error={valideringsfeil[errorKeyLand]?.melding}
                            defaultNorge
                        />
                        <TextField
                            id={valideringsfeil[errorKeyGateadresse]?.id}
                            label={reiseavstandTekster.gateadresse_label[locale]}
                            value={reiseavstand.aktivitetsadresse.gateadresse?.verdi ?? ''}
                            error={valideringsfeil[errorKeyGateadresse]?.melding}
                            onChange={(e) => {
                                const verdi = e.target.value;
                                settAktivitetsadresse({
                                    gateadresse: {
                                        label: reiseavstandTekster.gateadresse_label[locale],
                                        verdi,
                                    },
                                });
                                nullstillFeil(verdi, errorKeyGateadresse);
                            }}
                        />
                        <PostnummerFelt
                            id={valideringsfeil[errorKeyPostnummer]?.id}
                            label={reiseavstandTekster.postnummer_label[locale]}
                            value={reiseavstand.aktivitetsadresse.postnummer?.verdi ?? ''}
                            error={valideringsfeil[errorKeyPostnummer]?.melding}
                            inputMode="numeric"
                            onChange={(e) => {
                                const verdi = e.target.value;
                                settAktivitetsadresse({
                                    postnummer: {
                                        label: reiseavstandTekster.postnummer_label[locale],
                                        verdi,
                                    },
                                });
                                nullstillFeil(verdi, errorKeyPostnummer);
                            }}
                        />
                        <TextField
                            id={valideringsfeil[errorKeyPoststed]?.id}
                            label={reiseavstandTekster.poststed_label[locale]}
                            value={reiseavstand.aktivitetsadresse.poststed?.verdi ?? ''}
                            error={valideringsfeil[errorKeyPoststed]?.melding}
                            onChange={(e) => {
                                const verdi = e.target.value;
                                settAktivitetsadresse({
                                    poststed: {
                                        label: reiseavstandTekster.poststed_label[locale],
                                        verdi,
                                    },
                                });
                                nullstillFeil(verdi, errorKeyPoststed);
                            }}
                        />
                    </VStack>
                </AdresseBoks>
            </VStack>
        </Side>
    );
};

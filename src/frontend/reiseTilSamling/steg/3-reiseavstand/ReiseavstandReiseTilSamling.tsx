import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, BodyShort, Link, TextField, VStack } from '@navikt/ds-react';
import { BgSunken } from '@navikt/ds-tokens/js';

import {
    errorKeyAntallKm,
    errorKeyGateadresse,
    errorKeyLand,
    errorKeyPostnummer,
    errorKeyPoststed,
    validerReiseavstand,
} from './validering';
import { Landvelger } from '../../../components/Landvelger/Landvelger';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
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
    const { reiseavstand, settReiseavstand, settAktivitetsadresse } = useReiseTilSamlingSøknad();
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

    const [visAdvarsel, setVisAdvarsel] = useState(false);

    const advarselForLavAvstand =
        reiseavstand.antallKilometerEnVei?.verdi && visAdvarsel
            ? Number(reiseavstand.antallKilometerEnVei.verdi) < 30
            : false;

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={reiseavstandTekster.tittel} level="2" size="medium" />
            <VStack gap="space-4">
                <BodyShort spacing>{reiseavstandTekster.info_minsteavstand[locale]}</BodyShort>
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
                    onBlur={() => {
                        setVisAdvarsel(true);
                    }}
                />
            </VStack>
            {advarselForLavAvstand && (
                <Alert variant="warning">
                    {reiseavstandTekster.advarsel_antall_km_for_lav[locale]}
                </Alert>
            )}
            <BodyShort>
                {reiseavstandTekster.folkeregistrert_adresse_info[locale]}
                <Link
                    href={reiseavstandTekster.folkeregistrert_adresse_lenke_url}
                    target="_blank"
                    inlineText
                >
                    {reiseavstandTekster.folkeregistrert_adresse_lenke_tekst[locale]}
                </Link>
                .
            </BodyShort>
            <VStack gap="space-4">
                <BodyShort weight="semibold">
                    {reiseavstandTekster.aktivitetsadresse_tittel[locale]}
                </BodyShort>
                <AdresseBoks>
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

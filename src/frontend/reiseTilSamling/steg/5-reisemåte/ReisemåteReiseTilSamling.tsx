import React from 'react';

import styled from 'styled-components';

import { Alert, TextField, VStack } from '@navikt/ds-react';

import {
    errorKeyKanBenytteDrosje,
    errorKeyKanBenytteEgenBil,
    errorKeyKanReiseKollektivt,
    errorKeyTotalutgifterKollektivt,
    validerReisemåte,
} from './validering';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { reisemåteTekster } from '../../tekster/reisemåte';

const TotalutgifterFelt = styled(TextField)`
    input {
        width: 6rem;
    }
`;

export const ReisemåteReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { reisemåte, settReisemåte } = useReiseTilSamlingSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const nullstillFeil = (errorKey: string) => {
        settValideringsfeil((prev) => ({ ...prev, [errorKey]: undefined }));
    };

    const kanFortsette = (): boolean => {
        const feil = validerReisemåte(reisemåte, locale);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterKanReiseKollektivt = (verdi: EnumFelt<JaNei>) => {
        settReisemåte({ kanReiseKollektivt: verdi });
        nullstillFeil(errorKeyKanReiseKollektivt);
    };

    const oppdaterKanBenytteEgenBil = (verdi: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            kanReiseKollektivt: prev?.kanReiseKollektivt,
            kanBenytteEgenBil: verdi,
        }));
        nullstillFeil(errorKeyKanBenytteEgenBil);
    };

    const oppdaterKanBenytteDrosje = (verdi: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            kanReiseKollektivt: prev?.kanReiseKollektivt,
            kanBenytteEgenBil: prev?.kanBenytteEgenBil,
            kanBenytteDrosje: verdi,
        }));
        nullstillFeil(errorKeyKanBenytteDrosje);
    };

    const kollektivtJa = reisemåte?.kanReiseKollektivt?.verdi === 'JA';
    const kollektivtNei = reisemåte?.kanReiseKollektivt?.verdi === 'NEI';
    const bilNei = reisemåte?.kanBenytteEgenBil?.verdi === 'NEI';
    const drosjeNei = reisemåte?.kanBenytteDrosje?.verdi === 'NEI';

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={reisemåteTekster.tittel} level="2" size="medium" />
            <VStack gap="space-8">
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeyKanReiseKollektivt]?.id}
                    tekst={reisemåteTekster.radio_kan_reise_kollektivt}
                    value={reisemåte?.kanReiseKollektivt?.verdi ?? ''}
                    onChange={oppdaterKanReiseKollektivt}
                    error={valideringsfeil[errorKeyKanReiseKollektivt]?.melding}
                />
                {kollektivtJa && (
                    <TotalutgifterFelt
                        id={valideringsfeil[errorKeyTotalutgifterKollektivt]?.id}
                        label={reisemåteTekster.totalutgifter_kollektivt_label[locale]}
                        description={reisemåteTekster.totalutgifter_kollektivt_beskrivelse[locale]}
                        inputMode="numeric"
                        value={reisemåte?.totalutgifterKollektivt?.verdi ?? ''}
                        error={valideringsfeil[errorKeyTotalutgifterKollektivt]?.melding}
                        onChange={(e) => {
                            const verdi = e.target.value;
                            settReisemåte((prev) => ({
                                ...prev,
                                totalutgifterKollektivt: {
                                    label: reisemåteTekster.totalutgifter_kollektivt_label[locale],
                                    verdi,
                                },
                            }));
                            nullstillFeil(errorKeyTotalutgifterKollektivt);
                        }}
                    />
                )}
                {kollektivtNei && (
                    <LocaleRadioGroup
                        id={valideringsfeil[errorKeyKanBenytteEgenBil]?.id}
                        tekst={reisemåteTekster.radio_kan_benytte_egen_bil}
                        value={reisemåte?.kanBenytteEgenBil?.verdi ?? ''}
                        onChange={oppdaterKanBenytteEgenBil}
                        error={valideringsfeil[errorKeyKanBenytteEgenBil]?.melding}
                    />
                )}
                {kollektivtNei && bilNei && (
                    <LocaleRadioGroup
                        id={valideringsfeil[errorKeyKanBenytteDrosje]?.id}
                        tekst={reisemåteTekster.radio_kan_benytte_drosje}
                        value={reisemåte?.kanBenytteDrosje?.verdi ?? ''}
                        onChange={oppdaterKanBenytteDrosje}
                        error={valideringsfeil[errorKeyKanBenytteDrosje]?.melding}
                    />
                )}
                {kollektivtNei && bilNei && drosjeNei && (
                    <Alert variant="warning">
                        {reisemåteTekster.advarsel_ingen_reisemåte[locale]}
                    </Alert>
                )}
            </VStack>
        </Side>
    );
};

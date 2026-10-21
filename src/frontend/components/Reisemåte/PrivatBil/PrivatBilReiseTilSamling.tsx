import { Dispatch, SetStateAction } from 'react';

import { VStack } from '@navikt/ds-react';

import { UtgifterPrivatBilReiseTilSamling } from './UtgifterPrivatBilReiseTilSamling';
import {
    errorKeyPrivatBilAntallKilometerKjørt,
    errorKeyPrivatBilBenyttetEgenBil,
    errorKeyPrivatBilBetalteForReiseSelv,
    errorKeyPrivatBilStrekningHvorBilBleBenyttet,
    maksLengdeStrekningHvorBilBleBenyttet,
    nullstilteInfoBilKunDelerAvStrekningFeil,
    nullstiltePrivatBilFeil,
    nullstilteUtgifterPrivatBilFeil,
} from './validering';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { PrivatBilInfo, Reisemåte, UtgifterPrivatBil } from '../../../typer/reisemåte';
import { EnumFelt, VerdiFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { AlertIkkeRett } from '../../AlertIkkeRett';
import { Skillelinje } from '../../Skillelinje';
import { LocaleHeading } from '../../Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../Teksthåndtering/LocaleRadioGroup';
import { LocaleTextarea } from '../../Teksthåndtering/LocaleTextarea';
import { LocaleTextField } from '../../Teksthåndtering/LocaleTextField';
import { PrivatBilTekster } from '../tekster';

export const PrivatBilReiseTilSamling: React.FC<{
    samlingId: number;
    privatBil: PrivatBilInfo | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
    valgteTransportmidler: string[];
    tekster: PrivatBilTekster;
}> = ({ samlingId, privatBil, settReisemåte, valgteTransportmidler, tekster }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const oppdaterBenyttetEgenBil = (enumFelt: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            ...prev,
            privatBil: { benyttetEgenBil: enumFelt },
        }));

        settValideringsfeil((prev) => ({ ...prev, ...nullstiltePrivatBilFeil(samlingId) }));
    };

    const oppdaterBetalerForReisen = (enumFelt: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            ...prev,
            privatBil: {
                benyttetEgenBil: prev?.privatBil?.benyttetEgenBil,
                betalteForReisen: enumFelt,
            },
        }));

        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyPrivatBilBetalteForReiseSelv(samlingId)]: undefined,
            ...nullstilteInfoBilKunDelerAvStrekningFeil(samlingId),
            ...nullstilteUtgifterPrivatBilFeil(samlingId),
        }));
    };

    const oppdaterStrekningHvorBilBleBenyttet = (felt: VerdiFelt<string>) => {
        settReisemåte((prev) => ({
            ...prev,
            privatBil: {
                ...prev?.privatBil,
                infoBilKunDelerAvStrekning: {
                    ...prev?.privatBil?.infoBilKunDelerAvStrekning,
                    strekningHvorBilBleBenyttet: felt,
                },
            },
        }));
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId)]: undefined,
        }));
    };

    const oppdaterAntallKilometerKjørt = (felt: VerdiFelt<string>) => {
        settReisemåte((prev) => ({
            ...prev,
            privatBil: {
                ...prev?.privatBil,
                infoBilKunDelerAvStrekning: {
                    ...prev?.privatBil?.infoBilKunDelerAvStrekning,
                    antallKilometerKjørt: felt,
                },
            },
        }));
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyPrivatBilAntallKilometerKjørt(samlingId)]: undefined,
        }));
    };

    const oppdaterUtgifterPrivatBil = (felt: Partial<UtgifterPrivatBil>) => {
        settReisemåte((prev) => ({
            ...prev,
            privatBil: {
                ...prev?.privatBil,
                utgifterPrivatBil: { ...prev?.privatBil?.utgifterPrivatBil, ...felt },
            },
        }));
    };

    const skalReiseMedFlereTransportmidler =
        valgteTransportmidler.filter((t) => t !== 'PRIVAT_BIL').length > 0;

    const skalViseUtgifter =
        privatBil?.benyttetEgenBil?.verdi === 'JA' || privatBil?.betalteForReisen?.verdi === 'JA';

    return (
        <>
            <VStack gap="space-24">
                <Skillelinje />
                <LocaleHeading tekst={tekster.egen_bil_tittel} level="3" size="small" />
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeyPrivatBilBenyttetEgenBil(samlingId)]?.id}
                    tekst={tekster.radio_kan_benytte_egen_bil}
                    value={privatBil?.benyttetEgenBil?.verdi ?? ''}
                    onChange={oppdaterBenyttetEgenBil}
                    error={valideringsfeil[errorKeyPrivatBilBenyttetEgenBil(samlingId)]?.melding}
                />

                {privatBil?.benyttetEgenBil?.verdi === 'NEI' && (
                    <VStack gap="space-16">
                        <LocaleRadioGroup
                            id={
                                valideringsfeil[errorKeyPrivatBilBetalteForReiseSelv(samlingId)]?.id
                            }
                            tekst={tekster.radio_betaler_for_reise_selv}
                            value={privatBil?.betalteForReisen?.verdi ?? ''}
                            onChange={oppdaterBetalerForReisen}
                            error={
                                valideringsfeil[errorKeyPrivatBilBetalteForReiseSelv(samlingId)]
                                    ?.melding
                            }
                        />
                        {privatBil?.betalteForReisen?.verdi === 'NEI' && (
                            <AlertIkkeRett beskrivelse={tekster.advarsel_skal_ikke_betale_selv} />
                        )}
                    </VStack>
                )}
            </VStack>
            {skalViseUtgifter && skalReiseMedFlereTransportmidler && (
                <>
                    <LocaleTextarea
                        id={
                            valideringsfeil[errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId)]
                                ?.id
                        }
                        tekst={tekster.privat_bil_strekning_kjørt}
                        value={
                            privatBil?.infoBilKunDelerAvStrekning?.strekningHvorBilBleBenyttet
                                ?.verdi ?? ''
                        }
                        maxLength={maksLengdeStrekningHvorBilBleBenyttet}
                        onChange={oppdaterStrekningHvorBilBleBenyttet}
                        error={
                            valideringsfeil[errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId)]
                                ?.melding
                        }
                    />
                    <LocaleTextField
                        id={valideringsfeil[errorKeyPrivatBilAntallKilometerKjørt(samlingId)]?.id}
                        tekst={tekster.privat_bil_km_kjørt}
                        value={
                            privatBil?.infoBilKunDelerAvStrekning?.antallKilometerKjørt?.verdi ?? ''
                        }
                        onChange={(e) =>
                            oppdaterAntallKilometerKjørt({
                                label: tekster.privat_bil_km_kjørt.label[locale],
                                verdi: e.target.value,
                            })
                        }
                        error={
                            valideringsfeil[errorKeyPrivatBilAntallKilometerKjørt(samlingId)]
                                ?.melding
                        }
                        htmlSize={10}
                        inputMode="numeric"
                    />
                </>
            )}

            {skalViseUtgifter && (
                <UtgifterPrivatBilReiseTilSamling
                    samlingId={samlingId}
                    utgifterPrivatBil={privatBil.utgifterPrivatBil}
                    oppdaterUtgifterPrivatBil={oppdaterUtgifterPrivatBil}
                    tekster={tekster}
                />
            )}
        </>
    );
};

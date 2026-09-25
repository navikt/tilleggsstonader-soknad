import { Dispatch, SetStateAction } from 'react';

import { VStack } from '@navikt/ds-react';

import { UtgifterPrivatBilReiseTilSamling } from './UtgifterPrivatBilReiseTilSamling';
import {
    errorKeyPrivatBilBenyttetEgenBil,
    errorKeyPrivatBilBetalteForReiseSelv,
    nullstiltePrivatBilFeil,
    nullstilteUtgifterPrivatBilFeil,
} from './validering';
import { AlertIkkeRett } from '../../../../../components/AlertIkkeRett';
import { Skillelinje } from '../../../../../components/Skillelinje';
import { LocaleHeading } from '../../../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../../../components/Teksthåndtering/LocaleRadioGroup';
import { useValideringsfeil } from '../../../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../../../typer/skjema';
import { JaNei } from '../../../../../typer/søknad';
import { reisemåteTekster } from '../../../../tekster/reisemåte';
import { PrivatBilInfo, Reisemåte, UtgifterPrivatBil } from '../../../../typer/reisemåte';

/**
 * Oppfølgingsspørsmål/innhold når man skal benytte egen bil (eller sitter på med
 * andre og betaler for reisen selv): utgifter knyttet til bilbruk. Eier
 * `privatBil.utgifterPrivatBil`. Rendres av Reisemåte.tsx.
 */
export const PrivatBilReiseTilSamling: React.FC<{
    privatBil: PrivatBilInfo | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ privatBil, settReisemåte }) => {
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const oppdaterBenyttetEgenBil = (enumFelt: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            ...prev,
            privatBil: { benyttetEgenBil: enumFelt },
        }));

        settValideringsfeil((prev) => ({ ...prev, ...nullstiltePrivatBilFeil }));
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
            [errorKeyPrivatBilBetalteForReiseSelv]: undefined,
            ...nullstilteUtgifterPrivatBilFeil,
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

    const skalViseUtgifter =
        privatBil?.benyttetEgenBil?.verdi === 'JA' || privatBil?.betalteForReisen?.verdi === 'JA';

    return (
        <>
            <Skillelinje />
            <LocaleHeading tekst={reisemåteTekster.egen_bil_tittel} level="3" size="small" />
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyPrivatBilBenyttetEgenBil]?.id}
                tekst={reisemåteTekster.radio_kan_benytte_egen_bil}
                value={privatBil?.benyttetEgenBil?.verdi ?? ''}
                onChange={oppdaterBenyttetEgenBil}
                error={valideringsfeil[errorKeyPrivatBilBenyttetEgenBil]?.melding}
            />

            {privatBil?.benyttetEgenBil?.verdi === 'NEI' && (
                <VStack gap="space-16">
                    <LocaleRadioGroup
                        id={valideringsfeil[errorKeyPrivatBilBetalteForReiseSelv]?.id}
                        tekst={reisemåteTekster.radio_betaler_for_reise_selv}
                        value={privatBil?.betalteForReisen?.verdi ?? ''}
                        onChange={oppdaterBetalerForReisen}
                        error={valideringsfeil[errorKeyPrivatBilBetalteForReiseSelv]?.melding}
                    />
                    {privatBil?.betalteForReisen?.verdi === 'NEI' && (
                        <AlertIkkeRett
                            beskrivelse={reisemåteTekster.advarsel_skal_ikke_betale_selv}
                        />
                    )}
                </VStack>
            )}

            {/* TODO: Legg inn spørsmål om hvilken del av strekningen som er kjørt */}

            {skalViseUtgifter && (
                <UtgifterPrivatBilReiseTilSamling
                    utgifterPrivatBil={privatBil.utgifterPrivatBil}
                    oppdaterUtgifterPrivatBil={oppdaterUtgifterPrivatBil}
                />
            )}
        </>
    );
};

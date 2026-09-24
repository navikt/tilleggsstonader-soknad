import { Dispatch, SetStateAction } from 'react';

import { Alert } from '@navikt/ds-react';

import {
    errorKeyHarTTKort,
    errorKeyØnskerDekketUtgifterForDrosje,
    nullstillteDrosjefeil as nullstilteDrosjefeil,
} from './validering';
import { LocaleRadioGroup } from '../../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekstAvsnitt } from '../../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useSpråk } from '../../../../context/SpråkContext';
import { useValideringsfeil } from '../../../../context/ValideringsfeilContext';
import { EnumFelt, EnumFlereValgFelt } from '../../../../typer/skjema';
import { JaNei } from '../../../../typer/søknad';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import { ÅrsakKanIkkeBenytteEgenBil, Reisemåte, DrosjeInfo } from '../../../typer/reisemåte';

export const DrosjeReiseTilSamling: React.FC<{
    unntakFraPrivatBil: EnumFlereValgFelt<ÅrsakKanIkkeBenytteEgenBil> | undefined;
    drosje: DrosjeInfo | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ unntakFraPrivatBil, drosje, settReisemåte }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const helsemessigeÅrsakerBilValgt = unntakFraPrivatBil?.verdier
        .map((v) => v.verdi)
        .includes('HELSEMESSIGE_ÅRSAKER');

    const drosjeJa = drosje?.ønskerDekketUtgifterForDrosje?.verdi === 'JA';
    const drosjeNei = drosje?.ønskerDekketUtgifterForDrosje?.verdi === 'NEI';

    const oppdaterØnskerÅReiseMedDrosje = (verdi: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            ...prev,
            taxi: {
                ønskerDekketUtgifterForDrosje: verdi,
            },
        }));
        settValideringsfeil((prev) => ({
            ...prev,
            ...nullstilteDrosjefeil,
        }));
    };

    const oppdaterTTKort = (verdi: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            ...prev,
            drosje: {
                ...prev?.drosje,
                ønskerDekketUtgifterForDrosje: verdi,
            },
        }));
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyHarTTKort]: undefined,
        }));
    };

    return (
        <>
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyØnskerDekketUtgifterForDrosje]?.id}
                tekst={reisemåteTekster.radio_ønsker_dekket_utgifter_for_drosje}
                value={drosje?.ønskerDekketUtgifterForDrosje?.verdi ?? ''}
                onChange={(verdi: EnumFelt<JaNei>) => oppdaterØnskerÅReiseMedDrosje(verdi)}
                error={valideringsfeil[errorKeyØnskerDekketUtgifterForDrosje]?.melding}
            />
            {drosjeJa && (
                <>
                    <Alert variant="info">
                        {reisemåteTekster.info_drosje_dokumentasjon[locale]}
                    </Alert>
                    {helsemessigeÅrsakerBilValgt && (
                        <>
                            <LocaleRadioGroup
                                id={valideringsfeil[errorKeyHarTTKort]?.id}
                                tekst={reisemåteTekster.radio_har_du_tt_kort}
                                value={drosje?.harTTKort?.verdi ?? ''}
                                onChange={(verdi: EnumFelt<JaNei>) => oppdaterTTKort(verdi)}
                                error={valideringsfeil[errorKeyHarTTKort]?.melding}
                            />
                            {drosje?.harTTKort?.verdi === 'JA' && (
                                <Alert variant="info">
                                    <LocaleTekstAvsnitt tekst={reisemåteTekster.info_tt_kort} />
                                </Alert>
                            )}
                        </>
                    )}
                </>
            )}
            {drosjeNei && (
                <Alert variant="info">{reisemåteTekster.advarsel_ingen_reisemåte[locale]}</Alert>
            )}
        </>
    );
};

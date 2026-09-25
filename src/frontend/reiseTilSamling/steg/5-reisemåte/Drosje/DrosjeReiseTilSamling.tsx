import { Dispatch, SetStateAction } from 'react';

import { InlineMessage } from '@navikt/ds-react';

import { errorKeyHarTTKort } from './validering';
import { Skillelinje } from '../../../../components/Skillelinje';
import { LocaleRadioGroup } from '../../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekstAvsnitt } from '../../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useValideringsfeil } from '../../../../context/ValideringsfeilContext';
import { EnumFelt, EnumFlereValgFelt } from '../../../../typer/skjema';
import { JaNei } from '../../../../typer/søknad';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import {
    ÅrsakKanIkkeBenytteEgenBil,
    Reisemåte,
    DrosjeInfo,
    ÅrsakKanIkkeBenytteOffentligTransport,
} from '../../../typer/reisemåte';

export const DrosjeReiseTilSamling: React.FC<{
    unntakFraPrivatBil: EnumFlereValgFelt<ÅrsakKanIkkeBenytteEgenBil> | undefined;
    drosje: DrosjeInfo | undefined;
    unntakFraOffentligTransport:
        EnumFlereValgFelt<ÅrsakKanIkkeBenytteOffentligTransport> | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ unntakFraPrivatBil, drosje, settReisemåte, unntakFraOffentligTransport }) => {
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const helsemessigeÅrsakerBilValgt =
        unntakFraPrivatBil?.verdier.map((v) => v.verdi).includes('HELSEMESSIGE_ÅRSAKER') ||
        unntakFraOffentligTransport?.verdier.map((v) => v.verdi).includes('HELSEMESSIGE_ÅRSAKER');

    const oppdaterTTKort = (verdi: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            ...prev,
            drosje: {
                ...prev?.drosje,
                harTTKort: verdi,
            },
        }));
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyHarTTKort]: undefined,
        }));
    };

    if (!helsemessigeÅrsakerBilValgt) {
        return null;
    }

    return (
        <>
            <Skillelinje />
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyHarTTKort]?.id}
                tekst={reisemåteTekster.radio_har_du_tt_kort}
                value={drosje?.harTTKort?.verdi ?? ''}
                onChange={(verdi: EnumFelt<JaNei>) => oppdaterTTKort(verdi)}
                error={valideringsfeil[errorKeyHarTTKort]?.melding}
            />
            {drosje?.harTTKort?.verdi === 'JA' && (
                <InlineMessage status="info">
                    <LocaleTekstAvsnitt tekst={reisemåteTekster.info_tt_kort} />
                </InlineMessage>
            )}
        </>
    );
};

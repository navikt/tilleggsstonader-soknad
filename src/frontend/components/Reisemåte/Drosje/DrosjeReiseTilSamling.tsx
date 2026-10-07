import { Dispatch, SetStateAction } from 'react';

import { InlineMessage, VStack } from '@navikt/ds-react';

import { errorKeyHarTTKort } from './validering';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { reisemåteTekster } from '../../../reiseTilSamling/tekster/reisemåte';
import {
    ÅrsakKanIkkeBenytteEgenBil,
    DrosjeInfo,
    ÅrsakKanIkkeBenytteOffentligTransport,
    Reisemåte,
} from '../../../typer/reisemåte';
import { EnumFlereValgFelt, EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Skillelinje } from '../../Skillelinje';
import { LocaleHeading } from '../../Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../Teksthåndtering/LocaleRadioGroup';
import { LocaleTekstAvsnitt } from '../../Teksthåndtering/LocaleTekstAvsnitt';

export const DrosjeReiseTilSamling: React.FC<{
    samlingId: number;
    unntakFraPrivatBil: EnumFlereValgFelt<ÅrsakKanIkkeBenytteEgenBil> | undefined;
    drosje: DrosjeInfo | undefined;
    unntakFraOffentligTransport:
        EnumFlereValgFelt<ÅrsakKanIkkeBenytteOffentligTransport> | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ samlingId, unntakFraPrivatBil, drosje, settReisemåte, unntakFraOffentligTransport }) => {
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
            [errorKeyHarTTKort(samlingId)]: undefined,
        }));
    };

    if (!helsemessigeÅrsakerBilValgt) {
        return null;
    }

    return (
        <VStack gap="space-24">
            <Skillelinje />
            <LocaleHeading tekst={reisemåteTekster.drosje_tittel} level="3" size="small" />
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyHarTTKort(samlingId)]?.id}
                tekst={reisemåteTekster.radio_har_du_tt_kort}
                value={drosje?.harTTKort?.verdi ?? ''}
                onChange={(verdi: EnumFelt<JaNei>) => oppdaterTTKort(verdi)}
                error={valideringsfeil[errorKeyHarTTKort(samlingId)]?.melding}
            />
            {drosje?.harTTKort?.verdi === 'JA' && (
                <InlineMessage status="info">
                    <LocaleTekstAvsnitt tekst={reisemåteTekster.info_tt_kort} />
                </InlineMessage>
            )}
        </VStack>
    );
};

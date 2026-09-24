import { InlineMessage, VStack } from '@navikt/ds-react';

import { UnntakIkkeOffentligTransport } from './UnntakFraOffentligTransport';
import { errorKeyHvilkeTransportmidlerBleBenyttet, errorKeyUnntakFraPrivatBil } from './validering';
import { LocaleCheckboxGroup } from '../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';
import { reisemåteTekster } from '../../tekster/reisemåte';
import { Transportmiddel, ÅrsakKanIkkeBenytteEgenBil } from '../../typer/reisemåte';

export const TransportmiddelOgUnntak = () => {
    const { locale } = useSpråk();
    const { reisemåte, settReisemåte } = useReiseTilSamlingSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const transportmidlerHuketAv =
        reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.map((v) => v.verdi) ?? [];

    const privatBilHuketAv = transportmidlerHuketAv.includes('PRIVAT_BIL');
    const drosjeHuketAv = transportmidlerHuketAv.includes('DROSJE');

    const oppdaterHvilkeTransportmidler = (felt: EnumFlereValgFelt<Transportmiddel>) => {
        settReisemåte((prev) => ({
            ...prev,
            hvilkeTransportmidlerBleBenyttet: felt,
        }));
        // TODO: Håndter nullstilling av felter og feil
    };

    const oppdaterUnntakFraPrivatBil = (felt: EnumFlereValgFelt<ÅrsakKanIkkeBenytteEgenBil>) => {
        settReisemåte((prev) => ({
            ...prev,
            unntakFraPrivatBil: felt,
        }));

        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyUnntakFraPrivatBil]: undefined,
        }));
    };

    const helsemessigeÅrsakerBilValgt = reisemåte?.unntakFraPrivatBil?.verdier
        .map((v) => v.verdi)
        .includes('HELSEMESSIGE_ÅRSAKER');

    return (
        <>
            <LocaleCheckboxGroup
                id={valideringsfeil[errorKeyHvilkeTransportmidlerBleBenyttet]?.id}
                tekst={reisemåteTekster.check_hvilke_transportmidler}
                onChange={oppdaterHvilkeTransportmidler}
                value={reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier ?? []}
                error={valideringsfeil[errorKeyHvilkeTransportmidlerBleBenyttet]?.melding}
            />

            {(privatBilHuketAv || drosjeHuketAv) && (
                <UnntakIkkeOffentligTransport
                    unntakFraOffentligTransport={reisemåte?.unntakFraOffentligTransport}
                    settReisemåte={settReisemåte}
                />
            )}

            {drosjeHuketAv && (
                <VStack gap="space-16">
                    <LocaleCheckboxGroup
                        id={valideringsfeil[errorKeyUnntakFraPrivatBil]?.id}
                        tekst={reisemåteTekster.check_kan_ikke_benytte_egen_bil_begrunnelse}
                        onChange={oppdaterUnntakFraPrivatBil}
                        value={reisemåte?.unntakFraPrivatBil?.verdier ?? []}
                        error={valideringsfeil[errorKeyUnntakFraPrivatBil]?.melding}
                    />
                    {helsemessigeÅrsakerBilValgt && (
                        <InlineMessage status="info">
                            {reisemåteTekster.info_helsemessige_årsaker_valg[locale]}
                        </InlineMessage>
                    )}
                </VStack>
            )}
        </>
    );
};

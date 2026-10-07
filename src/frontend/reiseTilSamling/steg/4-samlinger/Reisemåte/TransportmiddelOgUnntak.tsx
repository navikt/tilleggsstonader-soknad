import { Dispatch, SetStateAction } from 'react';

import { Heading, InlineMessage, VStack } from '@navikt/ds-react';

import {
    finnValgteTransportmidler,
    nullstillEllerBeholdVerdi,
    vurderDrosjeFelterForNullstilling,
    vurderOffentligTransportFelterForNullstilling,
    vurderPrivatBilFelterForNullstillng,
    vurderUnntakFeilForNullstilling,
} from './transportmiddelUtils';
import { UnntakIkkeOffentligTransport } from './UnntakFraOffentligTransport';
import { errorKeyHvilkeTransportmidlerBleBenyttet, errorKeyUnntakFraPrivatBil } from './validering';
import { LocaleCheckboxGroup } from '../../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { useSpråk } from '../../../../context/SpråkContext';
import { useValideringsfeil } from '../../../../context/ValideringsfeilContext';
import {
    Reisemåte,
    Transportmiddel,
    ÅrsakKanIkkeBenytteEgenBil,
} from '../../../../typer/reisemåte';
import { EnumFlereValgFelt } from '../../../../typer/skjema';
import { reisemåteTekster } from '../../../tekster/reisemåte';

export const TransportmiddelOgUnntak: React.FC<{
    samlingId: number;
    reisemåte: Reisemåte | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ samlingId, reisemåte, settReisemåte }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const transportmidlerHuketAv = finnValgteTransportmidler(
        reisemåte?.hvilkeTransportmidlerBleBenyttet
    );

    const privatBilHuketAv = transportmidlerHuketAv.includes('PRIVAT_BIL');
    const drosjeHuketAv = transportmidlerHuketAv.includes('DROSJE');

    const oppdaterHvilkeTransportmidler = (felt: EnumFlereValgFelt<Transportmiddel>) => {
        const inkluderteTransportmidler = finnValgteTransportmidler(felt);

        settReisemåte((prev) => ({
            ...prev,
            hvilkeTransportmidlerBleBenyttet: felt,

            unntakFraOffentligTransport: nullstillEllerBeholdVerdi(
                inkluderteTransportmidler,
                ['PRIVAT_BIL', 'DROSJE'],
                prev?.unntakFraOffentligTransport
            ),

            unntakFraPrivatBil: nullstillEllerBeholdVerdi(
                inkluderteTransportmidler,
                ['DROSJE'],
                prev?.unntakFraPrivatBil
            ),

            offentligTransport: nullstillEllerBeholdVerdi(
                inkluderteTransportmidler,
                ['OFFENTLIG_TRANSPORT'],
                prev?.offentligTransport
            ),
            privatBil: nullstillEllerBeholdVerdi(
                inkluderteTransportmidler,
                ['PRIVAT_BIL'],
                prev?.privatBil
            ),
            drosje: nullstillEllerBeholdVerdi(inkluderteTransportmidler, ['DROSJE'], prev?.drosje),
        }));

        // Nullstiller feil for de ulike grenene
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyHvilkeTransportmidlerBleBenyttet(samlingId)]: undefined,
            ...vurderOffentligTransportFelterForNullstilling(inkluderteTransportmidler, samlingId),
            ...vurderPrivatBilFelterForNullstillng(inkluderteTransportmidler, samlingId),
            ...vurderDrosjeFelterForNullstilling(inkluderteTransportmidler, samlingId),
            ...vurderUnntakFeilForNullstilling(inkluderteTransportmidler, samlingId),
        }));
    };

    const oppdaterUnntakFraPrivatBil = (felt: EnumFlereValgFelt<ÅrsakKanIkkeBenytteEgenBil>) => {
        settReisemåte((prev) => ({
            ...prev,
            unntakFraPrivatBil: felt,
        }));

        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyUnntakFraPrivatBil(samlingId)]: undefined,
        }));
    };

    const helsemessigeÅrsakerBilValgt = reisemåte?.unntakFraPrivatBil?.verdier
        .map((v) => v.verdi)
        .includes('HELSEMESSIGE_ÅRSAKER');

    return (
        <VStack gap="space-24">
            <Heading size="small">{reisemåteTekster.tittel[locale]}</Heading>
            <VStack gap="space-16">
                <LocaleCheckboxGroup
                    id={valideringsfeil[errorKeyHvilkeTransportmidlerBleBenyttet(samlingId)]?.id}
                    tekst={reisemåteTekster.check_hvilke_transportmidler}
                    onChange={oppdaterHvilkeTransportmidler}
                    value={reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier ?? []}
                    error={
                        valideringsfeil[errorKeyHvilkeTransportmidlerBleBenyttet(samlingId)]
                            ?.melding
                    }
                />

                {drosjeHuketAv && (
                    <InlineMessage status="info">
                        {reisemåteTekster.info_drosje_dokumentasjon[locale]}
                    </InlineMessage>
                )}
            </VStack>

            {(privatBilHuketAv || drosjeHuketAv) && (
                <UnntakIkkeOffentligTransport
                    samlingId={samlingId}
                    unntakFraOffentligTransport={reisemåte?.unntakFraOffentligTransport}
                    settReisemåte={settReisemåte}
                />
            )}

            {drosjeHuketAv && (
                <VStack gap="space-16">
                    <LocaleCheckboxGroup
                        id={valideringsfeil[errorKeyUnntakFraPrivatBil(samlingId)]?.id}
                        tekst={reisemåteTekster.check_kan_ikke_benytte_egen_bil_begrunnelse}
                        onChange={oppdaterUnntakFraPrivatBil}
                        value={reisemåte?.unntakFraPrivatBil?.verdier ?? []}
                        error={valideringsfeil[errorKeyUnntakFraPrivatBil(samlingId)]?.melding}
                    />
                    {helsemessigeÅrsakerBilValgt && (
                        <InlineMessage status="info">
                            {reisemåteTekster.info_helsemessige_årsaker_valg[locale]}
                        </InlineMessage>
                    )}
                </VStack>
            )}
        </VStack>
    );
};

import { Dispatch, SetStateAction } from 'react';

import { InlineMessage, TextField, VStack } from '@navikt/ds-react';

import {
    errorKeyUnntakFraOffentligTransport,
    errorKeyUnntakFraOffentligTransportBarnehageAdresse,
    errorKeyUnntakFraOffentligTransportBarnehagePostnummer,
} from './validering';
import { useSpråk } from '../../context/SpråkContext';
import { useValideringsfeil } from '../../context/ValideringsfeilContext';
import { reisemåteTekster } from '../../reiseTilSamling/tekster/reisemåte';
import {
    UnntakFraOffentligTransport,
    Reisemåte,
    ÅrsakKanIkkeBenytteOffentligTransport,
    LeveringOgHentingIBarnehage,
} from '../../typer/reisemåte';
import { EnumFlereValgFelt } from '../../typer/skjema';
import { LocaleCheckboxGroup } from '../Teksthåndtering/LocaleCheckboxGroup';
import { LocaleTextField } from '../Teksthåndtering/LocaleTextField';

export const UnntakIkkeOffentligTransport: React.FC<{
    unntakFraOffentligTransport: UnntakFraOffentligTransport | undefined;
    samlingId: number;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ unntakFraOffentligTransport, samlingId, settReisemåte }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const kanIkkeReiseOffentligBegrunnelser =
        unntakFraOffentligTransport?.årsaker?.verdier.map((v) => v.verdi) ?? [];

    const helsemessigeÅrsakerOffentligValgt =
        kanIkkeReiseOffentligBegrunnelser.includes('HELSEMESSIGE_ÅRSAKER');
    const dårligTransporttilbudValgt =
        kanIkkeReiseOffentligBegrunnelser.includes('DÅRLIG_TRANSPORTTILBUD');
    const leveringHentingIBarnehageValgt = kanIkkeReiseOffentligBegrunnelser.includes(
        'LEVERING_HENTING_I_BARNEHAGE'
    );

    const oppdaterÅrsaker = (årsaker: EnumFlereValgFelt<ÅrsakKanIkkeBenytteOffentligTransport>) => {
        const barnehageErInkludert = årsaker.verdier.some(
            (v) => v.verdi === 'LEVERING_HENTING_I_BARNEHAGE'
        );

        settReisemåte((prev) => ({
            ...prev,
            unntakFraOffentligTransport: {
                årsaker: årsaker,
                leveringOgHentingIBarnehage: barnehageErInkludert
                    ? prev?.unntakFraOffentligTransport?.leveringOgHentingIBarnehage
                    : undefined,
            },
        }));

        // Nullstiller felter for barnehage dersom årsaken ikke er valgt
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyUnntakFraOffentligTransport(samlingId)]: undefined,
            [errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId)]:
                barnehageErInkludert
                    ? valideringsfeil[
                          errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId)
                      ]
                    : undefined,
            [errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId)]: barnehageErInkludert
                ? valideringsfeil[errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId)]
                : undefined,
        }));
    };

    const oppdaterLeveringOgHentingIBarnehage = (
        felt: Partial<LeveringOgHentingIBarnehage>,
        errorKey: string
    ) => {
        settReisemåte((prev) => ({
            ...prev,
            unntakFraOffentligTransport: {
                ...prev?.unntakFraOffentligTransport,
                leveringOgHentingIBarnehage: {
                    ...prev?.unntakFraOffentligTransport?.leveringOgHentingIBarnehage,
                    ...felt,
                },
            },
        }));

        settValideringsfeil((prev) => ({
            ...prev,
            [errorKey]: undefined,
        }));
    };

    return (
        <VStack gap="space-24">
            <VStack gap="space-16">
                <LocaleCheckboxGroup
                    id={valideringsfeil[errorKeyUnntakFraOffentligTransport(samlingId)]?.id}
                    tekst={reisemåteTekster.check_kan_ikke_reise_offentlig_begrunnelse}
                    onChange={oppdaterÅrsaker}
                    value={unntakFraOffentligTransport?.årsaker?.verdier ?? []}
                    error={valideringsfeil[errorKeyUnntakFraOffentligTransport(samlingId)]?.melding}
                />
                {dårligTransporttilbudValgt && (
                    <InlineMessage status="info">
                        {reisemåteTekster.info_dårlig_transporttilbud_valg[locale]}
                    </InlineMessage>
                )}
                {helsemessigeÅrsakerOffentligValgt && (
                    <InlineMessage status="info">
                        {reisemåteTekster.info_helsemessige_årsaker_valg[locale]}
                    </InlineMessage>
                )}
            </VStack>
            {leveringHentingIBarnehageValgt && (
                <>
                    <LocaleTextField
                        id={
                            valideringsfeil[
                                errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId)
                            ]?.id
                        }
                        error={
                            valideringsfeil[
                                errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId)
                            ]?.melding
                        }
                        tekst={reisemåteTekster.barnehage_adresse}
                        value={
                            unntakFraOffentligTransport?.leveringOgHentingIBarnehage?.gateadresse
                                ?.verdi ?? ''
                        }
                        onChange={(e) =>
                            oppdaterLeveringOgHentingIBarnehage(
                                {
                                    gateadresse: {
                                        label: reisemåteTekster.barnehage_adresse.label[locale],
                                        verdi: e.target.value,
                                    },
                                },
                                errorKeyUnntakFraOffentligTransportBarnehageAdresse(samlingId)
                            )
                        }
                    />
                    <TextField
                        id={
                            valideringsfeil[
                                errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId)
                            ]?.id
                        }
                        error={
                            valideringsfeil[
                                errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId)
                            ]?.melding
                        }
                        label={reisemåteTekster.barnehage_postnummer.label[locale]}
                        value={
                            unntakFraOffentligTransport?.leveringOgHentingIBarnehage?.postnummer
                                ?.verdi ?? ''
                        }
                        onChange={(e) =>
                            oppdaterLeveringOgHentingIBarnehage(
                                {
                                    postnummer: {
                                        label: reisemåteTekster.barnehage_postnummer.label[locale],
                                        verdi: e.target.value,
                                    },
                                },
                                errorKeyUnntakFraOffentligTransportBarnehagePostnummer(samlingId)
                            )
                        }
                        htmlSize={10}
                    />
                </>
            )}
        </VStack>
    );
};

import styled from 'styled-components';

import { Alert, TextField, VStack } from '@navikt/ds-react';

import {
    errorKeyEgenbilUtgifterBompenger,
    errorKeyEgenbilUtgifterDrivstoffType,
    errorKeyEgenbilUtgifterFerge,
    errorKeyEgenbilUtgifterPiggdekkavgift,
    errorKeyKanBenytteDrosje,
    errorKeyKanBenytteEgenBil,
    errorKeyKanIkkeBenytteEgenBilBegrunnelse,
    errorKeyKanIkkeReiseMedOffentligTransportBegrunnelse,
    errorKeyKanReiseMedOffentligTransport,
    errorKeyTotalutgifterOffentligTransport,
    validerReisemåte,
} from './validering';
import { Side } from '../../../components/Side';
import { LocaleCheckboxGroup } from '../../../components/Teksthåndtering/LocaleCheckboxGroup';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';
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

    const oppdaterKanReiseMedOffentligTransport = (verdi: EnumFelt<JaNei>) => {
        settReisemåte({ kanReiseMedOffentligTransport: verdi });
        nullstillFeil(errorKeyKanReiseMedOffentligTransport);
    };

    const oppdaterKanIkkeReiseOffentligBegrunnelse = (verdier: EnumFlereValgFelt<string>) => {
        settReisemåte((prev) => ({
            ...prev,
            kanIkkeReiseMedOffentligTransportBegrunnelser: verdier,
        }));
        nullstillFeil(errorKeyKanIkkeReiseMedOffentligTransportBegrunnelse);
    };

    const oppdaterKanBenytteEgenBil = (verdi: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            kanReiseMedOffentligTransport: prev?.kanReiseMedOffentligTransport,
            kanIkkeReiseMedOffentligTransportBegrunnelser:
                prev?.kanIkkeReiseMedOffentligTransportBegrunnelser,
            kanBenytteEgenBil: verdi,
        }));
        nullstillFeil(errorKeyKanBenytteEgenBil);
    };

    const oppdaterKanIkkeBenytteEgenBilBegrunnelse = (verdier: EnumFlereValgFelt<string>) => {
        settReisemåte((prev) => ({
            ...prev,
            kanIkkeBenytteEgenBilBegrunnelser: verdier,
        }));
        nullstillFeil(errorKeyKanIkkeBenytteEgenBilBegrunnelse);
    };

    const oppdaterKanBenytteDrosje = (verdi: EnumFelt<JaNei>) => {
        settReisemåte((prev) => ({
            ...prev,
            kanReiseMedOffentligTransport: prev?.kanReiseMedOffentligTransport,
            kanBenytteEgenBil: prev?.kanBenytteEgenBil,
            kanBenytteDrosje: verdi,
        }));
        nullstillFeil(errorKeyKanBenytteDrosje);
    };

    const oppdaterEgenBilUtgifterDrivstoffType: (verdi: EnumFelt<string>) => void = (verdi) => {
        settReisemåte((prev) => ({
            ...prev,
            egenBilUtgifter: {
                ...prev?.egenBilUtgifter,
                drivstoffType: verdi,
            },
        }));
        nullstillFeil(errorKeyEgenbilUtgifterDrivstoffType);
    };

    const oppdaterEgenBilUtgifterBompenger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const verdi = e.target.value;
        settReisemåte((prev) => ({
            ...prev,
            egenBilUtgifter: {
                ...prev?.egenBilUtgifter,
                bompenger: {
                    label: reisemåteTekster.egen_bil_utgifter_bompenger_tittel[locale],
                    verdi,
                },
            },
        }));
        nullstillFeil(errorKeyEgenbilUtgifterBompenger);
    };

    const oppdaterEgenBilUtgifterFerge = (e: React.ChangeEvent<HTMLInputElement>) => {
        const verdi = e.target.value;
        settReisemåte((prev) => ({
            ...prev,
            egenBilUtgifter: {
                ...prev?.egenBilUtgifter,
                ferge: { label: reisemåteTekster.egen_bil_utgifter_ferge_tittel[locale], verdi },
            },
        }));
        nullstillFeil(errorKeyEgenbilUtgifterFerge);
    };

    const oppdaterEgenBilUtgifterPiggdekkavgift = (e: React.ChangeEvent<HTMLInputElement>) => {
        const verdi = e.target.value;
        settReisemåte((prev) => ({
            ...prev,
            egenBilUtgifter: {
                ...prev?.egenBilUtgifter,
                piggdekkavgift: {
                    label: reisemåteTekster.egen_bil_utgifter_piggdekkavgift_tittel[locale],
                    verdi,
                },
            },
        }));
        nullstillFeil(errorKeyEgenbilUtgifterPiggdekkavgift);
    };

    const offentligTransportJa = reisemåte?.kanReiseMedOffentligTransport?.verdi === 'JA';
    const offentligTransportNei = reisemåte?.kanReiseMedOffentligTransport?.verdi === 'NEI';
    const bilNei = reisemåte?.kanBenytteEgenBil?.verdi === 'NEI';
    const bilJa = reisemåte?.kanBenytteEgenBil?.verdi === 'JA';
    const drosjeNei = reisemåte?.kanBenytteDrosje?.verdi === 'NEI';

    const kanIkkeReiseOffentligBegrunnelser =
        reisemåte?.kanIkkeReiseMedOffentligTransportBegrunnelser?.verdier.map((v) => v.verdi) ?? [];
    const helsemessigeÅrsakerOffentligValgt =
        kanIkkeReiseOffentligBegrunnelser.includes('helsemessigeÅrsaker');
    const dårligTransporttilbudValgt =
        kanIkkeReiseOffentligBegrunnelser.includes('dårligTransportTilbud');

    const helsemessigeÅrsakerBilValgt = reisemåte?.kanIkkeBenytteEgenBilBegrunnelser?.verdier
        .map((v) => v.verdi)
        .includes('helsemessigeÅrsaker');

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={reisemåteTekster.tittel} level="2" size="medium" />
            <VStack gap="space-8">
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeyKanReiseMedOffentligTransport]?.id}
                    tekst={reisemåteTekster.radio_kan_reise_offentlig}
                    value={reisemåte?.kanReiseMedOffentligTransport?.verdi ?? ''}
                    onChange={oppdaterKanReiseMedOffentligTransport}
                    error={valideringsfeil[errorKeyKanReiseMedOffentligTransport]?.melding}
                />
                {offentligTransportJa && (
                    <>
                        <TotalutgifterFelt
                            id={valideringsfeil[errorKeyTotalutgifterOffentligTransport]?.id}
                            label={reisemåteTekster.totalutgifter_offentlig_transport_label[locale]}
                            description={
                                reisemåteTekster.totalutgifter_offentlig_transport_beskrivelse[
                                    locale
                                ]
                            }
                            inputMode="numeric"
                            value={reisemåte?.totalUtgifterOffentligTransport?.verdi ?? ''}
                            error={
                                valideringsfeil[errorKeyTotalutgifterOffentligTransport]?.melding
                            }
                            onChange={(e) => {
                                const verdi = e.target.value;
                                settReisemåte((prev) => ({
                                    ...prev,
                                    totalUtgifterOffentligTransport: {
                                        label: reisemåteTekster
                                            .totalutgifter_offentlig_transport_label[locale],
                                        verdi,
                                    },
                                }));
                                nullstillFeil(errorKeyTotalutgifterOffentligTransport);
                            }}
                        />
                        <Alert variant="info">
                            {reisemåteTekster.kan_reise_offentlig_info[locale]}
                        </Alert>
                    </>
                )}
                {offentligTransportNei && (
                    <>
                        <LocaleCheckboxGroup
                            id={
                                valideringsfeil[
                                    errorKeyKanIkkeReiseMedOffentligTransportBegrunnelse
                                ]?.id
                            }
                            tekst={reisemåteTekster.check_kan_ikke_reise_offentlig_begrunnelse}
                            onChange={oppdaterKanIkkeReiseOffentligBegrunnelse}
                            value={
                                reisemåte?.kanIkkeReiseMedOffentligTransportBegrunnelser?.verdier ??
                                []
                            }
                            error={
                                valideringsfeil[
                                    errorKeyKanIkkeReiseMedOffentligTransportBegrunnelse
                                ]?.melding
                            }
                        />
                        {dårligTransporttilbudValgt && (
                            <Alert variant="info">
                                {reisemåteTekster.info_dårlig_transporttilbud_valg[locale]}
                            </Alert>
                        )}
                        {helsemessigeÅrsakerOffentligValgt && (
                            <Alert variant="info">
                                {reisemåteTekster.info_helsemessige_årsaker_valg[locale]}
                            </Alert>
                        )}
                        <LocaleRadioGroup
                            id={valideringsfeil[errorKeyKanBenytteEgenBil]?.id}
                            tekst={reisemåteTekster.radio_kan_benytte_egen_bil}
                            value={reisemåte?.kanBenytteEgenBil?.verdi ?? ''}
                            onChange={oppdaterKanBenytteEgenBil}
                            error={valideringsfeil[errorKeyKanBenytteEgenBil]?.melding}
                        />
                        {bilNei && (
                            <>
                                <LocaleCheckboxGroup
                                    id={
                                        valideringsfeil[errorKeyKanIkkeBenytteEgenBilBegrunnelse]
                                            ?.id
                                    }
                                    tekst={
                                        reisemåteTekster.check_kan_ikke_benytte_egen_bil_begrunnelse
                                    }
                                    onChange={oppdaterKanIkkeBenytteEgenBilBegrunnelse}
                                    value={
                                        reisemåte?.kanIkkeBenytteEgenBilBegrunnelser?.verdier ?? []
                                    }
                                    error={
                                        valideringsfeil[errorKeyKanIkkeBenytteEgenBilBegrunnelse]
                                            ?.melding
                                    }
                                />
                                {helsemessigeÅrsakerBilValgt && (
                                    <Alert variant="info">
                                        {reisemåteTekster.info_helsemessige_årsaker_valg[locale]}
                                    </Alert>
                                )}
                                <LocaleRadioGroup
                                    id={valideringsfeil[errorKeyKanBenytteDrosje]?.id}
                                    tekst={reisemåteTekster.radio_kan_benytte_drosje}
                                    value={reisemåte?.kanBenytteDrosje?.verdi ?? ''}
                                    onChange={oppdaterKanBenytteDrosje}
                                    error={valideringsfeil[errorKeyKanBenytteDrosje]?.melding}
                                />
                                {drosjeNei && (
                                    <Alert variant="info">
                                        {reisemåteTekster.advarsel_ingen_reisemåte[locale]}
                                    </Alert>
                                )}
                            </>
                        )}
                        {bilJa && (
                            <VStack gap="space-12">
                                <div>
                                    <LocaleHeading
                                        tekst={reisemåteTekster.egen_bil_utgifter_tittel}
                                        level="3"
                                        size="small"
                                    />
                                    <LocaleTekst
                                        tekst={reisemåteTekster.egen_bil_utgifter_beskrivelse}
                                    />
                                </div>
                                <LocaleRadioGroup
                                    id={valideringsfeil[errorKeyEgenbilUtgifterDrivstoffType]?.id}
                                    tekst={reisemåteTekster.egen_bil_utgifter_drivstoff_type}
                                    value={reisemåte?.egenBilUtgifter?.drivstoffType?.verdi ?? ''}
                                    onChange={oppdaterEgenBilUtgifterDrivstoffType}
                                    error={
                                        valideringsfeil[errorKeyEgenbilUtgifterDrivstoffType]
                                            ?.melding
                                    }
                                />
                                <TextField
                                    id={valideringsfeil[errorKeyEgenbilUtgifterBompenger]?.id}
                                    label={
                                        reisemåteTekster.egen_bil_utgifter_bompenger_tittel[locale]
                                    }
                                    inputMode="numeric"
                                    value={reisemåte?.egenBilUtgifter?.bompenger?.verdi ?? ''}
                                    onChange={oppdaterEgenBilUtgifterBompenger}
                                    error={
                                        valideringsfeil[errorKeyEgenbilUtgifterBompenger]?.melding
                                    }
                                />
                                <TextField
                                    id={valideringsfeil[errorKeyEgenbilUtgifterFerge]?.id}
                                    label={reisemåteTekster.egen_bil_utgifter_ferge_tittel[locale]}
                                    inputMode="numeric"
                                    value={reisemåte?.egenBilUtgifter?.ferge?.verdi ?? ''}
                                    onChange={oppdaterEgenBilUtgifterFerge}
                                    error={valideringsfeil[errorKeyEgenbilUtgifterFerge]?.melding}
                                />
                                <TextField
                                    id={valideringsfeil[errorKeyEgenbilUtgifterPiggdekkavgift]?.id}
                                    label={
                                        reisemåteTekster.egen_bil_utgifter_piggdekkavgift_tittel[
                                            locale
                                        ]
                                    }
                                    inputMode="numeric"
                                    value={reisemåte?.egenBilUtgifter?.piggdekkavgift?.verdi ?? ''}
                                    onChange={oppdaterEgenBilUtgifterPiggdekkavgift}
                                    error={
                                        valideringsfeil[errorKeyEgenbilUtgifterPiggdekkavgift]
                                            ?.melding
                                    }
                                />
                            </VStack>
                        )}
                    </>
                )}
            </VStack>
        </Side>
    );
};

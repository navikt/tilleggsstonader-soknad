import { Alert, BodyLong, Box, GuidePanel, Heading, Label, List, VStack } from '@navikt/ds-react';

import {
    AktivitetSpørsmål,
    aktivitetSpørsmålGrafRøtter,
    aktivitetRenderRekkefølge,
    AktivitetGrafKontekst,
    erAktivitetSpørsmålNode,
    rensInaktiveAktivitetSvar,
} from './aktivitetSpørsmålGraf';
import { LesMerHvilkenAktivitet } from './LesMerHvilkenAktivitet';
import { AnnenArbeidsrettetAktivitet } from '../../../components/Aktivitet/AnnenArbeidsrettetAktivitet';
import { ArbeidsrettedeAktiviteter } from '../../../components/Aktivitet/ArbeidsrettedeAktiviteter';
import { ErLærlingEllerLiknende } from '../../../components/Aktivitet/ErLærlingEllerLiknende';
import { LønnetTiltak } from '../../../components/Aktivitet/LønnetTiltak';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleInlineLenke } from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useRegisterAktiviteter } from '../../../context/RegisterAktiviteterContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { useSpørsmålsgrafSteg } from '../../../felles/spørsmålsgraf/useSpørsmålsgrafSteg';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Side } from '../../components/Side';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';
import { aktivitetTekster } from '../../tekster/aktivitet';

export const AktivitetReiseTilSamling = () => {
    const {
        AKTIVITET_TYPE_UTDANNING,
        ANNEN_AKTIVITET,
        ER_LÆRLING_ELLER_LIKNENDE,
        ER_UNDER_25_ÅR,
        FÅR_DEKKET_REISE,
        LØNNET_AKTIVITET,
        MÅ_BETALE_FOR_REISE_TIL_SKOLE,
        VALGTE_AKTIVITETER,
    } = AktivitetSpørsmål;
    const errorKeyValgteAktiviteter = VALGTE_AKTIVITETER;
    const errorKeyAnnenAktivitet = ANNEN_AKTIVITET;
    const errorKeyAnnenAktivitetTypeUtdanning = AKTIVITET_TYPE_UTDANNING;
    const errorKeyErLærlingEllerLiknende = ER_LÆRLING_ELLER_LIKNENDE;
    const errorKeyFårDekketReise = FÅR_DEKKET_REISE;
    const errorKeyErUnder25År = ER_UNDER_25_ÅR;
    const errorKeyMåBetaleForReiseTilSkole = MÅ_BETALE_FOR_REISE_TIL_SKOLE;
    const errorKeyLønnetAktivitet = LØNNET_AKTIVITET;

    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const { aktivitet, settAktivitet } = useReiseTilSamlingSøknad();
    const { registerAktiviteter } = useRegisterAktiviteter();
    const registerAktiviteterEllerTom = registerAktiviteter ?? {};
    const valideringsKontekst: AktivitetGrafKontekst = {
        registerAktiviteter: registerAktiviteterEllerTom,
    };
    const spørsmålsgrafSteg = useSpørsmålsgrafSteg({
        state: aktivitet,
        settState: settAktivitet,
        valideringsKontekst,
        røtter: aktivitetSpørsmålGrafRøtter,
        rensInaktiveSvar: (state) => rensInaktiveAktivitetSvar(state, registerAktiviteterEllerTom),
        erSpørsmålNode: erAktivitetSpørsmålNode,
        settValideringsfeil,
    });

    if (!registerAktiviteter) {
        return null;
    }

    const oppdaterValgteAktiviteter = (nyeValgteAktiviteter: EnumFlereValgFelt<string>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                aktiviteter: nyeValgteAktiviteter,
                annenAktivitet: undefined,
                lønnetAktivitet: undefined,
                annenAktivitetTypeUtdanning: undefined,
                tilleggsopplysningerAnnenAktivitet: undefined,
            }),
            [errorKeyValgteAktiviteter]
        );
    };

    const oppdaterAnnenAktivitet = (verdi: EnumFelt<AnnenAktivitetType>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                annenAktivitet: verdi,
                aktiviteter: undefined,
                lønnetAktivitet: undefined,
                annenAktivitetTypeUtdanning: undefined,
                tilleggsopplysningerAnnenAktivitet: undefined,
            }),
            [errorKeyAnnenAktivitet]
        );
    };

    const oppdaterLønnetAktivitet = (verdi: EnumFelt<JaNei>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                lønnetAktivitet: verdi,
            }),
            [errorKeyLønnetAktivitet]
        );
    };

    const oppdaterAnnenAktivitetTypeUtdanning = (verdi: EnumFelt<AktivitetTypeUtdanning>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                annenAktivitetTypeUtdanning: verdi,
                lønnetAktivitet: undefined,
                tilleggsopplysningerAnnenAktivitet: undefined,
            }),
            [errorKeyAnnenAktivitetTypeUtdanning]
        );
    };

    const oppdaterErLærlingEllerLiknende = (verdi: EnumFelt<JaNei>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                tilleggsopplysningerAnnenAktivitet: {
                    erLærlingEllerLiknende: verdi,
                    fårDekketReise: undefined,
                    erUnder25År: undefined,
                    måBetaleForReiseTilSkole: undefined,
                },
            }),
            [errorKeyErLærlingEllerLiknende]
        );
    };

    const oppdaterFårDekketReise = (verdi: EnumFelt<JaNei>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                tilleggsopplysningerAnnenAktivitet: {
                    erLærlingEllerLiknende:
                        prev.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende,
                    fårDekketReise: verdi,
                    erUnder25År: prev.tilleggsopplysningerAnnenAktivitet?.erUnder25År,
                    måBetaleForReiseTilSkole:
                        prev.tilleggsopplysningerAnnenAktivitet?.måBetaleForReiseTilSkole,
                },
            }),
            [errorKeyFårDekketReise]
        );
    };

    const oppdaterErUnder25År = (verdi: EnumFelt<JaNei>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                tilleggsopplysningerAnnenAktivitet: {
                    erLærlingEllerLiknende:
                        prev.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende,
                    fårDekketReise: prev.tilleggsopplysningerAnnenAktivitet?.fårDekketReise,
                    erUnder25År: verdi,
                    måBetaleForReiseTilSkole: undefined,
                },
            }),
            [errorKeyErUnder25År]
        );
    };

    const oppdaterMåBetaleForReiseTilSkole = (verdi: EnumFelt<JaNei>) => {
        spørsmålsgrafSteg.oppdaterMedGraf(
            (prev) => ({
                ...prev,
                tilleggsopplysningerAnnenAktivitet: {
                    erLærlingEllerLiknende:
                        prev.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende,
                    fårDekketReise: prev.tilleggsopplysningerAnnenAktivitet?.fårDekketReise,
                    erUnder25År: prev.tilleggsopplysningerAnnenAktivitet?.erUnder25År,
                    måBetaleForReiseTilSkole: verdi,
                },
            }),
            [errorKeyMåBetaleForReiseTilSkole]
        );
    };

    const kanFortsette = (): boolean => {
        return spørsmålsgrafSteg.validerSteg(locale);
    };

    const valgteAktiviteter = aktivitet?.aktiviteter;
    const annenAktivitet = aktivitet?.annenAktivitet;
    const lønnetAktivitet = aktivitet?.lønnetAktivitet;
    const annenAktivitetTypeUtdanning = aktivitet?.annenAktivitetTypeUtdanning;
    const erLærlingEllerLiknende =
        aktivitet?.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende;
    const fårDekketReise = aktivitet?.tilleggsopplysningerAnnenAktivitet?.fårDekketReise;
    const erUnder25År = aktivitet?.tilleggsopplysningerAnnenAktivitet?.erUnder25År;
    const måBetaleForReiseTilSkole =
        aktivitet?.tilleggsopplysningerAnnenAktivitet?.måBetaleForReiseTilSkole;
    const aktiveSpørsmål = spørsmålsgrafSteg.aktiveNoder;
    const aktivRenderRekkefølge = aktivitetRenderRekkefølge.filter((spørsmål) =>
        aktiveSpørsmål.has(spørsmål)
    );
    const erAktivtSpørsmål = (spørsmål: (typeof aktivitetRenderRekkefølge)[number]) =>
        aktivRenderRekkefølge.includes(spørsmål);

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={aktivitetTekster.tittel} level="2" size="medium" />
            <GuidePanel>
                <LocaleTekstAvsnitt tekst={aktivitetTekster.guide_innhold} />
            </GuidePanel>
            {erAktivtSpørsmål(VALGTE_AKTIVITETER) && (
                <ArbeidsrettedeAktiviteter
                    spørsmål={aktivitetTekster.hvilken_aktivitet.spm}
                    lesMer={
                        <LesMerHvilkenAktivitet
                            header={aktivitetTekster.hvilken_aktivitet.les_mer.header}
                        />
                    }
                    registerAktiviteter={registerAktiviteter}
                    oppdaterValgteAktiviteter={oppdaterValgteAktiviteter}
                    valgteAktiviteter={valgteAktiviteter}
                    feilmelding={valideringsfeil[errorKeyValgteAktiviteter]}
                />
            )}
            {erAktivtSpørsmål(ANNEN_AKTIVITET) && (
                <>
                    <div>
                        <Label>
                            <LocaleTekst
                                tekst={aktivitetTekster.ingen_registrerte_aktiviterer_overskrift}
                            ></LocaleTekst>
                        </Label>
                        <LesMerHvilkenAktivitet
                            header={
                                aktivitetTekster.hvilken_aktivitet.les_mer
                                    .header_ingen_registrerte_aktiviteter
                            }
                        />
                    </div>
                    <AnnenArbeidsrettetAktivitet
                        aktivitetTekster={aktivitetTekster}
                        radioTekst={aktivitetTekster.radio_annet_uten_registeraktivitet}
                        oppdaterAnnenAktivitet={oppdaterAnnenAktivitet}
                        annenAktivitet={annenAktivitet}
                        feilmelding={valideringsfeil[errorKeyAnnenAktivitet]}
                    />
                </>
            )}
            {erAktivtSpørsmål(AKTIVITET_TYPE_UTDANNING) && (
                <>
                    <LocaleRadioGroup
                        tekst={aktivitetTekster.radio_type_arbeidsrettede_aktiviteter}
                        onChange={oppdaterAnnenAktivitetTypeUtdanning}
                        id={valideringsfeil[errorKeyAnnenAktivitetTypeUtdanning]?.id}
                        error={valideringsfeil[errorKeyAnnenAktivitetTypeUtdanning]?.melding}
                        value={annenAktivitetTypeUtdanning?.verdi || ''}
                    >
                        <LocaleReadMoreMedChildren
                            header={
                                aktivitetTekster.radio_type_arbeidsrettede_aktiviteter_lesmer.header
                            }
                        >
                            <VStack gap="space-20">
                                <BodyLong>
                                    <LocaleTekst
                                        tekst={
                                            aktivitetTekster
                                                .radio_type_arbeidsrettede_aktiviteter_lesmer
                                                .innhold[0]
                                        }
                                    />
                                </BodyLong>
                                <BodyLong>
                                    <LocaleTekst
                                        tekst={
                                            aktivitetTekster
                                                .radio_type_arbeidsrettede_aktiviteter_lesmer
                                                .innhold[1]
                                        }
                                    />
                                </BodyLong>
                                <BodyLong>
                                    <LocaleTekst
                                        tekst={
                                            aktivitetTekster
                                                .radio_type_arbeidsrettede_aktiviteter_lesmer
                                                .innhold[2]
                                        }
                                    />
                                </BodyLong>
                            </VStack>
                        </LocaleReadMoreMedChildren>
                    </LocaleRadioGroup>

                    {erAktivtSpørsmål(ER_LÆRLING_ELLER_LIKNENDE) && (
                        <>
                            <ErLærlingEllerLiknende
                                erLærlingEllerLiknende={erLærlingEllerLiknende}
                                oppdatererLærlingEllerLiknende={oppdaterErLærlingEllerLiknende}
                                feilmelding={valideringsfeil[errorKeyErLærlingEllerLiknende]}
                            />
                            {erAktivtSpørsmål(FÅR_DEKKET_REISE) && (
                                <>
                                    <LocaleRadioGroup
                                        tekst={aktivitetTekster.radio_dekket_reise}
                                        onChange={oppdaterFårDekketReise}
                                        id={valideringsfeil[errorKeyFårDekketReise]?.id}
                                        error={valideringsfeil[errorKeyFårDekketReise]?.melding}
                                        value={fårDekketReise?.verdi || ''}
                                    />
                                    {fårDekketReise?.verdi === 'JA' && (
                                        <Alert variant={'info'}>
                                            <Heading size="small">
                                                <LocaleTekst
                                                    tekst={
                                                        aktivitetTekster.radio_ikke_kvalifisert_tittel
                                                    }
                                                />
                                            </Heading>
                                            <LocaleTekst
                                                tekst={
                                                    aktivitetTekster.radio_dekket_reise_alert_content
                                                }
                                            />
                                        </Alert>
                                    )}
                                </>
                            )}
                            {erAktivtSpørsmål(ER_UNDER_25_ÅR) && (
                                <>
                                    <LocaleRadioGroup
                                        tekst={aktivitetTekster.radio_under_25_år}
                                        id={valideringsfeil[errorKeyErUnder25År]?.id}
                                        error={valideringsfeil[errorKeyErUnder25År]?.melding}
                                        value={erUnder25År?.verdi || ''}
                                        onChange={oppdaterErUnder25År}
                                    />
                                    {erAktivtSpørsmål(MÅ_BETALE_FOR_REISE_TIL_SKOLE) && (
                                        <>
                                            <Alert variant={'info'}>
                                                <Heading size="small">
                                                    <LocaleTekst
                                                        tekst={
                                                            aktivitetTekster.radio_ikke_kvalifisert_tittel
                                                        }
                                                    />
                                                </Heading>
                                                <LocaleTekst
                                                    tekst={
                                                        aktivitetTekster.radio_under_25_år_alert_content
                                                    }
                                                />
                                            </Alert>
                                            <LocaleRadioGroup
                                                tekst={
                                                    aktivitetTekster.radio_må_betale_for_reise_til_skole
                                                }
                                                id={
                                                    valideringsfeil[
                                                        errorKeyMåBetaleForReiseTilSkole
                                                    ]?.id
                                                }
                                                error={
                                                    valideringsfeil[
                                                        errorKeyMåBetaleForReiseTilSkole
                                                    ]?.melding
                                                }
                                                value={måBetaleForReiseTilSkole?.verdi || ''}
                                                onChange={oppdaterMåBetaleForReiseTilSkole}
                                            />
                                            {måBetaleForReiseTilSkole?.verdi === 'NEI' && (
                                                <Alert variant={'info'}>
                                                    <Heading size="small">
                                                        <LocaleTekst
                                                            tekst={
                                                                aktivitetTekster.radio_ikke_kvalifisert_tittel
                                                            }
                                                        />
                                                    </Heading>
                                                    <LocaleTekst
                                                        tekst={
                                                            aktivitetTekster.radio_må_betale_for_reise_til_skole_alert_content
                                                        }
                                                    />
                                                </Alert>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {annenAktivitetTypeUtdanning?.verdi ===
                        AktivitetTypeUtdanning.OPPLÆRING_FOR_VOKSNE && (
                        <Alert variant={'info'}>
                            <Heading size="small">
                                <LocaleTekst
                                    tekst={aktivitetTekster.radio_ikke_kvalifisert_tittel}
                                />
                            </Heading>
                            <LocaleTekst
                                tekst={aktivitetTekster.radio_opplæring_for_voksne_alert_content}
                            />
                        </Alert>
                    )}
                    {erAktivtSpørsmål(LØNNET_AKTIVITET) && (
                        <LønnetTiltak
                            lønnetAktivitet={lønnetAktivitet}
                            oppdaterLønnetAktivitet={oppdaterLønnetAktivitet}
                            feilmelding={valideringsfeil[errorKeyLønnetAktivitet]}
                            radioTekst={aktivitetTekster.radio_lønnet_tiltak}
                            infoalertInnhold={aktivitetTekster.lønnet_tiltak_infoalert_innhold}
                        />
                    )}
                </>
            )}
            {annenAktivitet?.verdi === AnnenAktivitetType.INGEN_AKTIVITET && (
                <Alert variant={'info'}>
                    <Heading size="small">
                        <LocaleTekst tekst={aktivitetTekster.ingen_aktivitet_infoalert_title} />
                    </Heading>
                    <LocaleTekstAvsnitt
                        tekst={aktivitetTekster.ingen_aktivitet_infoalert_innhold.del1}
                    />
                    <Box marginBlock="space-16" asChild>
                        <List>
                            {aktivitetTekster.ingen_aktivitet_infoalert_innhold.del2_lenker.map(
                                (lenke, indeks) => (
                                    <List.Item key={indeks}>
                                        <LocaleInlineLenke tekst={lenke} />
                                    </List.Item>
                                )
                            )}
                        </List>
                    </Box>
                </Alert>
            )}
        </Side>
    );
};

import { Alert, BodyLong, Box, GuidePanel, Heading, Label, List, VStack } from '@navikt/ds-react';

import { LesMerHvilkenAktivitet } from './LesMerHvilkenAktivitet';
import {
    skalViseAktivitetTypeUtdanningValg,
    skalViseArbeidsrettedeAktiviteter,
    skalViseErLærlingEllerLiknende,
    skalViseErUnder25År,
    skalViseFårDekketReise,
    skalViseLønnetTiltak,
    skalViseMåBetaleForReiseTilSkole,
} from './synlighet';
import {
    errorKeyAnnenAktivitet,
    errorKeyAnnenAktivitetTypeUtdanning,
    errorKeyErLærlingEllerLiknende,
    errorKeyErUnder25År,
    errorKeyFårDekketReise,
    errorKeyLønnetAktivitet,
    errorKeyMåBetaleForReiseTilSkole,
    errorKeyValgteAktiviteter,
    validerAktivitetReiseTilSamling,
} from './validering';
import { skalTaStillingTilLønnetTiltak } from '../../../components/Aktivitet/aktivitetUtils';
import { AnnenArbeidsrettetAktivitet } from '../../../components/Aktivitet/AnnenArbeidsrettetAktivitet';
import { ArbeidsrettedeAktiviteter } from '../../../components/Aktivitet/ArbeidsrettedeAktiviteter';
import { ErLærlingEllerLiknende } from '../../../components/Aktivitet/ErLærlingEllerLiknende';
import { LønnetTiltak } from '../../../components/Aktivitet/LønnetTiltak';
import { skalTaStillingTilAnnenAktivitet } from '../../../components/Aktivitet/registerAktivitetUtil';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleInlineLenke } from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useRegisterAktiviteter } from '../../../context/RegisterAktiviteterContext';
import { useReiseTilSamlingSøknad } from '../../../context/ReiseTilSamlingSøknadContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

export const AktivitetReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const {
        aktivitet,
        oppdaterAktivitet,
        tilleggsopplysninger,
        settTilleggsopplysninger,
        oppdaterTilleggsopplysninger,
    } = useReiseTilSamlingSøknad();
    const { registerAktiviteter } = useRegisterAktiviteter();

    const nullstillLønnetAktivitet = (
        nyeValgteAktiviteter: EnumFlereValgFelt<string> | undefined,
        nyAnnenAktivitet: EnumFelt<AnnenAktivitetType> | undefined
    ) => {
        const skalIkkeTaStilling = !skalTaStillingTilLønnetTiltak(
            nyeValgteAktiviteter,
            nyAnnenAktivitet,
            registerAktiviteter
        );
        if (aktivitet?.lønnetAktivitet && skalIkkeTaStilling) {
            oppdaterAktivitet({ lønnetAktivitet: undefined });
            settValideringsfeil((prevState) => ({
                ...prevState,
                lønnetAktivitet: undefined,
            }));
        }
    };

    const nullstillAnnenAktivitet = (nyeValgteAktiviteter: EnumFlereValgFelt<string>) => {
        if (!skalTaStillingTilAnnenAktivitet(nyeValgteAktiviteter)) {
            oppdaterAktivitet({ annenAktivitet: undefined });
            settValideringsfeil((prevState) => ({
                ...prevState,
                [errorKeyAnnenAktivitet]: undefined,
            }));
        }
    };

    const oppdaterValgteAktiviteter = (nyeValgteAktiviteter: EnumFlereValgFelt<string>) => {
        oppdaterAktivitet({ aktiviteter: nyeValgteAktiviteter });
        if (nyeValgteAktiviteter.verdier.length > 0) {
            settValideringsfeil((prevState) => ({
                ...prevState,
                [errorKeyValgteAktiviteter]: undefined,
            }));
        }
        nullstillAnnenAktivitet(nyeValgteAktiviteter);
        nullstillLønnetAktivitet(nyeValgteAktiviteter, aktivitet?.annenAktivitet);
    };

    const oppdaterAnnenAktivitet = (verdi: EnumFelt<AnnenAktivitetType>) => {
        oppdaterAktivitet({ annenAktivitet: verdi });
        settValideringsfeil((prevState) => ({
            ...prevState,
            [errorKeyAnnenAktivitet]: undefined,
        }));
        nullstillLønnetAktivitet(aktivitet?.aktiviteter, verdi);
    };

    const oppdaterLønnetAktivitet = (verdi: EnumFelt<JaNei>) => {
        oppdaterAktivitet({ lønnetAktivitet: verdi });
        settValideringsfeil((prevState) => ({
            ...prevState,
            [errorKeyLønnetAktivitet]: undefined,
        }));
    };

    const oppdaterAnnenAktivitetTypeUtdanning = (verdi: EnumFelt<AktivitetTypeUtdanning>) => {
        oppdaterAktivitet({ annenAktivitetTypeUtdanning: verdi });
        settTilleggsopplysninger(undefined);
        settValideringsfeil((prevState) => ({
            ...prevState,
            [errorKeyAnnenAktivitetTypeUtdanning]: undefined,
            [errorKeyErLærlingEllerLiknende]: undefined,
            [errorKeyFårDekketReise]: undefined,
            [errorKeyErUnder25År]: undefined,
            [errorKeyMåBetaleForReiseTilSkole]: undefined,
        }));
    };

    const oppdaterErLærlingEllerLiknende = (verdi: EnumFelt<JaNei>) => {
        settTilleggsopplysninger({
            erLærlingEllerLiknende: verdi,
            fårDekketReise: undefined,
            erUnder25År: undefined,
            måBetaleForReiseTilSkole: undefined,
        });
        settValideringsfeil((prevState) => ({
            ...prevState,
            [errorKeyErLærlingEllerLiknende]: undefined,
            [errorKeyFårDekketReise]: undefined,
            [errorKeyErUnder25År]: undefined,
            [errorKeyMåBetaleForReiseTilSkole]: undefined,
        }));
    };

    const oppdaterFårDekketReise = (verdi: EnumFelt<JaNei>) => {
        oppdaterTilleggsopplysninger({ fårDekketReise: verdi });
        settValideringsfeil((prevState) => ({
            ...prevState,
            [errorKeyFårDekketReise]: undefined,
        }));
    };

    const oppdaterErUnder25År = (verdi: EnumFelt<JaNei>) => {
        oppdaterTilleggsopplysninger({ erUnder25År: verdi, måBetaleForReiseTilSkole: undefined });
        settValideringsfeil((prevState) => ({
            ...prevState,
            [errorKeyErUnder25År]: undefined,
            [errorKeyMåBetaleForReiseTilSkole]: undefined,
        }));
    };

    const oppdaterMåBetaleForReiseTilSkole = (verdi: EnumFelt<JaNei>) => {
        oppdaterTilleggsopplysninger({ måBetaleForReiseTilSkole: verdi });
        settValideringsfeil((prevState) => ({
            ...prevState,
            [errorKeyMåBetaleForReiseTilSkole]: undefined,
        }));
    };

    if (!registerAktiviteter) {
        return null;
    }

    const kanFortsette = (): boolean => {
        const feil = validerAktivitetReiseTilSamling(
            { ...aktivitet, tilleggsopplysningerAnnenAktivitet: tilleggsopplysninger },
            registerAktiviteter,
            locale
        );

        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const valgteAktiviteter = aktivitet?.aktiviteter;
    const annenAktivitet = aktivitet?.annenAktivitet;
    const lønnetAktivitet = aktivitet?.lønnetAktivitet;
    const annenAktivitetTypeUtdanning = aktivitet?.annenAktivitetTypeUtdanning;
    const erLærlingEllerLiknende = tilleggsopplysninger?.erLærlingEllerLiknende;
    const fårDekketReise = tilleggsopplysninger?.fårDekketReise;
    const erUnder25År = tilleggsopplysninger?.erUnder25År;
    const måBetaleForReiseTilSkole = tilleggsopplysninger?.måBetaleForReiseTilSkole;

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={aktivitetTekster.tittel} level="2" size="medium" />
            <GuidePanel>
                <LocaleTekstAvsnitt tekst={aktivitetTekster.guide_innhold} />
            </GuidePanel>
            {skalViseArbeidsrettedeAktiviteter(registerAktiviteter) && (
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
            {!skalViseArbeidsrettedeAktiviteter(registerAktiviteter) && (
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
            {skalViseAktivitetTypeUtdanningValg(annenAktivitet, valgteAktiviteter) && (
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

                    {skalViseErLærlingEllerLiknende(annenAktivitetTypeUtdanning) && (
                        <>
                            <ErLærlingEllerLiknende
                                erLærlingEllerLiknende={erLærlingEllerLiknende}
                                oppdatererLærlingEllerLiknende={oppdaterErLærlingEllerLiknende}
                                feilmelding={valideringsfeil[errorKeyErLærlingEllerLiknende]}
                            />
                            {skalViseFårDekketReise(erLærlingEllerLiknende) && (
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
                            {skalViseErUnder25År(erLærlingEllerLiknende) && (
                                <>
                                    <LocaleRadioGroup
                                        tekst={aktivitetTekster.radio_under_25_år}
                                        id={valideringsfeil[errorKeyErUnder25År]?.id}
                                        error={valideringsfeil[errorKeyErUnder25År]?.melding}
                                        value={erUnder25År?.verdi || ''}
                                        onChange={oppdaterErUnder25År}
                                    />
                                    {skalViseMåBetaleForReiseTilSkole(erUnder25År) && (
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
                </>
            )}
            {skalViseLønnetTiltak(annenAktivitetTypeUtdanning) && (
                <LønnetTiltak
                    lønnetAktivitet={lønnetAktivitet}
                    oppdaterLønnetAktivitet={oppdaterLønnetAktivitet}
                    feilmelding={valideringsfeil[errorKeyLønnetAktivitet]}
                    radioTekst={aktivitetTekster.radio_lønnet_tiltak}
                    infoalertInnhold={aktivitetTekster.lønnet_tiltak_infoalert_innhold}
                />
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

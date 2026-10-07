import React from 'react';

import {
    BodyShort,
    DatePicker,
    GuidePanel,
    Heading,
    InlineMessage,
    Link,
    VStack,
    useDatepicker,
} from '@navikt/ds-react';

import {
    errorKeyFomFlyttedato,
    errorKeyMåBoBorteHjemmefra,
    errorKeySkalBrukeFolkeregAdresse,
    errorKeyTomFlyttedato,
    midlertidigAdresseFeilIder,
    originalAdresseFeilIder,
    validerAdresser,
} from './validering';
import { AdresseVelger } from '../../../components/AdresseVelger/AdresseVelger';
import { AlertIkkeRett } from '../../../components/AlertIkkeRett';
import { Side } from '../../../components/Side';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { EnumFelt, VerdiFelt } from '../../../typer/skjema';
import { Adresse, JaNei } from '../../../typer/søknad';
import { inneholderFeil } from '../../../typer/validering';
import { landkodeTilNavn } from '../../../utils/adresseUtils';
import { nullableTilDato, tilLocaleDateString } from '../../../utils/formateringUtils';
import { useReiseOppstartAvslutningHjemreiseSøknad } from '../../context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { adresserTekster } from '../../tekster/adresser';

export const AdresserReiseOppstartAvslutningHjemreise = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const { adresser, settAdresser } = useReiseOppstartAvslutningHjemreiseSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const harStrukturertAdresse = !!person.strukturertAdresse;
    const skalViseAdresseSpørsmål = adresser?.måBoBorteHjemmefra?.verdi === 'JA';
    const skalViseAlertIkkeRett = adresser?.måBoBorteHjemmefra?.verdi === 'NEI';
    const måFylleUtOriginalAdresseManuelt =
        adresser?.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI' ||
        (adresser?.skalReiseFraFolkeregistrertAdresse?.verdi === 'JA' && !harStrukturertAdresse);

    const nullstillAdresseFeil = (errorKeys: string[]) => {
        settValideringsfeil((prev) =>
            errorKeys.reduce((acc, key) => ({ ...acc, [key]: undefined }), prev)
        );
    };

    const håndterMåBoBorteHjemmefra = (felt: EnumFelt<JaNei>) => {
        settAdresser((prev) => ({
            ...prev,
            måBoBorteHjemmefra: felt,
            skalReiseFraFolkeregistrertAdresse:
                felt.verdi === 'JA' ? prev?.skalReiseFraFolkeregistrertAdresse : undefined,
            adresseOriginaltBosted: felt.verdi === 'JA' ? prev?.adresseOriginaltBosted : undefined,
            adresseMidlertidigBosted:
                felt.verdi === 'JA' ? prev?.adresseMidlertidigBosted : undefined,
            fomFlyttedato: felt.verdi === 'JA' ? prev?.fomFlyttedato : undefined,
            tomFlyttedato: felt.verdi === 'JA' ? prev?.tomFlyttedato : undefined,
        }));
        nullstillAdresseFeil([
            errorKeyMåBoBorteHjemmefra,
            errorKeySkalBrukeFolkeregAdresse,
            errorKeyFomFlyttedato,
            errorKeyTomFlyttedato,
        ]);
    };

    const håndterSkalBrukeFolkeregAdresse = (felt: EnumFelt<JaNei>) => {
        settAdresser((prev) => ({
            ...prev,
            skalReiseFraFolkeregistrertAdresse: felt,
            adresseOriginaltBosted:
                felt.verdi === 'JA' && person.strukturertAdresse
                    ? {
                          land: {
                              label: adresserTekster.original_adresse_spørsmål.land.label[locale],
                              verdi: person.strukturertAdresse.land,
                              svarTekst:
                                  landkodeTilNavn[person.strukturertAdresse.land] ??
                                  person.strukturertAdresse.land,
                          },
                          gateadresse: {
                              label: adresserTekster.original_adresse_spørsmål.gateadresse.label[
                                  locale
                              ],
                              verdi: person.strukturertAdresse.gateadresse,
                          },
                          postnummer: {
                              label: adresserTekster.original_adresse_spørsmål.postnummer.label[
                                  locale
                              ],
                              verdi: person.strukturertAdresse.postnummer,
                          },
                          poststed: {
                              label: adresserTekster.original_adresse_spørsmål.poststed.label[
                                  locale
                              ],
                              verdi: person.strukturertAdresse.poststed,
                          },
                      }
                    : undefined,
        }));
        nullstillAdresseFeil([errorKeySkalBrukeFolkeregAdresse]);
    };

    const håndterOriginalAdresseEndring = (felt: Partial<Adresse>, feltNavn: keyof Adresse) => {
        settAdresser((prev) => ({
            ...prev,
            adresseOriginaltBosted: { ...prev?.adresseOriginaltBosted, ...felt },
        }));
        if (felt[feltNavn]?.verdi) {
            nullstillAdresseFeil([originalAdresseFeilIder[feltNavn]]);
        }
    };

    const håndterMidlertidigAdresseEndring = (felt: Partial<Adresse>, feltNavn: keyof Adresse) => {
        settAdresser((prev) => ({
            ...prev,
            adresseMidlertidigBosted: { ...prev?.adresseMidlertidigBosted, ...felt },
        }));
        if (felt[feltNavn]?.verdi) {
            nullstillAdresseFeil([midlertidigAdresseFeilIder[feltNavn]]);
        }
    };

    const oppdaterFomFlyttedato = (verdi: VerdiFelt<string> | undefined) => {
        settAdresser((prev) => ({ ...prev, fomFlyttedato: verdi }));
        if (verdi?.verdi) {
            nullstillAdresseFeil([errorKeyFomFlyttedato]);
        }
    };

    const oppdaterTomFlyttedato = (verdi: VerdiFelt<string> | undefined) => {
        settAdresser((prev) => ({ ...prev, tomFlyttedato: verdi }));
        if (verdi?.verdi) {
            nullstillAdresseFeil([errorKeyTomFlyttedato]);
        }
    };

    const { datepickerProps: datepickerPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(adresser?.fomFlyttedato?.verdi),
        onDateChange: (val) =>
            oppdaterFomFlyttedato(
                val
                    ? {
                          label: adresserTekster.dato_flytting.fom[locale],
                          verdi: tilLocaleDateString(val),
                      }
                    : undefined
            ),
    });

    const { datepickerProps: datepickerPropsTom, inputProps: inputPropsTom } = useDatepicker({
        defaultSelected: nullableTilDato(adresser?.tomFlyttedato?.verdi),
        onDateChange: (val) =>
            oppdaterTomFlyttedato(
                val
                    ? {
                          label: adresserTekster.dato_flytting.tom[locale],
                          verdi: tilLocaleDateString(val),
                      }
                    : undefined
            ),
    });

    const kanFortsette = (): boolean => {
        const feil = validerAdresser(adresser, locale, harStrukturertAdresse);
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side validerSteg={kanFortsette}>
            <LocaleHeading tekst={adresserTekster.tittel} level="2" size="medium" />
            <GuidePanel>
                <LocaleTekstAvsnitt tekst={adresserTekster.guide_innhold} />
            </GuidePanel>
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyMåBoBorteHjemmefra]?.id}
                tekst={adresserTekster.radio_må_bo_borte_hjemmefra}
                value={adresser?.måBoBorteHjemmefra?.verdi ?? ''}
                onChange={håndterMåBoBorteHjemmefra}
                error={valideringsfeil[errorKeyMåBoBorteHjemmefra]?.melding}
            />
            {skalViseAlertIkkeRett && (
                <AlertIkkeRett beskrivelse={adresserTekster.advarsel_må_bo_borte_hjemmefra} />
            )}
            {skalViseAdresseSpørsmål && (
                <>
                    <VStack gap="space-16">
                        <Heading level="3" size="small">
                            <LocaleTekst tekst={adresserTekster.dato_flytting.label} />
                        </Heading>
                        <DatePicker {...datepickerPropsFom}>
                            <DatePicker.Input
                                id={valideringsfeil[errorKeyFomFlyttedato]?.id}
                                label={adresserTekster.dato_flytting.fom[locale]}
                                error={valideringsfeil[errorKeyFomFlyttedato]?.melding}
                                {...inputPropsFom}
                            />
                        </DatePicker>
                        <DatePicker {...datepickerPropsTom}>
                            <DatePicker.Input
                                id={valideringsfeil[errorKeyTomFlyttedato]?.id}
                                label={adresserTekster.dato_flytting.tom[locale]}
                                error={valideringsfeil[errorKeyTomFlyttedato]?.melding}
                                {...inputPropsTom}
                            />
                        </DatePicker>
                    </VStack>

                    <VStack gap="space-16">
                        <Heading level="3" size="small">
                            <LocaleTekst tekst={adresserTekster.original_adresse_tittel} />
                        </Heading>
                        <BodyShort>
                            <LocaleTekst
                                tekst={adresserTekster.folkereg_adresse}
                                argument0={person.adresse}
                            />
                        </BodyShort>
                        <InlineMessage status="info">
                            <BodyShort spacing>
                                {adresserTekster.folkereg_adresse_info[locale]}
                                <Link
                                    href={adresserTekster.folkereg_adresse_lenke_url}
                                    target="_blank"
                                    inlineText
                                    rel="noopener noreferrer"
                                >
                                    {adresserTekster.folkereg_adresse_lenke_tekst[locale]}
                                </Link>
                                .
                            </BodyShort>
                        </InlineMessage>
                        <LocaleRadioGroup
                            id={valideringsfeil[errorKeySkalBrukeFolkeregAdresse]?.id}
                            tekst={adresserTekster.radio_samme_som_flyttet_fra}
                            value={adresser?.skalReiseFraFolkeregistrertAdresse?.verdi ?? ''}
                            onChange={håndterSkalBrukeFolkeregAdresse}
                            error={valideringsfeil[errorKeySkalBrukeFolkeregAdresse]?.melding}
                        />
                        {adresser?.skalReiseFraFolkeregistrertAdresse?.verdi === 'JA' &&
                            !harStrukturertAdresse && (
                                <BodyShort>
                                    <LocaleTekst
                                        tekst={adresserTekster.fallback_ingen_strukturert_adresse}
                                    />
                                </BodyShort>
                            )}
                        {måFylleUtOriginalAdresseManuelt && (
                            <AdresseVelger
                                adresse={adresser?.adresseOriginaltBosted}
                                onChange={håndterOriginalAdresseEndring}
                                tekster={adresserTekster.original_adresse_spørsmål}
                                feil={valideringsfeil}
                                feilIder={originalAdresseFeilIder}
                            />
                        )}
                    </VStack>
                    <VStack gap="space-8">
                        <Heading level="3" size="small">
                            <LocaleTekst tekst={adresserTekster.midlertidig_adresse_tittel} />
                        </Heading>
                        <AdresseVelger
                            adresse={adresser?.adresseMidlertidigBosted}
                            onChange={håndterMidlertidigAdresseEndring}
                            tekster={adresserTekster.midlertidig_adresse_spørsmål}
                            feil={valideringsfeil}
                            feilIder={midlertidigAdresseFeilIder}
                        />
                    </VStack>
                </>
            )}
        </Side>
    );
};

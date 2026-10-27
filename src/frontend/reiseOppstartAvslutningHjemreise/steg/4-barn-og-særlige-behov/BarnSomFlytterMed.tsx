import React from 'react';

import { Checkbox, CheckboxGroup, VStack } from '@navikt/ds-react';

import { errorKeyHarBarnUnder18SomHarFlyttetMed, errorKeyHvilkeBarnFlytterMed } from './validering';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedLenke } from '../../../components/Teksthåndtering/LocaleReadMore';
import { Barn } from '../../../typer/barn';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { barnOgSærligeBehovTekster } from '../../tekster/barnOgSærligeBehov';
import { BarnOgSærligeBehovReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

interface Props {
    locale: Locale;
    barn: Barn[];
    barnOgSærligeBehov: BarnOgSærligeBehovReiseOppstartAvslutningHjemreise | undefined;
    valideringsfeil: Valideringsfeil;
    settBarnOgSærligeBehov: React.Dispatch<
        React.SetStateAction<BarnOgSærligeBehovReiseOppstartAvslutningHjemreise | undefined>
    >;
    settValideringsfeil: React.Dispatch<React.SetStateAction<Valideringsfeil>>;
}

export const BarnSomFlytterMed: React.FC<Props> = ({
    locale,
    barn,
    barnOgSærligeBehov,
    valideringsfeil,
    settBarnOgSærligeBehov,
    settValideringsfeil,
}) => {
    const barnAlternativer = barn
        .filter((it) => it.alder <= 18)
        .map((it) => ({
            ident: it.ident,
            label: `${it.visningsnavn}, født ${formaterIsoDato(it.fødselsdato)}`,
        }));
    const barnPerIdent = new Map(barnAlternativer.map((it) => [it.ident, it.label]));

    const oppdaterHarBarnUnder18SomHarFlyttetMed = (verdi: EnumFelt<JaNei>) => {
        settBarnOgSærligeBehov((prev) => ({
            ...prev,
            harBarnUnder18SomHarFlyttetMed: verdi,
            hvilkeBarnFlytterMed: verdi.verdi === 'NEI' ? undefined : prev?.hvilkeBarnFlytterMed,
        }));
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyHarBarnUnder18SomHarFlyttetMed]: undefined,
            [errorKeyHvilkeBarnFlytterMed]: undefined,
        }));
    };

    const oppdaterHvilkeBarnFlytterMed = (valgteBarn: string[]) => {
        const felt: EnumFlereValgFelt<string> = {
            label: barnOgSærligeBehovTekster.hvilke_barn_flytter_med.label[locale],
            verdier: valgteBarn.map((ident) => ({
                verdi: ident,
                label: barnPerIdent.get(ident) ?? ident,
            })),
            alternativer: barnAlternativer.map((it) => it.label),
        };

        settBarnOgSærligeBehov((prev) => ({
            ...prev,
            hvilkeBarnFlytterMed: felt,
        }));
        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyHvilkeBarnFlytterMed]: undefined,
        }));
    };

    return (
        <VStack gap="space-24">
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyHarBarnUnder18SomHarFlyttetMed]?.id}
                tekst={barnOgSærligeBehovTekster.radio_har_barn_under_18_som_har_flyttet_med}
                value={barnOgSærligeBehov?.harBarnUnder18SomHarFlyttetMed?.verdi ?? ''}
                onChange={oppdaterHarBarnUnder18SomHarFlyttetMed}
                error={valideringsfeil[errorKeyHarBarnUnder18SomHarFlyttetMed]?.melding}
            />
            {barnOgSærligeBehov?.harBarnUnder18SomHarFlyttetMed?.verdi === 'JA' && (
                <CheckboxGroup
                    id={valideringsfeil[errorKeyHvilkeBarnFlytterMed]?.id}
                    legend={barnOgSærligeBehovTekster.hvilke_barn_flytter_med.label[locale]}
                    value={
                        barnOgSærligeBehov?.hvilkeBarnFlytterMed?.verdier.map(
                            (valgtBarn) => valgtBarn.verdi
                        ) ?? []
                    }
                    onChange={oppdaterHvilkeBarnFlytterMed}
                    error={valideringsfeil[errorKeyHvilkeBarnFlytterMed]?.melding}
                >
                    <LocaleReadMoreMedLenke
                        tekst={barnOgSærligeBehovTekster.info_søke_for_ikke_registrert_barn}
                    />
                    {barnAlternativer.map((it) => (
                        <Checkbox key={it.ident} value={it.ident}>
                            {it.label}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            )}
        </VStack>
    );
};

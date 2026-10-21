import React from 'react';

import { Checkbox, CheckboxGroup, VStack } from '@navikt/ds-react';

import { errorKeyHarBarnUnder18SomHarFlyttetMed, errorKeyHvilkeBarnFlytterMed } from './validering';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { Barn } from '../../../typer/barn';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { barnOgHelseTekster } from '../../tekster/barnOgHelse';
import { BarnOgHelseReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

interface Props {
    locale: Locale;
    barn: Barn[];
    barnOgHelse: BarnOgHelseReiseOppstartAvslutningHjemreise | undefined;
    valideringsfeil: Valideringsfeil;
    settBarnOgHelse: React.Dispatch<
        React.SetStateAction<BarnOgHelseReiseOppstartAvslutningHjemreise | undefined>
    >;
    settValideringsfeil: React.Dispatch<React.SetStateAction<Valideringsfeil>>;
}

export const BarnSomFlytterMed: React.FC<Props> = ({
    locale,
    barn,
    barnOgHelse,
    valideringsfeil,
    settBarnOgHelse,
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
        settBarnOgHelse((prev) => ({
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
            label: barnOgHelseTekster.hvilke_barn_flytter_med.label[locale],
            verdier: valgteBarn.map((ident) => ({
                verdi: ident,
                label: barnPerIdent.get(ident) ?? ident,
            })),
            alternativer: barnAlternativer.map((it) => it.label),
        };

        settBarnOgHelse((prev) => ({
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
                tekst={barnOgHelseTekster.radio_har_barn_under_18_som_har_flyttet_med}
                value={barnOgHelse?.harBarnUnder18SomHarFlyttetMed?.verdi ?? ''}
                onChange={oppdaterHarBarnUnder18SomHarFlyttetMed}
                error={valideringsfeil[errorKeyHarBarnUnder18SomHarFlyttetMed]?.melding}
            />
            {barnOgHelse?.harBarnUnder18SomHarFlyttetMed?.verdi === 'JA' && (
                <CheckboxGroup
                    id={valideringsfeil[errorKeyHvilkeBarnFlytterMed]?.id}
                    legend={barnOgHelseTekster.hvilke_barn_flytter_med.label[locale]}
                    value={
                        barnOgHelse?.hvilkeBarnFlytterMed?.verdier.map(
                            (valgtBarn) => valgtBarn.verdi
                        ) ?? []
                    }
                    onChange={oppdaterHvilkeBarnFlytterMed}
                    error={valideringsfeil[errorKeyHvilkeBarnFlytterMed]?.melding}
                >
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

import { BarnepassIntern } from './typer';
import { Barn } from '../../../typer/barn';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../utils/datoUtils';
import { hentBeskjedMedEttParameter } from '../../../utils/tekstUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { barnepassTekster } from '../../tekster/barnepass';

export const errorKeyHvemPasser = (barn: Barn) => `${barn.ident}_hvemPasser`;
export const errorKeyStartetFemte = (barn: Barn) => `${barn.ident}_startetFemte`;
export const errorKeyÅrsak = (barn: Barn) => `${barn.ident}_årsak`;
export const errorKeyHarUtgifter = (barn: Barn) => `${barn.ident}_harUtgifter`;
export const errorKeyUtgifterFom = (barn: Barn) => `${barn.ident}_fomUtgifterFom`;
export const errorKeyUtgifterTom = (barn: Barn) => `${barn.ident}_fomUtgifterTom`;

export const valider = (
    barnMedPass: BarnepassIntern[],
    personbarn: Barn[],
    locale: Locale
): Valideringsfeil => {
    return barnMedPass.reduce((acc, barn, indeks) => {
        const barnPerson = finnBarn(personbarn, barn.ident);
        if (!barn.type) {
            acc = {
                ...acc,
                [errorKeyHvemPasser(barnPerson)]: {
                    id: `${indeks}-0`,
                    melding: hentBeskjedMedEttParameter(
                        barnPerson.fornavn,
                        barnepassTekster.hvem_passer_feilmelding[locale]
                    ),
                },
            };
        }
        if (!barn.utgifter?.harUtgifterTilPassHelePerioden) {
            acc = {
                ...acc,
                [errorKeyHarUtgifter(barnPerson)]: {
                    id: `${indeks}-3`,
                    melding: hentBeskjedMedEttParameter(
                        barnPerson.fornavn,
                        barnepassTekster.har_utgifter_feilmelding[locale]
                    ),
                },
            };
        }
        if (
            barn.utgifter?.harUtgifterTilPassHelePerioden?.verdi === 'NEI' &&
            harVerdi(barn.utgifter?.fom?.verdi) === false
        ) {
            acc = {
                ...acc,
                [errorKeyUtgifterFom(barnPerson)]: {
                    id: `${indeks}-4`,
                    melding: hentBeskjedMedEttParameter(
                        barnPerson.fornavn,
                        barnepassTekster.utgifter_fom_feilmelding[locale]
                    ),
                },
            };
        }
        if (
            barn.utgifter?.harUtgifterTilPassHelePerioden?.verdi === 'NEI' &&
            harVerdi(barn.utgifter?.tom?.verdi) === false
        ) {
            acc = {
                ...acc,
                [errorKeyUtgifterTom(barnPerson)]: {
                    id: `${indeks}-5`,
                    melding: hentBeskjedMedEttParameter(
                        barnPerson.fornavn,
                        barnepassTekster.utgifter_tom_feilmelding[locale]
                    ),
                },
            };
        }
        if (harVerdi(barn.utgifter?.fom?.verdi) && harVerdi(barn.utgifter?.tom?.verdi)) {
            if (
                !erDatoEtterEllerLik(
                    barn.utgifter?.fom?.verdi || '',
                    barn.utgifter?.tom?.verdi || ''
                )
            ) {
                acc = {
                    ...acc,
                    [errorKeyUtgifterTom(barnPerson)]: {
                        id: `${indeks}-6`,
                        melding: barnepassTekster.feilmelding_tom_før_fom[locale],
                    },
                };
            }
        }

        if (er9ellerEldre(barnPerson) && barn.startetIFemte === undefined) {
            acc = {
                ...acc,
                [errorKeyStartetFemte(barnPerson)]: {
                    id: `${indeks}-1`,
                    melding: hentBeskjedMedEttParameter(
                        barnPerson.fornavn,
                        barnepassTekster.startet_femte_feilmelding[locale]
                    ),
                },
            };
        }
        if (barn.startetIFemte?.verdi === 'JA' && !barn.årsak) {
            acc = {
                ...acc,
                [errorKeyÅrsak(barnPerson)]: {
                    id: `${indeks}-2`,
                    melding: hentBeskjedMedEttParameter(
                        barnPerson.fornavn,
                        barnepassTekster.årsak_ekstra_pass_feilmelding[locale]
                    ),
                },
            };
        }
        return acc;
    }, {} as Valideringsfeil);
};

export const finnBarn = (barn: Barn[], ident: string): Barn => {
    return barn.find((b) => b.ident === ident)!;
};

export const er9ellerEldre = (barn: Barn): boolean => barn.alder >= 9;

export const harValgtBarnOver9år = (barn: Barn[], valgteBarn: string[]): boolean =>
    barn.some((b) => valgteBarn.some((ident) => ident === b.ident) && er9ellerEldre(b));

export const harBarnUnder2år = (barn: Barn[]): boolean => barn.some((b) => b.alder < 2);

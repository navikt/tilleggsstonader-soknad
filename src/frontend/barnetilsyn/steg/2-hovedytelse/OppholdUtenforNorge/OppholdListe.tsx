import React from 'react';

import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack, Label } from '@navikt/ds-react';

import LagredeOpphold from './LagredeOpphold';
import Opphold from './Opphold';
import { oppdaterOpphold, opprettOppholdForNesteId } from './oppholdUtil';
import { OppdatertOppholdFelt } from './typer';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { inneholderFeil } from '../../../../typer/validering';
import { hovedytelseInnhold, OppholdUtenforNorgeInnhold } from '../../../tekster/hovedytelse';
import { validerOppholdUtenforNorgeUnderRedigering } from '../validering';

const teksterOppholdUtenforNorge = hovedytelseInnhold.arbeidOgOpphold.oppholdUtenforNorge;
// TODO må legge till validering av opphold når man klikker på neste
const OppholdListe: React.FC<{
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >;
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
    tekster: OppholdUtenforNorgeInnhold;
}> = ({ keyOpphold, arbeidOgOpphold, settArbeidOgOpphold, tekster }) => {
    const { locale } = useSpråk();
    const { settValideringsfeil } = useSøknad();

    /**
     * Returnerer en metode som er generisk som oppdaterer felter i oppholdutenfor norge,
     * [oppholdUtenforNorgeSiste12mnd] eller [oppholdUtenforNorgeNeste12mnd]
     */
    const oppdaterOppholdUtenforNorge: OppdatertOppholdFelt = (id: number, key, verdi) => {
        settArbeidOgOpphold((prevState) => {
            return {
                ...prevState,
                [keyOpphold]: oppdaterOpphold(prevState[keyOpphold], id, key, verdi),
            };
        });
    };

    const validerOppholdUnderRedigeringOgOppdaterFeil = (): boolean => {
        const oppholdUnderRedigering = arbeidOgOpphold[keyOpphold].find(
            (opphold) => !opphold.lagret
        );
        if (oppholdUnderRedigering) {
            const feil = validerOppholdUtenforNorgeUnderRedigering(
                oppholdUnderRedigering,
                tekster,
                locale,
                keyOpphold
            );
            if (inneholderFeil(feil)) {
                settValideringsfeil((prevState) => ({
                    ...prevState,
                    ...feil,
                }));
                return false;
            }
        }
        return true;
    };

    const leggTilOpphold = () => {
        const gyldig = validerOppholdUnderRedigeringOgOppdaterFeil();
        if (!gyldig) {
            return;
        }
        settArbeidOgOpphold((prevState) => {
            const prevOppholdListe = prevState[keyOpphold];
            return {
                ...prevState,
                [keyOpphold]: [
                    ...prevOppholdListe.map((prevOpphold) => ({ ...prevOpphold, lagret: true })),
                    opprettOppholdForNesteId(prevOppholdListe),
                ],
            };
        });
    };

    const slettOpphold = (id: number) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            [keyOpphold]: prevState[keyOpphold].filter((opphold) => opphold._id !== id),
        }));
    };

    const oppholdUtenforNorge = arbeidOgOpphold[keyOpphold];
    const ulagredeOpphold = oppholdUtenforNorge.filter((opphold) => !opphold.lagret);
    return (
        <>
            <LagredeOpphold
                lagredeOpphold={oppholdUtenforNorge.filter((opphold) => opphold.lagret)}
                slettOpphold={slettOpphold}
                locale={locale}
            />
            {ulagredeOpphold.length > 0 && (
                <div>
                    <Label>{teksterOppholdUtenforNorge.label_flere_utenlandsopphold[locale]}</Label>
                    <div>
                        <Button
                            variant={'tertiary'}
                            onClick={() =>
                                slettOpphold(ulagredeOpphold[ulagredeOpphold.length - 1]._id)
                            }
                        >
                            {teksterOppholdUtenforNorge.knapp_angre_legg_til[locale]}
                        </Button>
                    </div>
                </div>
            )}
            {ulagredeOpphold.map((opphold) => (
                <Opphold
                    keyOpphold={keyOpphold}
                    opphold={opphold}
                    oppdater={oppdaterOppholdUtenforNorge}
                    tekster={tekster}
                    locale={locale}
                />
            ))}
            <HStack>
                <Button variant={'tertiary'} onClick={leggTilOpphold} icon={<PlusIcon />}>
                    {teksterOppholdUtenforNorge.knapp_legg_til[locale]}
                </Button>
            </HStack>
        </>
    );
};

export default OppholdListe;

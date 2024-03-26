import React from 'react';

import { PlusIcon } from '@navikt/aksel-icons';
import { Button, HStack, Label } from '@navikt/ds-react';

import LagredeOpphold from './LagredeOpphold';
import Opphold from './Opphold';
import { OppdatertOppholdFelt } from './typer';
import { oppdaterOpphold, opprettOppholdForNesteId } from './util';
import {
    nullstillteOppholsfeilNeste12mnd,
    nullstillteOppholsfeilSiste12mnd,
    validerOppholdUtenforNorgeUnderRedigering,
} from './validering';
import { useSpråk } from '../../../../context/SpråkContext';
import { useSøknad } from '../../../../context/SøknadContext';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { inneholderFeil } from '../../../../typer/validering';
import { OppholdInnhold, oppholdUtenforNorgeInnhold } from '../../../tekster/opphold';

const OppholdListe: React.FC<{
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >;
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
    tekster: OppholdInnhold;
}> = ({ keyOpphold, arbeidOgOpphold, settArbeidOgOpphold, tekster }) => {
    const { locale } = useSpråk();
    const { settValideringsfeil } = useSøknad();

    const oppholdUtenforNorge = arbeidOgOpphold[keyOpphold];
    const ulagretOpphold = oppholdUtenforNorge.find((opphold) => !opphold.lagret);
    const lagredeOpphold = oppholdUtenforNorge.filter((opphold) => opphold.lagret);

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

    const slettValideringsfeilHvisUlagret = (id: number) => {
        if (ulagretOpphold?._id === id) {
            const nullstiltefeilter =
                keyOpphold === 'oppholdUtenforNorgeSiste12mnd'
                    ? nullstillteOppholsfeilSiste12mnd
                    : nullstillteOppholsfeilNeste12mnd;
            settValideringsfeil((prevState) => ({
                ...prevState,
                ...nullstiltefeilter,
            }));
        }
    };

    const slettOpphold = (id: number) => {
        settArbeidOgOpphold((prevState) => ({
            ...prevState,
            [keyOpphold]: prevState[keyOpphold].filter((opphold) => opphold._id !== id),
        }));
        slettValideringsfeilHvisUlagret(id);
    };

    return (
        <>
            <LagredeOpphold
                lagredeOpphold={oppholdUtenforNorge.filter((opphold) => opphold.lagret)}
                slettOpphold={slettOpphold}
                locale={locale}
            />
            {lagredeOpphold.length > 0 && ulagretOpphold && (
                <div>
                    <Label>{oppholdUtenforNorgeInnhold.label_flere_utenlandsopphold[locale]}</Label>
                    <div>
                        <Button
                            variant={'tertiary'}
                            onClick={() => slettOpphold(ulagretOpphold._id)}
                        >
                            {oppholdUtenforNorgeInnhold.knapp_angre_legg_til[locale]}
                        </Button>
                    </div>
                </div>
            )}
            {ulagretOpphold && (
                <Opphold
                    keyOpphold={keyOpphold}
                    opphold={ulagretOpphold}
                    oppdater={oppdaterOppholdUtenforNorge}
                    tekster={tekster}
                    locale={locale}
                />
            )}
            <HStack>
                <Button variant={'tertiary'} onClick={leggTilOpphold} icon={<PlusIcon />}>
                    {oppholdUtenforNorgeInnhold.knapp_legg_til[locale]}
                </Button>
            </HStack>
        </>
    );
};
export default OppholdListe;

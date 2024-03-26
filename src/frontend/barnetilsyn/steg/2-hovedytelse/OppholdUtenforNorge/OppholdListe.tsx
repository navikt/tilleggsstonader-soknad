import React from 'react';

import styled from 'styled-components';

import { PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Label, VStack } from '@navikt/ds-react';
import { AGray800 } from '@navikt/ds-tokens/dist/tokens';

import Opphold from './Opphold';
import { oppdaterOpphold, opprettOppholdForNesteId } from './oppholdUtil';
import { OppdatertOppholdFelt } from './typer';
import { useSpråk } from '../../../../context/SpråkContext';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { formaterNullableIsoDato } from '../../../../utils/formatering';
import { hovedytelseInnhold, OppholdUtenforNorgeInnhold } from '../../../tekster/hovedytelse';

const teksterOppholdUtenforNorge = hovedytelseInnhold.arbeidOgOpphold.oppholdUtenforNorge;

const VisningAvOpphold = styled(VStack)`
    border: 1px solid ${AGray800};
    padding: 1rem 1rem 0 1rem;
`;

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

    const leggTilOpphold = () => {
        // TODO valider
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
            {oppholdUtenforNorge.length > 1 && (
                <Label>{teksterOppholdUtenforNorge.dineOpphold[locale]}</Label>
            )}
            {oppholdUtenforNorge
                .filter((opphold) => opphold.lagret)
                .map((opphold) => (
                    <VisningAvOpphold gap={'1'}>
                        <BodyShort weight={'semibold'}>{opphold.land?.svarTekst}</BodyShort>
                        {(opphold.årsak?.verdier || []).map((årsak) => (
                            <BodyShort>{årsak.label}</BodyShort>
                        ))}
                        <BodyShort>
                            {formaterNullableIsoDato(opphold.fom?.verdi)} -{' '}
                            {formaterNullableIsoDato(opphold.tom?.verdi)}
                        </BodyShort>
                        <HStack>
                            <Button variant={'tertiary'} onClick={() => slettOpphold(opphold._id)}>
                                {teksterOppholdUtenforNorge.knapp_slett[locale]}
                            </Button>
                        </HStack>
                    </VisningAvOpphold>
                ))}

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

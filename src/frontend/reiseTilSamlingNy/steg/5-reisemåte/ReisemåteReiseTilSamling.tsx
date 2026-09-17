import { VStack } from '@navikt/ds-react';

import {
    erReisemåteSpørsmålNode,
    reiseTilSamlingVisningsrekkefølge,
    reisemåteSpørsmålGraf,
    reisemåteTittel,
    rensInaktiveReisemåteSvar,
} from './reisemåteSpørsmålGraf';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { renderSpørsmålNode } from '../../../felles/spørsmålsgraf/rendering';
import { useSpørsmålsgrafSteg } from '../../../felles/spørsmålsgraf/useSpørsmålsgrafSteg';
import { Side } from '../../components/Side';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';

export const ReisemåteReiseTilSamling = () => {
    const { locale } = useSpråk();
    const { reisemåte, settReisemåte } = useReiseTilSamlingSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const spørsmålsgrafSteg = useSpørsmålsgrafSteg({
        state: reisemåte,
        settState: settReisemåte,
        valideringsKontekst: {},
        røtter: reisemåteSpørsmålGraf,
        rensInaktiveSvar: rensInaktiveReisemåteSvar,
        erSpørsmålNode: erReisemåteSpørsmålNode,
        settValideringsfeil,
    });
    const aktiveNoderIRekkefølge = spørsmålsgrafSteg.finnAktiveNoderIRekkefølge(
        reiseTilSamlingVisningsrekkefølge
    );

    return (
        <Side validerSteg={() => spørsmålsgrafSteg.validerSteg(locale)}>
            <LocaleHeading tekst={reisemåteTittel} level="2" size="medium" />
            <VStack gap="space-8">
                {aktiveNoderIRekkefølge.map((node) =>
                    renderSpørsmålNode({
                        node,
                        state: reisemåte,
                        locale,
                        valideringsfeil,
                        oppdaterState: (oppdatering) =>
                            spørsmålsgrafSteg.oppdaterMedGraf(oppdatering),
                        nullstillFeil: spørsmålsgrafSteg.nullstillFeil,
                    })
                )}
            </VStack>
        </Side>
    );
};

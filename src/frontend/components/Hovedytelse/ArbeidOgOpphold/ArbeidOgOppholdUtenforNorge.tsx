import React from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import JobberDuIAnnetLand from './JobberDuIAnnetLand';
import OppholdUtenforNorgeSiste12Mnd from './Opphold/OppholdUtenforNorgeSiste12Mnd';
import Pengestøtte from './Pengestøtte';
import { arbeidOgOppholdInnhold } from '../../../barnetilsyn/tekster/opphold';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import { Valideringsfeil } from '../../../typer/validering';
import { PellePanel } from '../../PellePanel/PellePanel';
import LocaleInlineLenke from '../../Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../../Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../UnderspørsmålContainer';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
    valideringsfeil: Valideringsfeil;
    settValideringsfeil: React.Dispatch<React.SetStateAction<Valideringsfeil>>;
}

const ArbeidOgOppholdUtenforNorge: React.FC<Props> = ({
    arbeidOgOpphold,
    settArbeidOgOpphold,
    valideringsfeil,
    settValideringsfeil,
}) => {
    return (
        <UnderspørsmålContainer>
            <VStack gap="6">
                <Heading size="medium">
                    <LocaleTekst tekst={arbeidOgOppholdInnhold.tittel} />
                </Heading>
                <PellePanel>
                    <LocaleInlineLenke tekst={arbeidOgOppholdInnhold.guide_innhold} />
                </PellePanel>

                <JobberDuIAnnetLand
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                    valideringsfeil={valideringsfeil}
                    settValideringsfeil={settValideringsfeil}
                />
                <Pengestøtte
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                    valideringsfeil={valideringsfeil}
                    settValideringsfeil={settValideringsfeil}
                />
                <OppholdUtenforNorgeSiste12Mnd
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                    valideringsfeil={valideringsfeil}
                    settValideringsfeil={settValideringsfeil}
                />
            </VStack>
        </UnderspørsmålContainer>
    );
};

export default ArbeidOgOppholdUtenforNorge;

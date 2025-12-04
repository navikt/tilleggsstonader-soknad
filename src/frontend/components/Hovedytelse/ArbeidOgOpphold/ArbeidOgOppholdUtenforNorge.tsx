import React from 'react';

import { GuidePanel, Heading, VStack } from '@navikt/ds-react';

import JobberDuIAnnetLand from './JobberDuIAnnetLand';
import OppholdUtenforNorgeSiste12Mnd from './Opphold/OppholdUtenforNorgeSiste12Mnd';
import Pengestøtte from './Pengestøtte';
import { arbeidOgOppholdInnhold } from '../../../barnetilsyn/tekster/opphold';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import LocaleInlineLenke from '../../Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../../Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../UnderspørsmålContainer';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const ArbeidOgOppholdUtenforNorge: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
    return (
        <UnderspørsmålContainer>
            <VStack gap="6">
                <Heading size="medium" level={'2'}>
                    <LocaleTekst tekst={arbeidOgOppholdInnhold.tittel} />
                </Heading>
                <GuidePanel>
                    <LocaleInlineLenke tekst={arbeidOgOppholdInnhold.guide_innhold} />
                </GuidePanel>

                <JobberDuIAnnetLand
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                />
                <Pengestøtte
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                />
                <OppholdUtenforNorgeSiste12Mnd
                    arbeidOgOpphold={arbeidOgOpphold}
                    settArbeidOgOpphold={settArbeidOgOpphold}
                />
            </VStack>
        </UnderspørsmålContainer>
    );
};

export default ArbeidOgOppholdUtenforNorge;

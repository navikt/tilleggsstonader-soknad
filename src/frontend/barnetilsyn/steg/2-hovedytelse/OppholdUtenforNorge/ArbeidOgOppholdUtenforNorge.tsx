import React from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import JobberDuIAnnetLand from './JobberDuIAnnetLand';
import MottarDuPengestøtte from './MottarDuPengestøtte';
import OppholdUtenforNorgeContainer from './OppholdUtenforNorgeContainer';
import { skalTaStillingTilOppholdUtenforNorge, skalTaStillingTilPengestøtte } from './util';
import { PellePanel } from '../../../../components/PellePanel/PellePanel';
import LocaleInlineLenke from '../../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../../../../components/Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../../../components/UnderspørsmålContainer';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { arbeidOgOppholdInnhold } from '../../../tekster/opphold';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

const ArbeidOgOppholdUtenforNorge: React.FC<Props> = ({ arbeidOgOpphold, settArbeidOgOpphold }) => {
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
                />

                {skalTaStillingTilPengestøtte(arbeidOgOpphold) && (
                    <MottarDuPengestøtte
                        arbeidOgOpphold={arbeidOgOpphold}
                        settArbeidOgOpphold={settArbeidOgOpphold}
                    />
                )}
                {skalTaStillingTilOppholdUtenforNorge(arbeidOgOpphold) && (
                    <OppholdUtenforNorgeContainer
                        arbeidOgOpphold={arbeidOgOpphold}
                        settArbeidOgOpphold={settArbeidOgOpphold}
                    />
                )}
            </VStack>
        </UnderspørsmålContainer>
    );
};

export default ArbeidOgOppholdUtenforNorge;

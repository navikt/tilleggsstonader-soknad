import { GuidePanel, Heading, VStack } from '@navikt/ds-react';
import type React from 'react';
import { arbeidOgOppholdInnhold } from '../../../passAvBarn/tekster/opphold';
import type { ArbeidOgOpphold } from '../../../typer/søknad';
import { LocaleInlineLenke } from '../../Teksthåndtering/LocaleInlineLenke';
import { LocaleTekst } from '../../Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../UnderspørsmålContainer';
import { JobberDuIAnnetLand } from './JobberDuIAnnetLand';
import { OppholdUtenforNorgeSiste12Mnd } from './Opphold/OppholdUtenforNorgeSiste12Mnd';
import { Pengestøtte } from './Pengestøtte';

interface Props {
    arbeidOgOpphold: ArbeidOgOpphold;
    settArbeidOgOpphold: React.Dispatch<React.SetStateAction<ArbeidOgOpphold>>;
}

export const ArbeidOgOppholdUtenforNorge: React.FC<Props> = ({
    arbeidOgOpphold,
    settArbeidOgOpphold
}) => {
    return (
        <UnderspørsmålContainer>
            <VStack gap="space-24">
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

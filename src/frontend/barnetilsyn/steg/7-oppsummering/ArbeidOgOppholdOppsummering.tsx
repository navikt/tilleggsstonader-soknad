import React from 'react';

import styled from 'styled-components';

import { BodyShort, Label, VStack } from '@navikt/ds-react';
import { AGray50 } from '@navikt/ds-tokens/dist/tokens';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { fellesTekster } from '../../../tekster/felles';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold, JaNei, OppholdUtenforNorge } from '../../../typer/søknad';
import { TekstElement } from '../../../typer/tekst';
import { formaterIsoDato } from '../../../utils/formatering';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const teksterArbeidOgOpphold = oppsummeringTekster.accordians.arbeid_og_opphold;

const Oppholdsboks = styled(VStack).attrs({ gap: '2' })`
    background: ${AGray50};
    padding: 0.75rem;
`;

const labels = (enumFlereValgFelt: EnumFlereValgFelt<unknown>) =>
    enumFlereValgFelt.verdier.map((verdi) => verdi.label).join(', ');

const Oppholdsliste: React.FC<{
    tittel: TekstElement<string>;
    svar?: EnumFelt<JaNei>;
    liste: OppholdUtenforNorge[];
}> = ({ tittel, svar, liste }) => {
    if (!svar) return null;

    return (
        <VStack gap={'2'}>
            <Label>
                <LocaleTekst tekst={tittel} />
            </Label>
            {svar.verdi === 'NEI' && <BodyShort>{svar.svarTekst}</BodyShort>}
            {liste.map((opphold, indeks) => (
                <Oppholdsboks key={indeks}>
                    {opphold.land && (
                        <div>
                            <Label>
                                <LocaleTekst tekst={fellesTekster.land} />
                            </Label>
                            <BodyShort>{opphold.land.svarTekst}</BodyShort>
                        </div>
                    )}
                    {opphold.årsak && (
                        <div>
                            <Label>
                                <LocaleTekst tekst={fellesTekster.årsak} />
                            </Label>
                            <BodyShort>{labels(opphold.årsak)}</BodyShort>
                        </div>
                    )}
                    {opphold.fom && opphold.tom && (
                        <div>
                            <Label>
                                <LocaleTekst tekst={fellesTekster.periode} />
                            </Label>
                            <BodyShort>
                                {formaterIsoDato(opphold.fom.verdi)} -{' '}
                                {formaterIsoDato(opphold.tom.verdi)}
                            </BodyShort>
                        </div>
                    )}
                </Oppholdsboks>
            ))}
        </VStack>
    );
};

const ArbeidOgOppholdOppsummering: React.FC<{ arbeidOgOpphold: ArbeidOgOpphold }> = ({
    arbeidOgOpphold,
}) => {
    return (
        <>
            {arbeidOgOpphold.jobberIAnnetLand && (
                <div>
                    <Label>
                        <LocaleTekst tekst={teksterArbeidOgOpphold.jobb} />
                    </Label>
                    {arbeidOgOpphold.jobberIAnnetLand.verdi === 'NEI' && (
                        <BodyShort>{arbeidOgOpphold.jobberIAnnetLand.svarTekst}</BodyShort>
                    )}
                    {arbeidOgOpphold.jobbAnnetLand && (
                        <BodyShort>{arbeidOgOpphold.jobbAnnetLand.svarTekst}</BodyShort>
                    )}
                </div>
            )}
            {arbeidOgOpphold.harPengestøtteAnnetLand && (
                <div>
                    <Label>
                        <LocaleTekst tekst={teksterArbeidOgOpphold.pengestøtte} />
                    </Label>
                    <BodyShort>{labels(arbeidOgOpphold.harPengestøtteAnnetLand)}</BodyShort>
                    {arbeidOgOpphold.pengestøtteAnnetLand && (
                        <BodyShort>{arbeidOgOpphold.pengestøtteAnnetLand.svarTekst}</BodyShort>
                    )}
                </div>
            )}

            <Oppholdsliste
                tittel={teksterArbeidOgOpphold.oppholdSiste12mnd}
                svar={arbeidOgOpphold.harOppholdUtenforNorgeSiste12mnd}
                liste={arbeidOgOpphold.oppholdUtenforNorgeSiste12mnd}
            />

            <Oppholdsliste
                tittel={teksterArbeidOgOpphold.oppholdNeste12mnd}
                svar={arbeidOgOpphold.harOppholdUtenforNorgeNeste12mnd}
                liste={arbeidOgOpphold.oppholdUtenforNorgeNeste12mnd}
            />
        </>
    );
};

export default ArbeidOgOppholdOppsummering;

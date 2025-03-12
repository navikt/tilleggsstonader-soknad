import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringPanelHeader } from '../../../components/Oppsummering/OppsummeringPanelHeader';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, Barnepass } from '../../../typer/barn';
import { Person } from '../../../typer/person';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { barnepassTekster } from '../../tekster/barnepass';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const BarnOver9År: React.FC<{ barn: Barn; barnepass: Barnepass }> = ({ barn, barnepass }) => (
    <>
        <FormSummary.Answer>
            <FormSummary.Label>
                <LocaleTekst
                    tekst={barnepassTekster.startet_femte_radio.header}
                    argument0={barn.fornavn}
                />
            </FormSummary.Label>
            <FormSummary.Value>{barnepass.startetIFemte.svarTekst}</FormSummary.Value>
        </FormSummary.Answer>
        {barnepass.årsak && (
            <FormSummary.Answer>
                <FormSummary.Label>
                    <LocaleTekst
                        tekst={barnepassTekster.årsak_ekstra_pass_radio.header}
                        argument0={barn.fornavn}
                    />
                </FormSummary.Label>
                <FormSummary.Value>{barnepass.årsak.svarTekst}</FormSummary.Value>
            </FormSummary.Answer>
        )}
    </>
);

export const PassAvBarn: React.FC<{ person: Person; barnMedBarnepass: Barnepass[] }> = ({
    person,
    barnMedBarnepass,
}) => (
    <OppsummeringPanelHeader tittel={oppsummeringTekster.barnepass} lenke={RouteTilPath.BARNEPASS}>
        {barnMedBarnepass.map((barnepass) => {
            const barn = person.barn.find((barn) => barn.ident === barnepass.ident);
            return barn ? (
                <React.Fragment key={barnepass.ident}>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <LocaleTekst
                                tekst={barnepassTekster.hvem_passer_radio.header}
                                argument0={barn.fornavn}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>{barnepass.type.svarTekst}</FormSummary.Value>
                    </FormSummary.Answer>
                    {barn.alder >= 9 && <BarnOver9År barn={barn} barnepass={barnepass} />}
                </React.Fragment>
            ) : null;
        })}
    </OppsummeringPanelHeader>
);

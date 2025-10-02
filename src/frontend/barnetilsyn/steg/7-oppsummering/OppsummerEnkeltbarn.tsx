import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, Barnepass } from '../../../typer/barn';
import { formaterPeriode } from '../../../utils/formateringUtils';
import { barnepassTekster } from '../../tekster/barnepass';

export function OppsummeringEnkeltbarn({ barn, barnepass }: { barn?: Barn; barnepass: Barnepass }) {
    if (!barn) {
        return null;
    }
    return (
        <React.Fragment>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <LocaleTekst
                        tekst={barnepassTekster.hvem_passer_radio.header}
                        argument0={barn.fornavn}
                    />
                </FormSummary.Label>
                <FormSummary.Value>{barnepass.type.svarTekst}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <LocaleTekst
                        tekst={barnepassTekster.har_utgifter_til_pass_radio.header}
                        argument0={barn.fornavn}
                    />
                </FormSummary.Label>
                <FormSummary.Value>
                    {barnepass.utgifter.harUtgifterTilPassHelePerioden?.svarTekst}
                </FormSummary.Value>
            </FormSummary.Answer>
            {barnepass.utgifter.harUtgifterTilPassHelePerioden?.verdi === 'NEI' && (
                <HarUtgifterTilPassHelePerioden barnepass={barnepass} />
            )}
            {barn.alder >= 9 && <BarnOver9År barn={barn} barnepass={barnepass} />}
        </React.Fragment>
    );
}

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

const HarUtgifterTilPassHelePerioden: React.FC<{ barnepass: Barnepass }> = ({ barnepass }) => (
    <FormSummary.Answer>
        <FormSummary.Label>
            <LocaleTekst tekst={barnepassTekster.utgifter_dato.label} />
        </FormSummary.Label>
        {barnepass.utgifter.fom?.verdi && barnepass.utgifter.tom?.verdi && (
            <FormSummary.Value>
                {formaterPeriode(barnepass.utgifter.fom?.verdi, barnepass.utgifter.tom?.verdi)}
            </FormSummary.Value>
        )}
    </FormSummary.Answer>
);

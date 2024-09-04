import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { flervalgTilKommaStreng } from './utils';
import { fellesTekster } from '../../../tekster/felles';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei, OppholdUtenforNorge } from '../../../typer/søknad';
import { TekstElement } from '../../../typer/tekst';
import { formaterIsoDato } from '../../../utils/formatering';
import LocaleTekst from '../../Teksthåndtering/LocaleTekst';

const OppholdOppsummering: React.FC<{
    tittel: TekstElement<string>;
    harOppholdSvar?: EnumFelt<JaNei>;
    opphold: OppholdUtenforNorge[];
}> = ({ tittel, harOppholdSvar, opphold }) => {
    if (!harOppholdSvar) return null;

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <LocaleTekst tekst={tittel} />
            </FormSummary.Label>
            {harOppholdSvar.verdi === 'NEI' && (
                <FormSummary.Value>{harOppholdSvar.svarTekst}</FormSummary.Value>
            )}
            {opphold.length > 0 && (
                <FormSummary.Answers className="Blue">
                    {opphold.map((opphold, indeks) => (
                        <FormSummary.Answer key={indeks}>
                            <FormSummary.Label>
                                {opphold.land && (
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <LocaleTekst tekst={fellesTekster.land} />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            {opphold.land.svarTekst}
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                )}
                                {opphold.årsak && (
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <LocaleTekst tekst={fellesTekster.årsak} />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            {flervalgTilKommaStreng(opphold.årsak)}
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                )}
                                {opphold.fom && opphold.tom && (
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <LocaleTekst tekst={fellesTekster.periode} />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            {formaterIsoDato(opphold.fom.verdi)} -{' '}
                                            {formaterIsoDato(opphold.tom.verdi)}
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                )}
                            </FormSummary.Label>
                        </FormSummary.Answer>
                    ))}
                </FormSummary.Answers>
            )}
        </FormSummary.Answer>
    );
};

export default OppholdOppsummering;

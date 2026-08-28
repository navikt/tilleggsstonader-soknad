import { FormSummary } from '@navikt/ds-react';
import type React from 'react';
import { fellesTekster } from '../../../tekster/felles';
import type { EnumFelt } from '../../../typer/skjema';
import type { JaNei, OppholdUtenforNorge } from '../../../typer/søknad';
import type { TekstElement } from '../../../typer/tekst';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { LocaleTekst } from '../../Teksthåndtering/LocaleTekst';
import { flervalgTilKommaStreng } from './utils';

export const OppholdOppsummering: React.FC<{
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
                <FormSummary.Value>
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
                </FormSummary.Value>
            )}
        </FormSummary.Answer>
    );
};

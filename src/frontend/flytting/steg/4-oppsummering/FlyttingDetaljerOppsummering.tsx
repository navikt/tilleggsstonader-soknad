import { FormSummary } from '@navikt/ds-react';

import { Answer } from '../../../components/Oppsummering/Answer';
import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { formaterAdresse } from '../../../utils/adresseUtils';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { RouteTilPath } from '../../routing/routesFlytting';
import { flyttingDetaljerTekster as tekster } from '../../tekster/flyttingDetaljer';
import {
    egenutgiftFelter,
    flyttebyråTilbudIndekser,
    FlyttingDetaljer,
} from '../../typer/flyttingDetaljer';

export const FlyttingDetaljerOppsummering = ({ detaljer }: { detaljer: FlyttingDetaljer }) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level="3">
                <LocaleTekst tekst={tekster.tittel} />
            </FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
            <OppsummeringSvar felt={detaljer.årsak} />
            {detaljer.flyttedato && (
                <Answer label={tekster.dato_flytting.label}>
                    {formaterIsoDato(detaljer.flyttedato.verdi)}
                </Answer>
            )}
            <OppsummeringSvar felt={detaljer.skalFlytteFraFolkeregistrertAdresse} />
            {detaljer.adresseDetSkalFlyttesFra && (
                <Answer label={tekster.adresse_fra_tittel}>
                    {formaterAdresse(detaljer.adresseDetSkalFlyttesFra)}
                </Answer>
            )}
            {detaljer.adresse && (
                <Answer label={tekster.adresse_tittel}>{formaterAdresse(detaljer.adresse)}</Answer>
            )}
            <OppsummeringSvar felt={detaljer.flyttemåte} />
            <OppsummeringSvar felt={detaljer.utgifterDekketPåAnnenMåte} />
            {detaljer.flyttemåte?.verdi === 'FLYTTER_SELV' && (
                <>
                    <OppsummeringSvar
                        felt={detaljer.utgifterEgenFlytting?.avstand}
                        valuePostfix="km"
                    />
                    {egenutgiftFelter.map((felt) => (
                        <OppsummeringSvar
                            key={felt}
                            felt={detaljer.utgifterEgenFlytting?.[felt]}
                            valuePostfix="kr"
                        />
                    ))}
                </>
            )}
            {detaljer.flyttemåte?.verdi === 'FLYTTEBYRÅ' && (
                <>
                    {flyttebyråTilbudIndekser.map((index) => (
                        <FormSummary.Answer key={index}>
                            <FormSummary.Label>
                                <LocaleTekst tekst={tekster.tilbud_spørsmål[index].navn.label} />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {detaljer.flyttebyrå?.tilbud[index]?.navn?.verdi}
                                {', '}
                                {detaljer.flyttebyrå?.tilbud[index]?.beløp?.verdi} kr
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    ))}
                </>
            )}
        </FormSummary.Answers>
        <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.FLYTTING_DETALJER} />
    </FormSummary>
);

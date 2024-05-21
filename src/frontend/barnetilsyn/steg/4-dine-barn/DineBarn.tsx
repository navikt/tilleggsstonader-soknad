import { useEffect, useState } from 'react';

import { Alert, BodyShort, BodyLong, Checkbox, CheckboxGroup, Heading } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { formaterIsoDato } from '../../../utils/formatering';
import { harKunValgtEnsligSomHovedytelse } from '../../../utils/hovedytelse';
import { dineBarnTekster } from '../../tekster/dineBarn';
import { harBarnUnder2år, harValgtBarnOver9år } from '../5-pass-av-dine-barn/utils';

const DineBarn = () => {
    const { locale } = useSpråk();
    const { person } = usePerson();
    const {
        valgteBarnIdenter,
        settValgteBarnIdenter,
        settDokumentasjon,
        hovedytelse,
        valideringsfeil,
        settValideringsfeil,
    } = useSøknad();

    const [barnIdenter, settBarnIdenter] = useState<string[]>(valgteBarnIdenter);

    useEffect(() => {
        if (inneholderFeil(valideringsfeil) && barnIdenter.length > 0) {
            settValideringsfeil({});
        }
    }, [valideringsfeil, barnIdenter, settValideringsfeil]);

    const fjernDokumentasjonsFeltForBarnSomErFjernet = () => {
        settDokumentasjon((prevState) =>
            prevState.filter(
                (dokument) =>
                    !dokument.barnId || barnIdenter.some((ident) => dokument.barnId === ident)
            )
        );
    };

    const kanFortsette = (valgteBarn: string[]): boolean => {
        let feil: Valideringsfeil = {};
        if (valgteBarn.length === 0) {
            feil = {
                ...feil,
                hvilkeBarn: { id: '1', melding: dineBarnTekster.hvilke_barn_feilmelding[locale] },
            };
        }
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    const oppdaterSøknad = () => {
        fjernDokumentasjonsFeltForBarnSomErFjernet();
        settValgteBarnIdenter(barnIdenter);
    };

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            validerSteg={() => kanFortsette(barnIdenter)}
            oppdaterSøknad={oppdaterSøknad}
        >
            <Heading size="medium">
                <LocaleTekst tekst={dineBarnTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleInlineLenke tekst={dineBarnTekster.guide_innhold} />
            </PellePanel>
            <div>
                <CheckboxGroup
                    id={valideringsfeil.hvilkeBarn?.id}
                    legend={dineBarnTekster.hvilke_barn_spm[locale]}
                    error={valideringsfeil.hvilkeBarn?.melding}
                    value={barnIdenter}
                    onChange={settBarnIdenter}
                >
                    {person.barn.map((barn) => (
                        <Checkbox key={barn.ident} value={barn.ident}>
                            {barn.visningsnavn}, født {formaterIsoDato(barn.fødselsdato)}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
                {harValgtBarnOver9år(person.barn, barnIdenter) && (
                    <Alert variant="info">
                        <Heading size="small">
                            <LocaleTekst tekst={dineBarnTekster.alert_barn_over_9.tittel} />
                        </Heading>
                        <BodyShort size="medium">
                            <LocaleTekst tekst={dineBarnTekster.alert_barn_over_9.innhold} />
                        </BodyShort>
                    </Alert>
                )}
            </div>

            {harBarnUnder2år(person.barn) && (
                <Alert variant="info">
                    <LocaleTekst tekst={dineBarnTekster.alert_kontantstøtte} />
                </Alert>
            )}
            {!harKunValgtEnsligSomHovedytelse(hovedytelse?.ytelse) && (
                <LocaleReadMoreMedChildren
                    header={dineBarnTekster.søke_for_andre_barn_les_mer_header}
                >
                    <BodyLong spacing>
                        <LocaleInlineLenke
                            tekst={dineBarnTekster.søke_for_andre_barn_les_mer_innhold1}
                        />
                    </BodyLong>
                </LocaleReadMoreMedChildren>
            )}
        </Side>
    );
};
export default DineBarn;

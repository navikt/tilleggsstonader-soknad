import { useState } from 'react';

import { Alert, BodyLong, BodyShort, Checkbox, Heading, Label } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Barn } from '../../../typer/barn';
import { Stønadstype } from '../../../typer/stønadstyper';
import { formaterIsoDato } from '../../../utils/formatering';
import { harKunValgtEnsligSomHovedytelse } from '../../../utils/hovedytelse';
import { dineBarnTekster } from '../../tekster/dineBarn';
import { harBarnUnder2år, harValgtBarnOver9år } from '../5-barnepass/utils';

const DineBarn = () => {
    const { person, settPerson } = usePerson();
    const { settDokumentasjon, hovedytelse } = useSøknad();

    const [personbarn, settPersonbarn] = useState<Barn[]>(person.barn);

    const toggleSkalHaBarnepass = (ident: string) => {
        settPersonbarn((prevBarn) =>
            prevBarn.map((barn) =>
                barn.ident === ident ? { ...barn, skalHaBarnepass: !barn.skalHaBarnepass } : barn
            )
        );
    };

    const fjernDokumentasjonsFeltForBarnSomErFjernet = () => {
        const identer = personbarn.filter((barn) => barn.skalHaBarnepass).map((barn) => barn.ident);
        settDokumentasjon((prevState) =>
            prevState.filter(
                (dokument) => !dokument.barnId || identer.indexOf(dokument.barnId) > -1
            )
        );
    };

    const oppdaterSøknad = () => {
        fjernDokumentasjonsFeltForBarnSomErFjernet();
    };

    return (
        <Side stønadstype={Stønadstype.BARNETILSYN} oppdaterSøknad={oppdaterSøknad}>
            <PellePanel>
                <LocaleInlineLenke tekst={dineBarnTekster.guide_innhold} />
            </PellePanel>
            <div>
                <Label spacing>
                    <LocaleTekst tekst={dineBarnTekster.hvilke_barn_spm} />
                </Label>
                {person.barn.map((barn) => (
                    <Checkbox
                        key={barn.ident}
                        value={barn.ident}
                        checked={barn.skalHaBarnepass ?? false}
                        onChange={() => toggleSkalHaBarnepass(barn.ident)}
                    >
                        {barn.visningsnavn}, født {formaterIsoDato(barn.fødselsdato)}
                    </Checkbox>
                ))}
                {harValgtBarnOver9år(person.barn) && (
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

            {harBarnUnder2år(personbarn) && (
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
                    <BodyLong>
                        <LocaleInlineLenke
                            tekst={dineBarnTekster.søke_for_andre_barn_les_mer_innhold2}
                        />
                    </BodyLong>
                </LocaleReadMoreMedChildren>
            )}
        </Side>
    );
};
export default DineBarn;

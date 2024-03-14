import { Alert, BodyShort, Checkbox, Heading, Label } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { formaterIsoDato } from '../../../utils/formatering';
import { dineBarnTekster } from '../../tekster/dineBarn';
import { er9ellerEldre } from '../5-barnepass/utils';

const DineBarn = () => {
    const { person, toggleSkalHaBarnepass } = usePerson();
    const { settDokumentasjon } = useSøknad();

    const fjernDokumentasjonsFeltForBarnSomErFjernet = () => {
        const identer = person.barn
            .filter((barn) => barn.skalHaBarnepass)
            .map((barn) => barn.ident);
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
                {person.barn.some((barn) => barn.skalHaBarnepass && er9ellerEldre(barn)) && (
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
        </Side>
    );
};
export default DineBarn;

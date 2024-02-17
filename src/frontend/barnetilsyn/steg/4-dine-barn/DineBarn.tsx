import { Checkbox, Label } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { formaterIsoDato } from '../../../utils/formatering';
import { dineBarnTekster } from '../../tekster/dineBarn';

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
        <Side
            stegtittel={dineBarnTekster.steg_tittel}
            stønadstype={Stønadstype.BARNETILSYN}
            oppdaterSøknad={oppdaterSøknad}
        >
            <PellePanel>
                <LocaleTekst tekst={dineBarnTekster.guide_innhold} />
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
                        {barn.navn}, født {formaterIsoDato(barn.fødselsdato)}
                    </Checkbox>
                ))}
            </div>
        </Side>
    );
};
export default DineBarn;

import { Checkbox, Label } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { formaterIsoDato } from '../../../utils/formatering';
import { dineBarnTekster } from '../../tekster/dineBarn';

const DineBarn = () => {
    const { person, toggleSkalHaBarnepass } = usePerson();

    return (
        <Side stegtittel={dineBarnTekster.steg_tittel} stønadstype={Stønadstype.barnetilsyn}>
            <PellePanel>
                <LocaleTekst tekst={dineBarnTekster.guide_innhold} />
            </PellePanel>
            <div>
                <Label spacing>
                    <LocaleTekst tekst={dineBarnTekster.hvilke_barn_spm} />
                </Label>
                {person.barn.map((barn) => (
                    <Checkbox
                        key={barn.id}
                        value={barn.id}
                        checked={barn.skalHaBarnepass}
                        onChange={() => toggleSkalHaBarnepass(barn.id)}
                    >
                        {barn.navn}, født {formaterIsoDato(barn.fødselsdato)}
                    </Checkbox>
                ))}
            </div>
        </Side>
    );
};
export default DineBarn;

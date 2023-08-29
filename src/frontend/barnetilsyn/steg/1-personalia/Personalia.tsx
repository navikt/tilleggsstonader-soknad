import { BodyShort, Heading, Label } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleReadMore from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { formatterAdresse } from '../../../utils/formattering';
import { personaliaTekster } from '../../tekster/personalia';

const Personalia = () => {
    const { person } = usePerson();

    return (
        <Side stegtittel={personaliaTekster.steg_tittel} stønadstype={Stønadstype.barnetilsyn}>
            <Heading size="medium">
                <LocaleTekst tekst={personaliaTekster.innhold_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={personaliaTekster.guide_innhold} />
            </PellePanel>
            <div>
                <Label>
                    <LocaleTekst tekst={personaliaTekster.adresse_label} />
                </Label>
                <BodyShort>{formatterAdresse(person.adresse)}</BodyShort>
                <LocaleReadMore tekst={personaliaTekster.adresse_lesmer} />
            </div>
            <div>
                <Label>
                    <LocaleTekst tekst={personaliaTekster.telefonnr_label} />
                </Label>
                <BodyShort>{person.telefonnr}</BodyShort>
            </div>
            <div>
                <Label>
                    <LocaleTekst tekst={personaliaTekster.epost_label} />
                </Label>
                <BodyShort>{person.epost}</BodyShort>
                <LocaleReadMore tekst={personaliaTekster.tlf_epost_lesmer} />
            </div>
            <div>
                <Label>
                    <LocaleTekst tekst={personaliaTekster.kontonr_label} />
                </Label>
                <BodyShort>{person.epost}</BodyShort>
                <LocaleReadMore tekst={personaliaTekster.kontonr_lesmer} />
            </div>
        </Side>
    );
};
export default Personalia;

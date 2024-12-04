import React from 'react';

import { ErLærlingEllerLiknende } from './ErLærlingEllerLiknende';
import { HarTidligereFullførtVgs } from './HarTidligereFullførtVgs';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Valideringsfeil } from '../../../typer/validering';

interface Props {
    erLærlingEllerLiknende: EnumFelt<JaNei> | undefined;
    oppdatererLærlingEllerLiknende: (verdi: EnumFelt<JaNei>) => void;
    harTidligereFullførtVgs: EnumFelt<JaNei> | undefined;
    oppdaterHarTidligereFullførtVgs: (verdi: EnumFelt<JaNei>) => void;
    valideringsfeil: Valideringsfeil;
}

export const HarRettTilUtstyrsstipend: React.FC<Props> = ({
    erLærlingEllerLiknende,
    oppdatererLærlingEllerLiknende,
    harTidligereFullførtVgs,
    oppdaterHarTidligereFullførtVgs,
    valideringsfeil,
}) => {
    return (
        <UnderspørsmålContainer>
            <ErLærlingEllerLiknende
                erLærlingEllerLiknende={erLærlingEllerLiknende}
                oppdatererLærlingEllerLiknende={oppdatererLærlingEllerLiknende}
                feilmelding={valideringsfeil.erLærlingEllerLiknende}
            />

            {erLærlingEllerLiknende?.verdi === 'NEI' && (
                <HarTidligereFullførtVgs
                    harTidligereFullførtVgs={harTidligereFullførtVgs}
                    oppdaterHarTidligereFullførtVgs={oppdaterHarTidligereFullførtVgs}
                    feilmelding={valideringsfeil.harTidligereFullførtVgs}
                />
            )}
        </UnderspørsmålContainer>
    );
};

import React from 'react';

import { useNavigate } from 'react-router';

import { Avsjekk, AvsjekkTekster } from './Avsjekk';
import { omdirigerTilFyllut } from '../../api/api';
import { SkjematypeFyllUt } from '../../typer/skjematype';

interface Props {
    skjematype: SkjematypeFyllUt;
    tekster: AvsjekkTekster;
    nySøknadPath: string;
}

/**
 * Ja navigerer internt i appen. En full sidelasting ville gått via skjema-routing i backend og
 * sendt bruker tilbake hit.
 */
export const MottarAktivitetspengerAvsjekk: React.FC<Props> = ({
    skjematype,
    tekster,
    nySøknadPath,
}) => {
    const navigate = useNavigate();

    return (
        <Avsjekk
            tekster={tekster}
            legend={'Mottar eller har du nylig søkt om Aktivitetspenger for unge?'}
            onJa={() => navigate(nySøknadPath)}
            onNei={() => omdirigerTilFyllut(skjematype, 'GAMMEL')}
        />
    );
};

import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Kvittering } from './Kvittering/Kvittering';
import { RedirectTilStart } from './RedirectTilStart';
import { RootRoute } from './RootRoute';
import { SøknadsskjemaHeader } from './SøknadsskjemaHeader';
import { skjematypeTilSkjemaId } from '../typer/skjemanavn';
import { Skjematype } from '../typer/skjematyper';
import { TekstElement } from '../typer/tekst';
import { hentStartRoute } from '../utils/routeUtils';

export interface StegRoute {
    path: string;
    element: React.ReactNode;
}

interface Props {
    tittel: TekstElement<string>;
    skjematype: Skjematype;
    harBekreftet: boolean;
    forside: React.ReactNode;
    steg: StegRoute[];
    offentligeSteg?: StegRoute[];
}

export const Søknadsdialog: React.FC<Props> = ({
    tittel,
    skjematype,
    harBekreftet,
    forside,
    steg,
    offentligeSteg = [],
}) => {
    return (
        <>
            <SøknadsskjemaHeader tittel={tittel} skjemaId={skjematypeTilSkjemaId[skjematype]} />
            <Routes>
                <Route path={'/'} element={<RootRoute forside={forside} />} />
                {offentligeSteg.map((it) => (
                    <Route key={it.path} path={it.path} element={it.element} />
                ))}
                <Route
                    path={'*'}
                    element={<SøknadsdialogInnhold harBekreftet={harBekreftet} steg={steg} />}
                />
                <Route
                    path={'/kvittering'}
                    element={<Kvittering pathTilForside={hentStartRoute(skjematype)} />}
                />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold: React.FC<{ harBekreftet: boolean; steg: StegRoute[] }> = ({
    harBekreftet,
    steg,
}) => {
    return (
        <RedirectTilStart harBekreftet={harBekreftet}>
            <Routes>
                {steg.map((it) => (
                    <Route key={it.path} path={it.path} element={it.element} />
                ))}
            </Routes>
        </RedirectTilStart>
    );
};

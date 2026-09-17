import React from 'react';

import { Route, Routes } from 'react-router';

import { RedirectTilStart } from './RedirectTilStart';
import { RootRoute } from './RootRoute';
import { Kvittering } from '../../components/Kvittering/Kvittering';
import { SøknadsskjemaHeader } from '../../components/SøknadsskjemaHeader';
import { skjematypeTilSkjemaId } from '../../typer/skjemanavn';
import { Skjematype } from '../../typer/skjematyper';
import { TekstElement } from '../../typer/tekst';
import { RouteTilPath } from '../routing/routesReiseTilSamling';

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
                    element={<Kvittering pathTilForside={RouteTilPath.FORSIDE} />}
                />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold: React.FC<{
    harBekreftet: boolean;
    steg: StegRoute[];
}> = ({ harBekreftet, steg }) => {
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

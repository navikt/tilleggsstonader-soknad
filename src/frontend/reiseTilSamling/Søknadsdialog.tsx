import React from 'react';

import { Navigate, Route, Routes } from 'react-router';

import { Forside } from './Forside';
import { NesteStegReiseTilSamling } from './steg/2-neste-steg/NesteStegReiseTilSamling';
import { forsideTekster } from './tekster/forside';
import RedirectTilStart from '../components/RedirectTilStart';
import { SøknadsskjemaHeader } from '../components/SøknadsskjemaHeader';
import { useReiseTilSamlingSøknad } from '../context/ReiseTilSamlingSøknadContext';
import { stønadstypeTilSkjemaId } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';
import { RouteTilPath } from './routing/routesReiseTilSamling';
import { HovedytelseReiseTilSamling } from './steg/1-hovedytelse/HovedytelseReiseTilSamling';
import { AktivitetReiseTilSamling } from './steg/2-aktivitet/AktivitetReiseTilSamling';
import { SamlingerReiseTilSamling } from './steg/3-samlinger/SamlingerReiseTilSamling';
import { ReiseavstandReiseTilSamling } from './steg/4-reiseavstand/ReiseavstandReiseTilSamling';

export const Søknadsdialog: React.FC = () => {
    return (
        <>
            <SøknadsskjemaHeader
                tittel={forsideTekster.banner_tittel}
                skjemaId={stønadstypeTilSkjemaId[Stønadstype.REISE_TIL_SAMLING]}
            />
            <Routes>
                <Route path={'/'} element={<Forside />} />
                <Route
                    path={'/hovedytelse'}
                    element={
                        <SøknadsdialogInnhold>
                            <HovedytelseReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/aktivitet'}
                    element={
                        <SøknadsdialogInnhold>
                            <AktivitetReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/samlinger'}
                    element={
                        <SøknadsdialogInnhold>
                            <SamlingerReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/reiseavstand'}
                    element={
                        <SøknadsdialogInnhold>
                            <ReiseavstandReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route
                    path={'/neste-steg'}
                    element={
                        <SøknadsdialogInnhold>
                            <NesteStegReiseTilSamling />
                        </SøknadsdialogInnhold>
                    }
                />
                <Route path={'*'} element={<Navigate to={RouteTilPath.FORSIDE} replace />} />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { harBekreftet } = useReiseTilSamlingSøknad();

    return <RedirectTilStart harBekreftet={harBekreftet}>{children}</RedirectTilStart>;
};

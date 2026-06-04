import React from 'react';

import { Route, Routes } from 'react-router';

import { Forside } from './Forside';
import { Kvittering } from '../components/Kvittering/Kvittering';
import { RedirectTilStart } from '../components/RedirectTilStart';
import { RootRoute } from '../components/RootRoute';
import { SøknadsskjemaHeader } from '../components/SøknadsskjemaHeader';
import { usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
import { fellesTekster } from '../tekster/felles';
import { skjematypeTilSkjemaId } from '../typer/skjemanavn';
import { barnetilsynPath } from './routing/routesBarnetilsyn';
import { Skjematype } from '../typer/skjematyper';
import { HovedytelsePassBarn } from './steg/2-hovedytelse/HovedytelsePassBarn';
import { AktivitetPassAvBarn } from './steg/3-aktivitet/AktivitetPassAvBarn';
import { DineBarn } from './steg/4-dine-barn/DineBarn';
import { PassAvDineBarn } from './steg/5-pass-av-dine-barn/PassAvDineBarn';
import { VedleggPassAvBarn } from './steg/6-vedlegg/VedleggPassAvBarn';
import { Oppsummering } from './steg/7-oppsummering/Oppsummering';

export const Søknadsdialog: React.FC = () => {
    return (
        <>
            <SøknadsskjemaHeader
                tittel={fellesTekster.banner_bt}
                skjemaId={skjematypeTilSkjemaId[Skjematype.BARNETILSYN]}
            />
            <Routes>
                <Route path={'/'} element={<RootRoute forside={<Forside />} />} />
                <Route path={'*'} element={<SøknadsdialogInnhold />} />
                <Route
                    path={'/kvittering'}
                    element={<Kvittering pathTilForside={barnetilsynPath} />}
                />
            </Routes>
        </>
    );
};

const SøknadsdialogInnhold = () => {
    const { harBekreftet } = usePassAvBarnSøknad();
    return (
        <RedirectTilStart harBekreftet={harBekreftet}>
            <Routes>
                <Route path={'/hovedytelse'} element={<HovedytelsePassBarn />} />
                <Route path={'/aktivitet'} element={<AktivitetPassAvBarn />} />
                <Route path={'/dine-barn'} element={<DineBarn />} />
                <Route path={'/barnepass'} element={<PassAvDineBarn />} />
                <Route path={'/vedlegg'} element={<VedleggPassAvBarn />} />
                <Route path={'/oppsummering'} element={<Oppsummering />} />
            </Routes>
        </RedirectTilStart>
    );
};

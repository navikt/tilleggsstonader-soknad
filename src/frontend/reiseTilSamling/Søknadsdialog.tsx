import React from 'react';

import { useReiseTilSamlingSøknad } from './context/ReiseTilSamlingSøknadContext';
import { Forside } from './Forside';
import { HovedytelseReiseTilSamling } from './steg/1-hovedytelse/HovedytelseReiseTilSamling';
import { AktivitetReiseTilSamling } from './steg/2-aktivitet/AktivitetReiseTilSamling';
import { ReiseavstandReiseTilSamling } from './steg/3-reiseavstand/ReiseavstandReiseTilSamling';
import { SamlingerReiseTilSamling } from './steg/4-samlinger/SamlingerReiseTilSamling';
import { ReisemåteReiseTilSamling } from './steg/5-reisemåte/ReisemåteReiseTilSamling';
import { VedleggReiseTilSamling } from './steg/6-vedlegg/VedleggReiseTilSamling';
import { Oppsummering } from './steg/7-oppsummering/Oppsummering';
import { forsideTekster } from './tekster/forside';
import { StegRoute, Søknadsdialog as SøknadsdialogShell } from '../components/Søknadsdialog';
import { Skjematype } from '../typer/skjematyper';

const offentligeSteg: StegRoute[] = [{ path: '/intro', element: <Forside /> }];

const steg: StegRoute[] = [
    { path: '/hovedytelse', element: <HovedytelseReiseTilSamling /> },
    { path: '/aktivitet', element: <AktivitetReiseTilSamling /> },
    { path: '/reiseavstand', element: <ReiseavstandReiseTilSamling /> },
    { path: '/samlinger', element: <SamlingerReiseTilSamling /> },
    { path: '/reisemate', element: <ReisemåteReiseTilSamling /> },
    { path: '/vedlegg', element: <VedleggReiseTilSamling /> },
    { path: '/oppsummering', element: <Oppsummering /> },
];

export const Søknadsdialog: React.FC = () => {
    const { harBekreftet } = useReiseTilSamlingSøknad();

    return (
        <SøknadsdialogShell
            tittel={forsideTekster.banner_tittel}
            skjematype={Skjematype.SØKNAD_REISE_TIL_SAMLING}
            harBekreftet={harBekreftet}
            forside={<Forside />}
            offentligeSteg={offentligeSteg}
            steg={steg}
        />
    );
};

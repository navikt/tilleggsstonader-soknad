import { AdresserOppsummering } from './AdresserOppsummering';
import { AktivitetOppsummering } from './AktivitetOppsummering';
import { BarnOgSærligeBehovOppsummering } from './BarnOgSærligeBehovOppsummering';
import { ReiseinfoOppsummering } from './ReiseinfoOppsummering';
import { HovedytelseOppsummering } from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import { OmDegOppsummering } from '../../../components/Oppsummering/OmDegOppsummering';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useReiseOppstartAvslutningHjemreiseSøknad } from '../../context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { RouteTilPath } from '../../routing/routesReiseOppstartAvslutningHjemreise';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const Oppsummering = () => {
    const { hovedytelse, aktivitet, adresser, barnOgSærligeBehov, reiser } =
        useReiseOppstartAvslutningHjemreiseSøknad();

    return (
        <OppsummeringSide>
            <LocaleHeading tekst={oppsummeringTekster.tittel} size="medium" level="2" />
            <OmDegOppsummering />
            {hovedytelse && (
                <HovedytelseOppsummering
                    hovedytelse={hovedytelse}
                    redigerLenke={RouteTilPath.HOVEDYTELSE}
                />
            )}
            {aktivitet && <AktivitetOppsummering aktivitet={aktivitet} />}
            {adresser && <AdresserOppsummering adresser={adresser} />}
            {barnOgSærligeBehov && (
                <BarnOgSærligeBehovOppsummering barnOgSærligeBehov={barnOgSærligeBehov} />
            )}
            {reiser.length > 0 && <ReiseinfoOppsummering reiser={reiser} />}
        </OppsummeringSide>
    );
};

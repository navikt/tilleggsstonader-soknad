import { DinSituasjonOppsummering } from './DinSituasjonOppsummering';
import { FlyttingDetaljerOppsummering } from './FlyttingDetaljerOppsummering';
import { OmDegOppsummering } from '../../../components/Oppsummering/OmDegOppsummering';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import { VedleggOppsummering } from '../../../components/Oppsummering/VedleggOppsummering';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';
import { RouteTilPath } from '../../routing/routesFlytting';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const Oppsummering = () => {
    const { hovedytelse, dokumentasjon, flyttingDetaljer, arbeidssøker } = useFlyttingSøknad();

    return (
        <OppsummeringSide>
            <LocaleHeading tekst={oppsummeringTekster.tittel} size="medium" level="2" />
            <OmDegOppsummering />
            {hovedytelse && (
                <DinSituasjonOppsummering hovedytelse={hovedytelse} arbeidssøker={arbeidssøker} />
            )}
            {flyttingDetaljer && <FlyttingDetaljerOppsummering detaljer={flyttingDetaljer} />}
            <VedleggOppsummering
                dokumentasjon={dokumentasjon}
                redigerLenke={RouteTilPath.VEDLEGG}
            />
        </OppsummeringSide>
    );
};

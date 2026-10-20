import { FlyttingDetaljerOppsummering } from './FlyttingDetaljerOppsummering';
import { OmDegOppsummering } from '../../../components/Oppsummering/OmDegOppsummering';
import { OppsummeringSide } from '../../../components/Oppsummering/OppsummeringSide';
import { VedleggOppsummering } from '../../../components/Oppsummering/VedleggOppsummering';
import { LocaleHeading } from '../../../components/Teksthåndtering/LocaleHeading';
import { hentAktivDokumentasjon } from '../../context/flyttingDokumentasjon';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';
import { RouteTilPath } from '../../routing/routesFlytting';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const Oppsummering = () => {
    const { dokumentasjon, flyttingDetaljer, dokumentasjonsbehov } = useFlyttingSøknad();

    return (
        <OppsummeringSide>
            <LocaleHeading tekst={oppsummeringTekster.tittel} size="medium" level="2" />
            <OmDegOppsummering />
            {flyttingDetaljer && <FlyttingDetaljerOppsummering detaljer={flyttingDetaljer} />}
            <VedleggOppsummering
                dokumentasjon={hentAktivDokumentasjon(dokumentasjon, dokumentasjonsbehov)}
                redigerLenke={RouteTilPath.VEDLEGG}
            />
        </OppsummeringSide>
    );
};

import { Vedlegg } from '../../../components/Vedlegg/Vedlegg';
import { opprettDokumentasjonsfelt } from '../../../components/Vedlegg/VedleggUtils';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster } from '../../../tekster/vedlegg';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';

export const VedleggFlytting = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useFlyttingSøknad();
    const { locale } = useSpråk();
    const aktivDokumentasjon = opprettDokumentasjonsfelt(
        dokumentasjonsbehov,
        dokumentasjon,
        locale
    );

    return (
        <Vedlegg
            dokumentasjonsbehov={dokumentasjonsbehov}
            settDokumentasjon={settDokumentasjon}
            dokumentasjon={aktivDokumentasjon.map((dok) => ({
                ...dok,
                tittel: typerVedleggTekster[dok.type].tittel[locale],
                beskrivelse: typerVedleggTekster[dok.type].beskrivelse[locale],
            }))}
        />
    );
};

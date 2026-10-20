import { Dispatch, SetStateAction } from 'react';

import { Vedlegg } from '../../../components/Vedlegg/Vedlegg';
import { opprettDokumentasjonsfelt } from '../../../components/Vedlegg/VedleggUtils';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster } from '../../../tekster/vedlegg';
import { DokumentasjonFelt } from '../../../typer/skjema';
import {
    hentAktivDokumentasjon,
    oppdaterAktivDokumentasjon,
} from '../../context/flyttingDokumentasjon';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';

export const VedleggFlytting = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = useFlyttingSøknad();
    const { locale } = useSpråk();
    const aktivDokumentasjon = opprettDokumentasjonsfelt(
        dokumentasjonsbehov,
        dokumentasjon,
        locale
    );

    const settAktivDokumentasjon: Dispatch<SetStateAction<DokumentasjonFelt[]>> = (oppdatering) => {
        settDokumentasjon((tidligere) => {
            const aktive = hentAktivDokumentasjon(tidligere, dokumentasjonsbehov);
            const oppdaterte =
                typeof oppdatering === 'function' ? oppdatering(aktive) : oppdatering;
            return oppdaterAktivDokumentasjon(tidligere, oppdaterte, dokumentasjonsbehov);
        });
    };

    return (
        <Vedlegg
            dokumentasjonsbehov={dokumentasjonsbehov}
            settDokumentasjon={settAktivDokumentasjon}
            dokumentasjon={aktivDokumentasjon.map((dok) => ({
                ...dok,
                tittel: typerVedleggTekster[dok.type].tittel[locale],
                beskrivelse: typerVedleggTekster[dok.type].beskrivelse[locale],
            }))}
        />
    );
};

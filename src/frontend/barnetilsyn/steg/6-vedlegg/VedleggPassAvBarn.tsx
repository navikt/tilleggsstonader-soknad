import React from 'react';

import Vedlegg, { DokumentasjonFeltMedVedleggstekst } from '../../../components/Vedlegg/Vedlegg';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { DokumentasjonFelt, VedleggstypePassAvBarn } from '../../../typer/skjema';
import { hentBeskjedMedEttParameter } from '../../../utils/tekster';
import { typerVedleggTeksterPassAvBarn } from '../../tekster/vedlegg';

const VedleggPassAvBarn = () => {
    const { dokumentasjon, settDokumentasjon, dokumentasjonsbehov } = usePassAvBarnSøknad();
    const { person } = usePerson();
    const { locale } = useSpråk();

    const finnBarnSomVedleggGjelder = (dokumentasjonsfelt: DokumentasjonFelt) => {
        return dokumentasjonsfelt?.barnId
            ? person.barn.find((barn) => barn.ident === dokumentasjonsfelt?.barnId)
            : undefined;
    };

    const dokumentasjonMedTittelOgBeskrivelse: DokumentasjonFeltMedVedleggstekst[] =
        dokumentasjon.map((dokumentasjon) => {
            const barnetsFornavn = finnBarnSomVedleggGjelder(dokumentasjon)?.fornavn ?? 'barnet';
            const vedleggstekster =
                typerVedleggTeksterPassAvBarn[dokumentasjon.type as VedleggstypePassAvBarn];
            return {
                ...dokumentasjon,
                tittel: hentBeskjedMedEttParameter(barnetsFornavn, vedleggstekster.tittel[locale]),
                beskrivelse: hentBeskjedMedEttParameter(
                    barnetsFornavn,
                    vedleggstekster.beskrivelse[locale]
                ),
            };
        });

    return (
        <Vedlegg
            dokumentasjon={dokumentasjonMedTittelOgBeskrivelse}
            settDokumentasjon={settDokumentasjon}
            dokumentasjonsbehov={dokumentasjonsbehov}
        />
    );
};

export default VedleggPassAvBarn;

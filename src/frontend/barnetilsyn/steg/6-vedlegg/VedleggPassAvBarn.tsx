import React from 'react';

import Vedlegg, { DokumentasjonFeltMedVedleggstekst } from '../../../components/Vedlegg/Vedlegg';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster } from '../../../tekster/vedlegg';
import { DokumentasjonFelt } from '../../../typer/skjema';
import { hentBeskjedMedEttParameter } from '../../../utils/tekstUtils';

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
            const vedleggstekster = typerVedleggTekster[dokumentasjon.type];
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

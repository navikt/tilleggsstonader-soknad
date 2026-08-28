// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';

import {
    type DokumentasjonFeltMedVedleggstekst,
    Vedlegg
} from '../../../components/Vedlegg/Vedlegg';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { typerVedleggTekster } from '../../../tekster/vedlegg';
import type { DokumentasjonFelt } from '../../../typer/skjema';
import { hentBeskjedMedEttParameter } from '../../../utils/tekstUtils';
import { usePassAvBarnSøknad } from '../../context/PassAvBarnSøknadContext';

export const VedleggPassAvBarn = () => {
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
                )
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

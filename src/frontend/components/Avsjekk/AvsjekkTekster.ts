import { AvsjekkTekster } from './Avsjekk';

export const avsjekkTeksterFelles: Omit<AvsjekkTekster, 'banner'> = {
    hvorfor_spør_vi: {
        header: { nb: 'Hvorfor spør vi om dette?' },
        innhold: {
            nb: [
                'Vi trenger å vite om du mottar eller nylig har søkt om Aktivitetspenger for unge for å kunne sende deg til riktig søknad.',
                'Aktivitetspenger for unge er en forsøksordning for unge mellom 18 og 30 år som trenger hjelp fra Nav for å komme i arbeid. Ordningen innebærer tett individuell oppfølging og arbeidsrettede aktiviteter, og deltakerne får økonomisk støtte gjennom ytelsen Aktivitetspenger for unge.',
                'Aktivitetspenger for unge er ikke det samme som Arbeidsavklaringspenger (AAP) eller Ungdomsprogrammet.',
            ],
        },
    },
    veileder_tittel: {
        nb: 'Hei!',
    },
    veileder_innhold: {
        nb: [
            'Vi lager en ny søknad. Foreløpig kan bare de som mottar Aktivitetspenger for unge bruke den. Mottar du ikke Aktivitetspenger for unge, sender vi deg videre til søknaden du kan bruke.',
        ],
    },
};

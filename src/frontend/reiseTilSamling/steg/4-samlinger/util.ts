import { Samling } from '../../../typer/søknad';

export const oppdaterSamling = <K extends keyof Samling>(
    samlinger: Samling[],
    id: number,
    key: K,
    verdi: Samling[K]
): Samling[] =>
    samlinger.map((samling) => (samling._id === id ? { ...samling, [key]: verdi } : samling));

const utledMaxId = (samlinger: Samling[]): number => {
    const ids = samlinger.map((s) => s._id);
    return ids.length > 0 ? Math.max(...ids) : 0;
};

export const opprettSamlingForNesteId = (samlinger: Samling[]): Samling => ({
    _id: utledMaxId(samlinger) + 1,
    lagret: false,
});

// Kopierer adresse og reiseavstand fra forrige samling til samlinger som gjenbruker adressen.
export const synkroniserGjenbrukAdresser = (samlinger: Samling[]): Samling[] => {
    const synkroniserte: Samling[] = [];

    samlinger.forEach((samling, index) => {
        if (index > 0 && samling._brukSammeAdresseSomForrige?.verdi === 'JA') {
            const forrige = synkroniserte[index - 1];
            synkroniserte.push({
                ...samling,
                adresse: forrige.adresse,
                antallKilometerEnVei: forrige.antallKilometerEnVei,
            });
        } else {
            synkroniserte.push(samling);
        }
    });

    return synkroniserte;
};

import { Person } from '../typer/person';

export const initiellPerson: Person = {
    fornavn: '',
    visningsnavn: '',
    alder: 0,
    adresse: '',
    strukturertAdresse: {
        land: 'NOR',
        gateadresse: '',
        postnummer: '',
        poststed: '',
    },
    barn: [],
};

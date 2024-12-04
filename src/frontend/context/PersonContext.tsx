import constate from 'constate';

import { Person } from '../typer/person';

interface Props {
    person: Person;
    harBehandling: boolean;
}

const [PersonProvider, usePerson] = constate(({ person, harBehandling }: Props) => {
    PersonProvider.displayName = 'PERSON_PROVIDER';
    return { person, harBehandling };
});

export { PersonProvider, usePerson };

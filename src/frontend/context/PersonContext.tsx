import constate from 'constate';

import { Person } from '../typer/person';

interface Props {
    person: Person;
}

const [PersonProvider, usePerson] = constate(({ person }: Props) => {
    PersonProvider.displayName = 'PERSON_PROVIDER';
    return { person };
});

export { PersonProvider, usePerson };

import { Kjøreliste } from '../../types/Kjøreliste';

export const harUtgiftOver100kr = ({ reisedager }: Kjøreliste): boolean =>
    Object.values(reisedager).some(
        ({ parkeringsutgift }) => parkeringsutgift && parkeringsutgift > 100
    );

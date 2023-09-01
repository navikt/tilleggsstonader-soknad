import { Tiltak } from '../barnetilsyn/steg/3-aktivitet/typer';

export const useTiltak = (): { tiltak: Tiltak } => {
    return {
        tiltak: {
            type: 'utdanning',
            navn: 'Universitetet i Oslo - Medisin',
            periode: {
                fom: '01.08.2023',
                tom: '01.07.2024',
            },
        },
    };
};

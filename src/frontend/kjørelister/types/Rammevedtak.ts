export interface Rammevedtak {
    fom: string;
    tom: string;
    reisedagerPerUke: number;
    uker: RammevedtakUke[];
}

export interface RammevedtakUke {
    ukeNummer: number;
    fom: string;
    tom: string;
}

export const RammevedtakMock: Rammevedtak = {
    fom: '01-01-2025',
    tom: '06-01-2025',
    reisedagerPerUke: 5,
    uker: [
        {
            ukeNummer: 1,
            fom: '2025-01-01',
            tom: '2025-01-05',
        },
        {
            ukeNummer: 2,
            fom: '2025-01-06',
            tom: '2025-01-12',
        },
        {
            ukeNummer: 3,
            fom: '2025-01-13',
            tom: '2025-01-19',
        },
        {
            ukeNummer: 4,
            fom: '2025-01-20',
            tom: '2025-01-26',
        },
        {
            ukeNummer: 5,
            fom: '2025-01-27',
            tom: '2025-02-02',
        },
        {
            ukeNummer: 6,
            fom: '2025-02-03',
            tom: '2025-02-06',
        },
    ],
};

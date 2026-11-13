import React from 'react';

import { DrivstoffType } from '../typer/reisemåte';
import { EnumFelt } from '../typer/skjema';
import { SelectGruppePåkrevd } from '../typer/tekst';
import { LocaleSelect } from './Teksthåndtering/LocaleSelect';

export const drivstoffTypeTekster: SelectGruppePåkrevd<DrivstoffType> = {
    header: { nb: 'Bilens drivstofftype?' },
    alternativer: {
        ELBIL: { nb: 'Elbil' },
        HYDROGEN: { nb: 'Hydrogen' },
        BENSIN: { nb: 'Bensin' },
        HYBRID: { nb: 'Hybrid' },
        DIESEL: { nb: 'Diesel' },
    },
    beskrivelse: {
        nb: 'Bompenger og fergepriser beregnes ut fra bilens offisielle miljøklasse, derfor må du velge drivstofftype.',
    },
    feilmelding: { nb: 'Du må oppgi bilens drivstofftype.' },
};

interface DrivstoffTypeVelgerProps {
    value: DrivstoffType | '';
    onChange: (felt: EnumFelt<DrivstoffType>) => void;
    id?: string;
    error?: string;
    tekst?: SelectGruppePåkrevd<DrivstoffType>;
}

export const DrivstoffTypeVelger: React.FC<DrivstoffTypeVelgerProps> = ({
    value,
    onChange,
    id,
    error,
    tekst = drivstoffTypeTekster,
}) => <LocaleSelect tekst={tekst} value={value} onChange={onChange} id={id} error={error} />;

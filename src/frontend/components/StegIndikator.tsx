import React, { useEffect, useRef } from 'react';

import { BodyShort } from '@navikt/ds-react';

export function StegIndikator(props: {
    gjeldendeSteg: string | number;
    antallStegTotalt: string | number;
    autofocus?: boolean;
}) {
    const stegindikatorRef = useRef<HTMLParagraphElement>(null);

    const fokuserPåStegindikatoren = () => {
        if (stegindikatorRef.current) {
            stegindikatorRef.current.focus();
        }
    };

    useEffect(() => {
        if (props.autofocus) {
            fokuserPåStegindikatoren();
        }
    }, [props.autofocus]);

    const stegteller = `Steg ${props.gjeldendeSteg} av ${props.antallStegTotalt}`;

    return (
        <BodyShort role="status" tabIndex={-1} ref={stegindikatorRef}>
            {stegteller}
        </BodyShort>
    );
}

import { BodyShort } from '@navikt/ds-react';
// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React, { useEffect, useRef } from 'react';

export function StegIndikator(props: {
    gjeldendeSteg: string | number;
    antallStegTotalt: string | number;
    autofokoserSkjermleser?: boolean;
}) {
    const stegindikatorRef = useRef<HTMLParagraphElement>(null);

    const fokuserPåStegindikatoren = () => {
        if (stegindikatorRef.current) {
            stegindikatorRef.current.focus();
        }
    };

    useEffect(() => {
        if (props.autofokoserSkjermleser) {
            fokuserPåStegindikatoren();
        }
        // biome-ignore lint/correctness/useExhaustiveDependencies: må være der
    }, [props.autofokoserSkjermleser, fokuserPåStegindikatoren]);

    const tekst = `Steg ${props.gjeldendeSteg} av ${props.antallStegTotalt}`;

    return (
        <span>
            <BodyShort role="status" tabIndex={-1} ref={stegindikatorRef}>
                {tekst}
            </BodyShort>
        </span>
    );
}

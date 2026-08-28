// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React, { type ReactNode } from 'react';

import { Side } from '../Side';

export const OppsummeringSide = ({ children }: { children: ReactNode }) => {
    return <Side>{children}</Side>;
};

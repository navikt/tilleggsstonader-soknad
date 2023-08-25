import { GuidePanel } from '@navikt/ds-react';

import Pelle from './Pelle';

export const PellePanel: React.FC<{ poster?: boolean; children: React.ReactNode }> = ({
    poster = false,
    children,
}) => (
    <GuidePanel illustration={<Pelle />} poster={poster}>
        {children}
    </GuidePanel>
);

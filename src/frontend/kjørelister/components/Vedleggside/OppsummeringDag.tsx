import React from 'react';

import { List } from '@navikt/ds-react';

import { tilDagMåned, tilUkedag } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';

const OppsummeringDag: React.FC<{ dag: Date }> = ({ dag }) => {
    const { kjøreliste } = useKjøreliste();

    const reisedag = kjøreliste.reisedager[dag.toISOString()];

    return (
        <>
            {reisedag.harReist && (
                <List.Item>
                    {tilUkedag(dag)} {tilDagMåned(dag.toISOString())}.
                    {reisedag.parkeringsutgift && ` Parkering ${reisedag.parkeringsutgift}kr.`}
                </List.Item>
            )}
        </>
    );
};

export default OppsummeringDag;

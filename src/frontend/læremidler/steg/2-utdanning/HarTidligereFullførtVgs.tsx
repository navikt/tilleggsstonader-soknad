import { Alert, Heading, VStack } from '@navikt/ds-react';
import type React from 'react';

import { BlåVenstreRammeContainer } from '../../../components/BlåVenstreRammeContainer';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import type { EnumFelt } from '../../../typer/skjema';
import type { JaNei } from '../../../typer/søknad';
import type { Feilmelding } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

interface Props {
    harTidligereFullførtVgs: EnumFelt<JaNei> | undefined;
    oppdaterHarTidligereFullførtVgs: (verdi: EnumFelt<JaNei>) => void;
    feilmelding: Feilmelding | undefined;
}

export const HarTidligereFullførtVgs: React.FC<Props> = ({
    harTidligereFullførtVgs,
    oppdaterHarTidligereFullførtVgs,
    feilmelding
}) => {
    return (
        <VStack gap="space-16">
            <BlåVenstreRammeContainer>
                <LocaleRadioGroup
                    id={feilmelding?.id}
                    tekst={utdanningTekster.radio_har_fullført_vgs}
                    onChange={oppdaterHarTidligereFullførtVgs}
                    value={harTidligereFullførtVgs?.verdi || []}
                    error={feilmelding?.melding}
                />
            </BlåVenstreRammeContainer>

            {harTidligereFullførtVgs?.verdi === 'NEI' && (
                <Alert variant={'info'}>
                    <Heading spacing size="small" level="3">
                        <LocaleTekst tekst={utdanningTekster.har_fullført_vgs_info_boks_header} />
                    </Heading>
                    <LocaleTekst tekst={utdanningTekster.har_fullført_vgs_info_boks} />
                </Alert>
            )}
        </VStack>
    );
};

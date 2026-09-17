import React from 'react';

import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';

import { AdresseValideringsfeil } from './validering';
import { useSpråk } from '../../context/SpråkContext';
import { Adresse } from '../../typer/søknad';
import { InputFelt } from '../../typer/tekst';
import { Landvelger } from '../Landvelger/Landvelger';
import { LocaleTextField } from '../Teksthåndtering/LocaleTextField';

const PostnummerFelt = styled(LocaleTextField)`
    max-width: 6rem;
`;

interface Props {
    adresse?: Adresse;
    onChange: (felt: Partial<Adresse>, feltNavn: keyof Adresse) => void;
    tekster: Record<keyof Adresse, InputFelt>;
    feil?: AdresseValideringsfeil;
    medNorskeOmråder?: boolean;
    defaultNorge?: boolean;
}

export const AdresseVelger: React.FC<Props> = ({
    adresse,
    onChange,
    tekster,
    feil,
    medNorskeOmråder = true,
    defaultNorge = true,
}) => {
    const { locale } = useSpråk();

    return (
        <VStack gap="space-16">
            <Landvelger
                id={feil?.land?.id}
                label={tekster.land.label}
                description={tekster.land.description}
                value={adresse?.land?.verdi}
                onChange={(verdi) => onChange({ land: verdi }, 'land')}
                medNorskeOmråder={medNorskeOmråder}
                error={feil?.land?.melding}
                defaultNorge={defaultNorge}
            />
            <LocaleTextField
                id={feil?.gateadresse?.id}
                tekst={tekster.gateadresse}
                value={adresse?.gateadresse?.verdi ?? ''}
                error={feil?.gateadresse?.melding}
                onChange={(e) => {
                    const verdi = e.target.value;
                    onChange(
                        { gateadresse: { label: tekster.gateadresse.label[locale], verdi } },
                        'gateadresse'
                    );
                }}
            />
            <PostnummerFelt
                id={feil?.postnummer?.id}
                tekst={tekster.postnummer}
                value={adresse?.postnummer?.verdi ?? ''}
                error={feil?.postnummer?.melding}
                inputMode="numeric"
                onChange={(e) => {
                    const verdi = e.target.value;
                    onChange(
                        { postnummer: { label: tekster.postnummer.label[locale], verdi } },
                        'postnummer'
                    );
                }}
            />
            <LocaleTextField
                id={feil?.poststed?.id}
                tekst={tekster.poststed}
                value={adresse?.poststed?.verdi ?? ''}
                error={feil?.poststed?.melding}
                onChange={(e) => {
                    const verdi = e.target.value;
                    onChange(
                        { poststed: { label: tekster.poststed.label[locale], verdi } },
                        'poststed'
                    );
                }}
            />
        </VStack>
    );
};

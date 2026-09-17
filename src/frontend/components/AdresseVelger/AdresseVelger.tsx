import React from 'react';

import { VStack } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { Adresse } from '../../typer/søknad';
import { InputFelt } from '../../typer/tekst';
import { Valideringsfeil } from '../../typer/validering';
import { Landvelger } from '../Landvelger/Landvelger';
import { LocaleTextField } from '../Teksthåndtering/LocaleTextField';

interface Props {
    adresse?: Adresse;
    onChange: (felt: Partial<Adresse>, feltNavn: keyof Adresse) => void;
    tekster: Record<keyof Adresse, InputFelt>;
    feil: Valideringsfeil | undefined;
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
            <LocaleTextField
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
                htmlSize={10}
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

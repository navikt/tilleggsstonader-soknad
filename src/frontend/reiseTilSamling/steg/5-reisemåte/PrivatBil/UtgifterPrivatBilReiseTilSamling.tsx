import { TextField } from '@navikt/ds-react';

import {
    errorKeyPrivatBilUtgifterBompenger,
    errorKeyPrivatBilUtgifterDrivstoffType,
    errorKeyPrivatBilUtgifterFerge,
    errorKeyPrivatBilUtgifterPiggdekkavgift,
} from './validering';
import { Skillelinje } from '../../../../components/Skillelinje';
import { LocaleHeading } from '../../../../components/Teksthåndtering/LocaleHeading';
import { LocaleRadioGroup } from '../../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleTekst } from '../../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../../context/SpråkContext';
import { useValideringsfeil } from '../../../../context/ValideringsfeilContext';
import { EnumFelt } from '../../../../typer/skjema';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import { DrivstoffType, UtgifterPrivatBil } from '../../../typer/reisemåte';

export const UtgifterPrivatBilReiseTilSamling: React.FC<{
    utgifterPrivatBil: UtgifterPrivatBil | undefined;
    oppdaterUtgifterPrivatBil: (felt: Partial<UtgifterPrivatBil>) => void;
}> = ({ utgifterPrivatBil, oppdaterUtgifterPrivatBil }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const nullstillFeil = (errorKey: string) => {
        settValideringsfeil((prev) => ({ ...prev, [errorKey]: undefined }));
    };

    const oppdaterEgenBilUtgifterDrivstoffType = (verdi: EnumFelt<DrivstoffType>) => {
        oppdaterUtgifterPrivatBil({ drivstoffType: verdi });
        nullstillFeil(errorKeyPrivatBilUtgifterDrivstoffType);
    };

    const oppdaterEgenBilUtgifterBompenger = (verdi: string) => {
        oppdaterUtgifterPrivatBil({
            bompenger: { verdi, label: reisemåteTekster.egen_bil_utgifter_bompenger.label[locale] },
        });
        nullstillFeil(errorKeyPrivatBilUtgifterBompenger);
    };

    const oppdaterEgenBilUtgifterFerge = (verdi: string) => {
        oppdaterUtgifterPrivatBil({
            ferge: { verdi, label: reisemåteTekster.egen_bil_utgifter_ferge.label[locale] },
        });
        nullstillFeil(errorKeyPrivatBilUtgifterFerge);
    };

    const oppdaterEgenBilUtgifterPiggdekkavgift = (verdi: string) => {
        oppdaterUtgifterPrivatBil({
            piggdekkavgift: {
                verdi,
                label: reisemåteTekster.egen_bil_utgifter_piggdekkavgift.label[locale],
            },
        });
        nullstillFeil(errorKeyPrivatBilUtgifterPiggdekkavgift);
    };

    const skalSpørreOmDrivstoffType =
        utgifterPrivatBil?.bompenger !== undefined || utgifterPrivatBil?.ferge !== undefined;

    return (
        <>
            <Skillelinje />
            <div>
                <LocaleHeading
                    tekst={reisemåteTekster.egen_bil_utgifter_tittel}
                    level="3"
                    size="small"
                />
                <LocaleTekst tekst={reisemåteTekster.egen_bil_utgifter_beskrivelse} />
            </div>
            <TextField
                id={valideringsfeil[errorKeyPrivatBilUtgifterBompenger]?.id}
                label={reisemåteTekster.egen_bil_utgifter_bompenger.label[locale]}
                inputMode="numeric"
                value={utgifterPrivatBil?.bompenger?.verdi ?? ''}
                onChange={(e) => oppdaterEgenBilUtgifterBompenger(e.target.value)}
                error={valideringsfeil[errorKeyPrivatBilUtgifterBompenger]?.melding}
            />
            <TextField
                id={valideringsfeil[errorKeyPrivatBilUtgifterFerge]?.id}
                label={reisemåteTekster.egen_bil_utgifter_ferge.label[locale]}
                inputMode="numeric"
                value={utgifterPrivatBil?.ferge?.verdi ?? ''}
                onChange={(e) => oppdaterEgenBilUtgifterFerge(e.target.value)}
                error={valideringsfeil[errorKeyPrivatBilUtgifterFerge]?.melding}
            />
            <TextField
                id={valideringsfeil[errorKeyPrivatBilUtgifterPiggdekkavgift]?.id}
                label={reisemåteTekster.egen_bil_utgifter_piggdekkavgift.label[locale]}
                inputMode="numeric"
                value={utgifterPrivatBil?.piggdekkavgift?.verdi ?? ''}
                onChange={(e) => oppdaterEgenBilUtgifterPiggdekkavgift(e.target.value)}
                error={valideringsfeil[errorKeyPrivatBilUtgifterPiggdekkavgift]?.melding}
            />

            {/* TODO: Gjør om til select */}
            {skalSpørreOmDrivstoffType && (
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeyPrivatBilUtgifterDrivstoffType]?.id}
                    tekst={reisemåteTekster.egen_bil_utgifter_drivstoff_type}
                    value={utgifterPrivatBil?.drivstoffType?.verdi ?? ''}
                    onChange={oppdaterEgenBilUtgifterDrivstoffType}
                    error={valideringsfeil[errorKeyPrivatBilUtgifterDrivstoffType]?.melding}
                />
            )}
        </>
    );
};

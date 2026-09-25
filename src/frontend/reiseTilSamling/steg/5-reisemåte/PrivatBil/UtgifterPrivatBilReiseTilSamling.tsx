import { TextField } from '@navikt/ds-react';

import {
    errorKeyPrivatBilUtgifterBompenger,
    errorKeyPrivatBilUtgifterDrivstoffType,
    errorKeyPrivatBilUtgifterFerge,
    errorKeyPrivatBilUtgifterParkering,
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

    const oppdaterBompenger = (verdi: string) => {
        oppdaterUtgifterPrivatBil({
            bompenger: {
                verdi,
                label: reisemåteTekster.privat_bil_utgifter_bompenger.label[locale],
            },
        });
        nullstillFeil(errorKeyPrivatBilUtgifterBompenger);
    };

    const oppdaterFerge = (verdi: string) => {
        oppdaterUtgifterPrivatBil({
            ferge: { verdi, label: reisemåteTekster.privat_bil_utgifter_ferge.label[locale] },
        });

        nullstillFeil(errorKeyPrivatBilUtgifterFerge);
    };

    const oppdaterPiggdekkavgift = (verdi: string) => {
        oppdaterUtgifterPrivatBil({
            piggdekkavgift: {
                verdi,
                label: reisemåteTekster.privat_bil_utgifter_piggdekkavgift.label[locale],
            },
        });
        nullstillFeil(errorKeyPrivatBilUtgifterPiggdekkavgift);
    };

    const oppdaterParkering = (verdi: string) => {
        oppdaterUtgifterPrivatBil({
            parkering: {
                verdi,
                label: reisemåteTekster.privat_bil_utgifter_parkering.label[locale],
            },
        });
        nullstillFeil(errorKeyPrivatBilUtgifterParkering);
    };

    const skalSpørreOmDrivstoffType =
        utgifterPrivatBil?.bompenger !== undefined || utgifterPrivatBil?.ferge !== undefined;

    return (
        <>
            <Skillelinje />
            <div>
                <LocaleHeading
                    tekst={reisemåteTekster.privat_bil_utgifter_tittel}
                    level="3"
                    size="small"
                />
                <LocaleTekst tekst={reisemåteTekster.privat_bil_utgifter_beskrivelse} />
            </div>
            <TextField
                id={valideringsfeil[errorKeyPrivatBilUtgifterParkering]?.id}
                label={reisemåteTekster.privat_bil_utgifter_parkering.label[locale]}
                inputMode="numeric"
                value={utgifterPrivatBil?.parkering?.verdi ?? ''}
                onChange={(e) => oppdaterParkering(e.target.value)}
                error={valideringsfeil[errorKeyPrivatBilUtgifterPiggdekkavgift]?.melding}
                htmlSize={10}
            />
            <TextField
                id={valideringsfeil[errorKeyPrivatBilUtgifterBompenger]?.id}
                label={reisemåteTekster.privat_bil_utgifter_bompenger.label[locale]}
                inputMode="numeric"
                value={utgifterPrivatBil?.bompenger?.verdi ?? ''}
                onChange={(e) => oppdaterBompenger(e.target.value)}
                error={valideringsfeil[errorKeyPrivatBilUtgifterBompenger]?.melding}
                htmlSize={10}
            />
            <TextField
                id={valideringsfeil[errorKeyPrivatBilUtgifterFerge]?.id}
                label={reisemåteTekster.privat_bil_utgifter_ferge.label[locale]}
                inputMode="numeric"
                value={utgifterPrivatBil?.ferge?.verdi ?? ''}
                onChange={(e) => oppdaterFerge(e.target.value)}
                error={valideringsfeil[errorKeyPrivatBilUtgifterFerge]?.melding}
                htmlSize={10}
            />
            <TextField
                id={valideringsfeil[errorKeyPrivatBilUtgifterPiggdekkavgift]?.id}
                label={reisemåteTekster.privat_bil_utgifter_piggdekkavgift.label[locale]}
                inputMode="numeric"
                value={utgifterPrivatBil?.piggdekkavgift?.verdi ?? ''}
                onChange={(e) => oppdaterPiggdekkavgift(e.target.value)}
                error={valideringsfeil[errorKeyPrivatBilUtgifterPiggdekkavgift]?.melding}
                htmlSize={10}
            />

            {/* TODO: Gjør om til select */}
            {skalSpørreOmDrivstoffType && (
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeyPrivatBilUtgifterDrivstoffType]?.id}
                    tekst={reisemåteTekster.privat_bil_utgifter_drivstoff_type}
                    value={utgifterPrivatBil?.drivstoffType?.verdi ?? ''}
                    onChange={oppdaterEgenBilUtgifterDrivstoffType}
                    error={valideringsfeil[errorKeyPrivatBilUtgifterDrivstoffType]?.melding}
                />
            )}
        </>
    );
};

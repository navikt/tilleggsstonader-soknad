import { HovedytelseInnhold } from '../../../components/Hovedytelse/Hovedytelse';
import { useHovedytelse } from '../../../components/Hovedytelse/useHovedytelse';
import { Side } from '../../../components/Side';
import { LocaleRadioGroup } from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { inneholderFeil, Valideringsfeil } from '../../../typer/validering';
import { useFlyttingSøknad } from '../../context/FlyttingSøknadContext';
import { arbeidssøkerTekster } from '../../tekster/arbeidssøker';

const feilIdRegistrertSomArbeidssøker = 'registrertSomArbeidssoker';

export const DinSituasjonFlytting = () => {
    const { hovedytelse, settHovedytelse, arbeidssøker, settArbeidssøker } = useFlyttingSøknad();
    const hovedytelseTilstand = useHovedytelse(hovedytelse);
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const validerArbeidssøker = (): Valideringsfeil =>
        arbeidssøker?.registrertSomArbeidssøker
            ? {}
            : {
                  [feilIdRegistrertSomArbeidssøker]: {
                      id: feilIdRegistrertSomArbeidssøker,
                      melding:
                          arbeidssøkerTekster.radio_registrertSomArbeidssøker.feilmelding[locale],
                  },
              };

    const validerSteg = () => {
        const feil = { ...hovedytelseTilstand.valider(), ...validerArbeidssøker() };
        settValideringsfeil(feil);
        return !inneholderFeil(feil);
    };

    return (
        <Side
            validerSteg={validerSteg}
            oppdaterSøknad={() => {
                if (hovedytelseTilstand.utfyltHovedytelse) {
                    settHovedytelse(hovedytelseTilstand.utfyltHovedytelse);
                }
            }}
        >
            <HovedytelseInnhold tilstand={hovedytelseTilstand} />
            <LocaleRadioGroup
                id={feilIdRegistrertSomArbeidssøker}
                tekst={arbeidssøkerTekster.radio_registrertSomArbeidssøker}
                value={arbeidssøker?.registrertSomArbeidssøker.verdi ?? ''}
                error={valideringsfeil[feilIdRegistrertSomArbeidssøker]?.melding}
                onChange={(registrertSomArbeidssøker) => {
                    settArbeidssøker({ registrertSomArbeidssøker });
                    settValideringsfeil((tidligere) => ({
                        ...tidligere,
                        [feilIdRegistrertSomArbeidssøker]: undefined,
                    }));
                }}
            />
        </Side>
    );
};

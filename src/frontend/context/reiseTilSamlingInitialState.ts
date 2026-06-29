import { Environment } from '../api/Environment';
import { AnnenAktivitetType } from '../typer/aktivitet';
import { DokumentasjonFelt } from '../typer/skjema';
import { Aktivitet, Hovedytelse, Reiseavstand, Reisemåte, Samling } from '../typer/søknad';

const erLokal = () => Environment().miljø === 'local';

export const initialHarBekreftet = (): boolean => erLokal();

export const initialHovedytelse = (): Hovedytelse | undefined =>
    erLokal()
        ? {
              ytelse: {
                  label: 'Mottar du eller har du nylig søkt om noe av dette?',
                  verdier: [{ verdi: 'AAP', label: 'Arbeidsavklaringspenger (AAP)' }],
                  alternativer: ['Arbeidsavklaringspenger (AAP)'],
              },
              arbeidOgOpphold: {
                  oppholdUtenforNorgeSiste12mnd: [],
                  oppholdUtenforNorgeNeste12mnd: [],
              },
          }
        : undefined;

export const initialAktivitet = (): Aktivitet | undefined =>
    erLokal()
        ? {
              aktiviteter: undefined,
              annenAktivitet: {
                  label: 'Aktivitet',
                  verdi: AnnenAktivitetType.TILTAK,
                  svarTekst: 'Tiltak',
                  alternativer: ['Tiltak'],
              },
              lønnetAktivitet: {
                  label: 'Mottar du lønn gjennom et tiltak?',
                  verdi: 'NEI',
                  svarTekst: 'Nei',
                  alternativer: ['Ja', 'Nei'],
              },
          }
        : undefined;

export const initialSamlinger = (): Samling[] =>
    erLokal()
        ? [
              {
                  _id: 1,
                  lagret: true,
                  fom: { verdi: '2025-06-01', label: 'Startdato' },
                  tom: { verdi: '2025-06-05', label: 'Sluttdato' },
              },
          ]
        : [{ _id: 1, lagret: false }];

export const initialReiseavstand = (): Reiseavstand =>
    erLokal()
        ? {
              antallKilometerEnVei: { verdi: '45', label: 'Hvor lang reisevei har du?' },
              aktivitetsadresse: {
                  gateadresse: { verdi: 'Testveien 1', label: 'Gateadresse' },
                  postnummer: { verdi: '0123', label: 'Postnummer' },
                  poststed: { verdi: 'Oslo', label: 'Poststed' },
              },
          }
        : { aktivitetsadresse: {} };

export const initialReisemåte = (): Reisemåte | undefined =>
    erLokal()
        ? {
              kanReiseKollektivt: {
                  label: 'Kan du reise kollektivt?',
                  verdi: 'JA',
                  svarTekst: 'Ja',
                  alternativer: ['Ja', 'Nei'],
              },
              totalutgifterKollektivt: {
                  verdi: '500',
                  label: 'Hva er totalutgiftene til kollektivtransport til og fra samlingene?',
              },
          }
        : undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];

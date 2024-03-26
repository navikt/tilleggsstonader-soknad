import { Hovedytelse } from '../typer/søknad';

// TODO slett
export const defaultHovedYtelse: Hovedytelse | undefined =
    document.location.hostname !== 'localhost2'
        ? undefined
        : {
              ytelse: {
                  label: '',
                  alternativer: [],
                  verdier: [{ label: '', verdi: 'KVALIFISERINGSSTØNAD' }],
              },
              arbeidOgOpphold: {
                  jobberIAnnetLandEnnNorge: {
                      verdi: 'NEI',
                      label: '',
                      alternativer: [],
                      svarTekst: 'Nei',
                  },
                  mottarDuPengestøtteFraAnnetLand: {
                      label: '',
                      verdier: [
                          {
                              verdi: 'MOTTAR_IKKE',
                              label: '',
                          },
                      ],
                      alternativer: [],
                  },
                  harDuOppholdUtenforNorgeSiste12mnd: {
                      label: '',
                      svarTekst: '',
                      alternativer: [''],
                      verdi: 'JA',
                  },
                  oppholdUtenforNorgeSiste12mnd: [
                      {
                          _id: 1,
                          lagret: true,
                          land: {
                              label: '',
                              svarTekst: 'Sverige',
                              verdi: 'SVERIGE',
                          },
                          årsak: {
                              label: '',
                              alternativer: [],
                              verdier: [
                                  {
                                      label: 'Ferie',
                                      verdi: 'FERIE',
                                  },
                                  {
                                      label: 'Ferie',
                                      verdi: 'FERIE',
                                  },
                              ],
                          },
                          fom: {
                              verdi: '2023-01-01',
                              label: 'fom',
                          },
                          tom: {
                              verdi: '2023-01-01',
                              label: 'fom',
                          },
                      },
                      {
                          _id: 2,
                          lagret: false,
                      },
                  ],
                  oppholdUtenforNorgeNeste12mnd: [],
              },
          };

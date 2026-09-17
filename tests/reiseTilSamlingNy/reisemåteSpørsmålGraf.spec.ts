import { expect, test } from '@playwright/test';

import { finnInaktiveNoder } from '../../src/frontend/felles/spørsmålsgraf/traversering';
import {
    erReisemåteSpørsmålNode,
    reisemåteSpørsmålGraf,
    rensInaktiveReisemåteSvar,
} from '../../src/frontend/reiseTilSamlingNy/steg/5-reisemåte/reisemåteSpørsmålGraf';
import { Reisemåte } from '../../src/frontend/typer/søknad';

const felt = <T extends string>(verdi: T) => ({ verdi, label: verdi });

test('nullstiller offentlig-transport-utgifter når svarsti byttes', () => {
    const forrige: Reisemåte = {
        kanReiseMedOffentligTransport: felt('JA'),
        totalUtgifterOffentligTransport: felt('1200'),
    };

    const neste = rensInaktiveReisemåteSvar({
        ...forrige,
        kanReiseMedOffentligTransport: felt('NEI'),
    });

    expect(neste?.totalUtgifterOffentligTransport).toBeUndefined();
});

test('nullstiller barnehagefelter når begrunnelse fjernes', () => {
    const forrige: Reisemåte = {
        kanReiseMedOffentligTransport: felt('NEI'),
        kanIkkeReiseMedOffentligTransportBegrunnelser: {
            verdier: [felt('LEVERING_HENTING_I_BARNEHAGE')],
            label: 'begrunnelse',
        },
        barnehageGateadresse: felt('Storgata 1'),
        barnehagePostnummer: felt('1234'),
    };

    const neste = rensInaktiveReisemåteSvar({
        ...forrige,
        kanIkkeReiseMedOffentligTransportBegrunnelser: {
            verdier: [felt('DÅRLIG_TRANSPORTTILBUD')],
            label: 'begrunnelse',
        },
    });

    expect(neste?.barnehageGateadresse).toBeUndefined();
    expect(neste?.barnehagePostnummer).toBeUndefined();
    const inaktiveSpørsmål = finnInaktiveNoder(reisemåteSpørsmålGraf, forrige, neste, {}).filter(
        erReisemåteSpørsmålNode
    );
    expect(inaktiveSpørsmål).toEqual(
        expect.arrayContaining(['BARNEHAGE_ADRESSE', 'BARNEHAGE_POSTNUMMER'])
    );
});

test('nullstiller bilutgifter når aktiv sti endres', () => {
    const forrige: Reisemåte = {
        kanReiseMedOffentligTransport: felt('NEI'),
        kanBenytteEgenBil: felt('JA'),
        reiseMedBilUtgifter: {
            drivstoffType: felt('BENSIN'),
            bompenger: felt('100'),
        },
    };

    const neste = rensInaktiveReisemåteSvar({
        ...forrige,
        kanBenytteEgenBil: felt('NEI'),
    });

    expect(neste?.reiseMedBilUtgifter).toBeUndefined();
});

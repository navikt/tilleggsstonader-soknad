export const erProd = (): boolean =>
    window.location.hostname !== 'tilleggsstonader.ekstern.nav.no' &&
    window.location.hostname !== 'localhost';

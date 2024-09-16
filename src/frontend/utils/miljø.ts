export const erProd = (): boolean =>
    window.location.hostname !== 'tilleggsstonader.ekstern.dev.nav.no' &&
    window.location.hostname !== 'localhost';

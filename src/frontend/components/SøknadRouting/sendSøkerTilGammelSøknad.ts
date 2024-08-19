import Environment from '../../api/Environment';

export const sendSøkerTilGammelSøknad = () => {
    window.location.href = Environment().urlGammelSøknad;
};

export const sendSøkerTilPapirsøknad = () => {
    window.location.href = Environment().urlPapirsøknad;
};

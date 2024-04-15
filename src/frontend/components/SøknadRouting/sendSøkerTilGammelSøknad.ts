import Environment from '../../api/Environment';

export const sendSøkerTilGammelSøknad = () => {
    window.location.href = Environment().urlGammelSøknad;
};

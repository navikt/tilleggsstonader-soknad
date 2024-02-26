export const erSnartNyttSkoleår = () => {
    const nåværendeMåned = new Date().getMonth() + 1;

    return nåværendeMåned >= 6 && nåværendeMåned <= 8;
};

let globalFeilHandler: () => void = () => {};

export const settGlobalFeilHandler = (handler: () => void) => {
    globalFeilHandler = handler;
};

export const triggGlobalFeil = () => globalFeilHandler();

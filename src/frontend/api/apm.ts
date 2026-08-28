import { init } from '@nais/apm';

export const initApm = () => {
    init({
        namespace: 'tilleggsstonader',
        // app / version / environment all resolve from Nais — omit them.
        ignoreErrors: [/Failed to fetch/],
        // Mulig å filterer hva vi sender som events her
        beforeSend: (item) => item
    });
};

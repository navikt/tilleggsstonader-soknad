import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    // biome-ignore lint/correctness/useExhaustiveDependencies: pathname er triggeren for scroll
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

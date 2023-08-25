import { fellesTekster } from './tekster/felles';
import { Banner } from '../components/Banner';

export const Forside = () => {
    return (
        <div>
            <Banner tittel={fellesTekster.banner} />
        </div>
    );
};

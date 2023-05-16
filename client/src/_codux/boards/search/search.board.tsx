import { createBoard } from '@wixc3/react-board';
import { Search } from '../../../components/search/search';

export default createBoard({
    name: 'Search',
    Board: () => <Search />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

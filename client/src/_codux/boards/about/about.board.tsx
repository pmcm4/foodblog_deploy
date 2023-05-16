import { createBoard } from '@wixc3/react-board';
import { About } from '../../../components/about/about';

export default createBoard({
    name: 'About',
    Board: () => <About />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

import { createBoard } from '@wixc3/react-board';
import { MiniPost } from '../../../components/mini-post/mini-post';

export default createBoard({
    name: 'MiniPost',
    Board: () => <MiniPost />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

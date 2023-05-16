import { createBoard } from '@wixc3/react-board';
import { HomePosts } from '../../../components/home-posts/home-posts';

export default createBoard({
    name: 'HomePosts',
    Board: () => <HomePosts />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
        canvasWidth: 498,
    },
});

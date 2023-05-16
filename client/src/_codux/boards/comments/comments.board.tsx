import { createBoard } from '@wixc3/react-board';
import { Comments } from '../../../components/comments/comments';

export default createBoard({
    name: 'Comments',
    Board: () => <Comments />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
        canvasWidth: 658,
    },
});

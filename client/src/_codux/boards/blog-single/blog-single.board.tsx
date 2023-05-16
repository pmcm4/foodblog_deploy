import { createBoard } from '@wixc3/react-board';
import { BlogSingle } from '../../../components/blog-single/blog-single';

export default createBoard({
    name: 'BlogSingle',
    Board: () => <BlogSingle />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 5000,
    },
});

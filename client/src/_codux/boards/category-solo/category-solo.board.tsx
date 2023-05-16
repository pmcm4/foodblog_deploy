import { createBoard } from '@wixc3/react-board';
import { CategorySolo } from '../../../components/category-solo/category-solo';

export default createBoard({
    name: 'CategorySolo',
    Board: () => <CategorySolo />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

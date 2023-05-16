import { createBoard } from '@wixc3/react-board';
import { Create } from '../../../components/create/create';

export default createBoard({
    name: 'Create',
    Board: () => <Create />,
    environmentProps: {
        windowWidth: 2208,
        windowHeight: 1080,
        canvasHeight: 700,
        canvasWidth: 1076,
    },
});

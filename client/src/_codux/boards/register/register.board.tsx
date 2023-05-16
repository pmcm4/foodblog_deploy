import { createBoard } from '@wixc3/react-board';
import { Register } from '../../../components/register/register';

export default createBoard({
    name: 'Register',
    Board: () => <Register />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

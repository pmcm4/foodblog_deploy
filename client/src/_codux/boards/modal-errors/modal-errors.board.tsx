import { createBoard } from '@wixc3/react-board';
import { ModalErrors } from '../../../components/modal-errors/modal-errors';

const err = ""; // Replace with your actual error message

export default createBoard({
    name: 'ModalErrors',
    Board: () => <ModalErrors errorMessage={err} />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

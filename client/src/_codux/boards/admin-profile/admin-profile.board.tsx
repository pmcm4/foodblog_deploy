import { createBoard } from '@wixc3/react-board';
import { AdminProfile } from '../../../components/admin-profile/admin-profile';

export default createBoard({
    name: 'AdminProfile',
    Board: () => <AdminProfile />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

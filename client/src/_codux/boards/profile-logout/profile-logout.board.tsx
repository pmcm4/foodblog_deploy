import { createBoard } from '@wixc3/react-board';
import { ProfileLogout } from '../../../components/profile-logout/profile-logout';

export default createBoard({
    name: 'ProfileLogout',
    Board: () => <ProfileLogout />
});

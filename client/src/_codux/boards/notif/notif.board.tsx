import { createBoard } from '@wixc3/react-board';
import { Notif } from '../../../components/notif/notif';

export default createBoard({
    name: 'Notif',
    Board: () => <Notif />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});

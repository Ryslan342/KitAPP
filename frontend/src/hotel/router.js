import main from './Hotel.vue'

import list from './Rooms.vue'
import room from './Room.vue'

export default {
    path: '/hotel/:id',
        name: 'hotel',
    component: main,
    children: [
        {
            path: '',
            component: list
        },
        {
            path: 'room/:roomId',
            component: room,
            props: true
        }
    ],
    props: true
};
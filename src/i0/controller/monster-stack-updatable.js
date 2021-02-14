import i0 from '../../i0.js'

import monster from '../ui/play/monster.js'

i0.obj('monster-stack-updatable', '<div i0="container" class="flex wrap"></div>', ui => {
    let stackIds = []
    i0.onbroadcast('map-update', map => {
        map.monsters.forEach(monster => {
            if(!stackIds.find(id => id === monster.id))
                ui.container.appendChild(
                    i0.load('play-monster', monster)
        )})
        stackIds = map.monsters.map(a=>a.id)
    })
})

export default {}
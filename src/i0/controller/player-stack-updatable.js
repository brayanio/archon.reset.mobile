import i0 from '../../i0.js'

import player from '../ui/play/player.js'

i0.obj('player-stack-updatable', '<div i0="container" class="flex wrap"></div>', ui => {
    let stackIds = []
    i0.onbroadcast('map-update', map => {
        if(!stackIds.find(id => id === map.player.id))
            ui.container.appendChild(i0.load('play-player', map.player))
        map.allies.forEach(player => {
            if(!stackIds.find(id => id === player.id))
                ui.container.appendChild(
                    i0.load('play-player', player)
        )})
        stackIds = [map.player.id].concat(map.allies.map(a=>a.id))
    })
})

export default {}
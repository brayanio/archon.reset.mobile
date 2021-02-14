import i0 from '../../../i0.js'

import race from '../race.js'
import stack from '../stack.js'

i0.obj('play-player', i0.nugget('stack', {width: '160px', height: '290px', classList: 'center column play-player', children: [
    i0.nugget('race', {width: '120px', height: '120px'}),
    i0.nugget('input', {width: '120px', height: '30px', readonly: true, id: 'name'}),
    i0.nugget('input', {width: '120px', height: '30px', readonly: true, id: 'hp'}),
    i0.nugget('input', {width: '120px', height: '30px', readonly: true, id: 'energy'})
]}, 'stack'),
(ui, props) => {
    let isplayer = false
    
    const el = query => ui.stack.querySelector(query)
    el('.race-img').src = `./asset/${props.race}.PNG`
    el('#name').value = props.name
    el('#hp').value = `HP: ${props.stats.vitality || 0}`
    el('#energy').value = `EP: ${props.stats.energy || 0}`

    if(props.stats.vitality <= 0) ui.stack.classList.add('ani-death')

    let mapBroadcast = i0.onbroadcast('map-update', map => {
        let player
        if(map.player.id === props.id) {
            player = map.player
            isplayer = true
        }
        else player = map.allies.find(a => a.id === props.id)
        if(player){
            el('.race-img').src = `./asset/${player.race}.PNG`
            el('#name').value = player.name
            el('#hp').value = `HP: ${player.stats.vitality || 0}`
            el('#energy').value = `EP: ${player.stats.energy || 0}`
            if(player.stats.vitality <= 0) ui.stack.classList.add('ani-death')
            else ui.stack.classList.remove('ani-death')
        } else {
            ui.stack.parentNode.removeChild(ui.stack)
            mapBroadcast.close()
            mapChangeBroadcast.close()
        }
    })

    let mapChangeBroadcast = i0.onbroadcast('map-change', () => {
        if(!isplayer){
            ui.stack.parentNode.removeChild(ui.stack)
            mapBroadcast.close()
            mapChangeBroadcast.close()
        }
    })

})

export default {}
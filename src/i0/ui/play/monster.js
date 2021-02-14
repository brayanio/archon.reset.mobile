import i0 from '../../../i0.js'

import race from '../race.js'
import stack from '../stack.js'

i0.obj('play-monster', i0.nugget('stack', {width: '160px', height: '290px', classList: 'center column play-monster', children: [ 
    '<img id="monster" width="120px" height="120px" />',
    i0.nugget('input', {width: '120px', height: '30px', readonly: true, id: 'name'}),
    i0.nugget('input', {width: '120px', height: '30px', readonly: true, id: 'hp'}),
    i0.nugget('input', {width: '120px', height: '30px', readonly: true, id: 'energy'})
]}, 'stack'),
(ui, props) => {
    
    if(props.amount === 0) ui.stack.classList.add('hidden')
    else ui.stack.classList.remove('hidden')
    const el = query => ui.stack.querySelector(query)
    el('#monster').src = `./asset/${props.asset}.PNG`
    el('#name').value = props.name + ' x' + props.amount
    el('#hp').value = `HP: ${props.stats.vitality}`
    el('#energy').value = `EP: ${props.stats.energy}`

    let mapBroadcast = i0.onbroadcast('map-update', map => {
        let monster = map.monsters.find(a => a.id === props.id)
        if(monster){
            el('#monster').src = `./asset/${monster.asset}.PNG`
            el('#name').value = monster.name + ' x' + monster.amount
            el('#hp').value = `HP: ${monster.stats.vitality}`
            el('#energy').value = `EP: ${monster.stats.energy}`

            if(monster.amount <= 0) ui.stack.classList.add('ani-death')
            else ui.stack.classList.remove('ani-death')

        } else {
            ui.stack.parentNode.removeChild(ui.stack)
            mapBroadcast.close()
            mapChangeBroadcast.close()
        }
    })

    let mapChangeBroadcast = i0.onbroadcast('map-change', () => {
        ui.stack.parentNode.removeChild(ui.stack)
        mapBroadcast.close()
        mapChangeBroadcast.close()
    })

})

export default {}
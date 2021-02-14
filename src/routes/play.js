import i0 from '../i0/_module.js'

import account from '../services/account.js'

i0.obj('play', i0.nugget('window', {width: '640px', height: '1136px', children: [
    `<div class="flex align">
        <h1 class="title"><span class="red" id="map1">M</span><span id="map2">ap Name</span></h1>
        <div id="actions"></div>
    </div>`,
    '<br id="players">',
    '<div id="monsters" clas="flex wrap"></div>'
]}, 'window'),
async ui => {
    if(account.player() && account.map()){
        ui.window.querySelector('#map1').innerText = account.map().name.substr(0, 1)
        ui.window.querySelector('#map2').innerText = account.map().name.substr(1)

        i0.load('player-stack-updatable', {}, ui.window.querySelector('#players'))
        i0.load('monster-stack-updatable', {}, ui.window.querySelector('#monsters'))

        const loadMaps = () => {
            ui.window.querySelector('#actions').innerHTML = ''
            if(account.map().maps)
                account.map().maps.forEach(map => 
                    ui.window.querySelector('#actions').appendChild(
                        i0.load('button', {text: map, width: '120px', height: '40px', onclick: async () => {
                            let res = await account.changeMap(map)
                            ui.window.querySelector('#map1').innerText = account.map().name.substr(0, 1)
                            ui.window.querySelector('#map2').innerText = account.map().name.substr(1)
                            loadMaps()
                            i0.broadcast('map-change')
                        }})
                    )
                )
        }
        loadMaps()


        i0.broadcast('map-update', account.map())
    }
})

export default {}
import i0 from '../i0.js'

let sessiontoken = {
    email: localStorage.email || null, 
    sessionId: localStorage.sessionId || null
}
let archon = []
let selectedArchon
let map
let checkMap = false

const login = (res) => {
    sessiontoken.email = res.email
    sessiontoken.sessionId = res.sessionId
    localStorage.email = res.email
    localStorage.sessionId = res.sessionId
    archon = res.archon
}

const clearSession = () => {
    delete localStorage.email
    delete localStorage.sessionId
}

const loadMap = async () => {
    const res = await i0.fetch('play', {load:true, archonId: selectedArchon.id, ...sessiontoken})
    if(!res || res.error) return console.error(res)
    map = res
    checkMap = true
    i0.broadcast('map-update', map)
    console.log('loadMap init', map)
    setInterval(async () => {
        if(checkMap){
            try{
                const res = await i0.fetch('play', {archonId: selectedArchon.id, updateKey: map.updateKey, ...sessiontoken})
                if(!res || res.error) {
                    checkMap = false
                    return console.error(res)
                }
                if(!res.msg) {
                    map = res
                    console.log('map update', map)
                    i0.broadcast('map-update', map)
                }
            } catch(e){checkMap = false}
        }
    }, 1000)
}

const changeMap = async mapName => {
    let res = await i0.fetch('play', {mapName, archonId: selectedArchon.id, ...sessiontoken})
    if(!res || res.error) return console.error(res)
    map = res
    console.log('Changed Map', map)
}

// auto login
if(sessiontoken.email && sessiontoken.sessionId)
(async () => {
    i0.target('https://archonreset.blbbrayan.repl.co')
    const res = await i0.fetch('signin', sessiontoken)
    if(res === null) null
    else if(res.error) {
        console.error(res.error)
        clearSession()
        location.hash = ''
    }
    else {
        login(res)
        console.log('Logged in as ' + res.email)
        if(location.hash === '#character-select') onhashchange()
        location.hash = 'character-select'
    }
})()

window.stopPlay = () => checkMap = false

export default {
    login, clearSession, 
    archon: () => archon,
    session: () => sessiontoken,
    player: () => selectedArchon,
    select: async v => {
        selectedArchon = v
        await loadMap()
    },
    loadMap,
    map: () => map,
    stopCheckMap: () => checkMap = false,
    changeMap
}
import i0 from '../i0/_module.js'

import account from '../services/account.js'

const races = [
    'deva',
    'cicadian',
    'teifling',
    'ghoul'
]
let raceIndex = 0

const paragon = [
    'pantheon',
    'crusader',
    'bard',
    'minstrel',
    'warlock',
    'witch',
    'poltergeist',
    'whisperer',
]
let paragonIndex = 0

let name = ''

i0.obj('character-create-race', 
`
<div>
    <div style="display: flex" i0="form">
        <div style="width: 120px; height: 120px;">
            ${i0.nugget('race', {width: '120px', height: '120px'})}
        </div>
        <div style="width: calc(100% - 120px)">
            ${i0.nugget('input', {width: '260px', height: '40px', title: 'Race', value: 'Deva', readonly: true})}
            ${i0.nugget('button', {width: '40px', height: '40px', text: '>'})}
        </div>
    </div>
</div>
`,
(ui, props) => {
    const input = ui.form.querySelector('input')
    const btn = ui.form.querySelector('button')
    const race = ui.form.querySelector('.race-img')
    btn.onclick = () => {
        raceIndex++
        if(raceIndex >= races.length) raceIndex = 0
        race.src = `./asset/${races[raceIndex]}.PNG`
        input.value = races[raceIndex].substr(0,1).toUpperCase() + races[raceIndex].substr(1)
    }
})

i0.obj('character-create-paragon', 
`
<div>
    <div style="display: flex" i0="form">
        <div style="width: 120px; height: 120px;">
            ${i0.nugget('paragon', {width: '120px', height: '120px'})}
        </div>
        <div style="width: calc(100% - 120px)">
            ${i0.nugget('input', {width: '260px', height: '40px', title: 'Paragon', value: 'Pantheon', readonly: true})}
            ${i0.nugget('button', {width: '40px', height: '40px', text: '>'})}
        </div>
    </div>
</div>
`,
(ui, props) => {
    const input = ui.form.querySelector('input')
    const btn = ui.form.querySelector('button')
    const paragonImg = ui.form.querySelector('.paragon-img')
    btn.onclick = () => {
        paragonIndex++
        if(paragonIndex >= paragon.length) paragonIndex = 0
        paragonImg.src = `./asset/${paragon[paragonIndex]}.PNG`
        input.value = paragon[paragonIndex].substr(0,1).toUpperCase() + paragon[paragonIndex].substr(1)
    }
})

i0.obj('character-create', i0.nugget('window', {width: '640px', height: '1136px', children: [
    '<h1>Create Archon</h1>',
    i0.nugget('input', {width: '260px', height: '40px', title: 'Name', v:v=>name=v}),
    '<br>',
    '<br>',
    i0.nugget('character-create-race'),
    i0.nugget('character-create-paragon'),
    '<br>',
    '<br>',
    '<div style="float:right">'
    +    i0.nugget('button', {width: '160px', height: '40px', text: 'Cancel', onclick: ()=>location.hash='character-select'})
    +    i0.nugget('button', {width: '160px', height: '40px', text: 'Create', onclick: async () => {
        let data = {...account.session(), name, race: races[raceIndex], paragon: paragon[paragonIndex]}
        if(data.name && data.race && data.paragon){
            let res = await i0.fetch('create', data)
            if(res.error) return console.error(res)
            account.login(res)
            location.hash = 'character-select'
        }
    }})
    +'</div>',
]}))

export default {}
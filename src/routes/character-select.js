import i0 from '../i0/_module.js'

import account from '../services/account.js'

i0.obj('character-select-archon', 
`
<div i0="form" class="csa">
    ${i0.nugget('race', {width: '120px', height: '120px'})}
    <div class="csa-input">
        ${i0.nugget('input', {width: '260px', height: '40px', readonly: true})}
        ${i0.nugget('button', {width: '40px', height: '40px', text: '>'})}
    </div>
</div>
`,
(ui, props) => {
    let race = ui.form.querySelector('.race-img')
    race.src = `./asset/${props.race}.PNG`
    let name = ui.form.querySelector('input')
    name.value = props.name
    let btn = ui.form.querySelector('button')
    btn.onclick = async () => {
        console.log('selected', props)
        await account.select(props)
        location.hash = '#play'
    }
})

i0.obj('character-select', `
<div i0="container">
${i0.nugget('window', {width: '640px', height: '1136px', children: [
    '<h1>Select Archon</h1>',
    i0.nugget('button', {width: '80px', height: '40px', text: 'New', onclick:()=>location.hash = 'character-create'}),
    '<br>',
    '<br>',
    '<div id="archonlist"></div>',
]})}
</div>
`,
(ui, props) => {
    const list = ui.container.querySelector('#archonlist')
    
    account.archon().forEach(archon => {
        list.appendChild( i0.load('character-select-archon', archon) )
    })
})

export default {}
import i0 from '../../i0.js'

i0.obj('race', 
`
<div class="race" i0="frame">
    <img src="./asset/race.PNG" i0="img" />
    <img src="./asset/deva.PNG" class="race-img" i0="race" />
</div>
`,
(ui, props) => {

    if(props.width) {
        ui.img.style.width = props.width
        ui.race.style.width = props.width
        ui.frame.style.width = props.width
    }
    if(props.height) {
        ui.img.style.height = props.height
        ui.race.style.height = props.height
        ui.frame.style.height = props.height
    }
    if(props.race) ui.race.src = `./asset/${props.race}.PNG`

})

export default {}
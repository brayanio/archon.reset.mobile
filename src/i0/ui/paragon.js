import i0 from '../../i0.js'

i0.obj('paragon', 
`
<div class="race">
    <img src="./asset/paragon.PNG" i0="img" />
    <img src="./asset/pantheon.PNG" class="paragon-img" i0="race" />
</div>
`,
(ui, props) => {

    if(props.width) {
        ui.img.style.width = props.width
        ui.race.style.width = props.width
    }
    if(props.height) {
        ui.img.style.height = props.height
        ui.race.style.height = props.height
    }
    if(props.paragon) ui.paragon.src = `./asset/${props.paragon}.PNG`

})

export default {}
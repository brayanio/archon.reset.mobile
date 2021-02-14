import i0 from '../../i0.js'

i0.obj('input', 
`
<label i0="label" class="input-label">
    <div i0="title" class="input-title"></div>
    <div i0="outer" class="input outer">
        <img src="./asset/input.PNG" i0="img">
        <input i0="input">
    </div>
<label>
`,
(ui, props) => {

    if(props.width) {
        ui.img.style.width = props.width
        ui.input.style.width = props.width
    }
    if(props.height) {
        ui.img.style.height = props.height
        ui.input.style.height = props.height
    }
    if(props.placeholder) ui.input.placeholder = props.placeholder
    if(props.value) ui.input.value = props.value

    if(props.title) ui.title.innerText = props.title
    if(props.type) ui.input.type = props.type

    if(props.v) ui.input.onkeyup = () => props.v(ui.input.value)
    if(props.readonly) {
        ui.label.classList.add('readonly')
        ui.input.setAttribute('readonly', '')
    }

    if(props.id) ui.input.id = props.id

})

export default {}
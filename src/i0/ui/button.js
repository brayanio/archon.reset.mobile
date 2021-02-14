import i0 from '../../i0.js'

i0.obj('button', 
`
<div i0="outer" class="input outer">
    <img src="./asset/input.PNG" i0="img">
    <button i0="button" type="button"></button>
</div>
`,
(ui, props) => {

    if(props.width) {
        ui.img.style.width = props.width
        ui.button.style.width = props.width
    }
    if(props.height) {
        ui.img.style.height = props.height
        ui.button.style.height = props.height
    }
    if(props.text) ui.button.innerHTML = props.text
    if(props.onclick) ui.button.onclick = props.onclick
    if(props.classList) ui.button.classList.add(...props.classList.split(' '))

})

export default {}
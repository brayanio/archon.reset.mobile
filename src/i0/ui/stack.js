import i0 from '../../i0.js'

i0.obj('stack', 
`
<div i0="outer" class="stack outer">
    <img src="./asset/stack1.PNG" i0="window">
    <div i0="inner" class="inner"></div>
</div>
`,
(ui, props) => {

    if(props.width) {
        ui.window.style.width = props.width
        ui.inner.style.width = props.width
    }
    if(props.height) {
        ui.window.style.height = props.height
        ui.inner.style.height = props.height
    }
    if(props.children) props.children.forEach(child => {
        if(typeof child === 'object') ui.inner.appendChild(child)
        else ui.inner.appendChild(i0.element(child))
    })
    if(props.classList) ui.inner.classList.add(...props.classList.split(' '))

})

export default {}
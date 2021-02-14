import i0 from '../i0/_module.js'

import account from '../services/account.js'

let form = {
    email: '', 
    password: ''
}
const v = key => val => form[key] = val

i0.obj('home', i0.nugget('window', {width: '640px', height: '1136px', children: [
    '<h1>Archon Reset</h1>',
    i0.nugget('input', {width: '260px', height: '40px', title: 'Email', v:v('email')}),
    '<br>',
    i0.nugget('input', {width: '260px', height: '40px', title: 'Password', type: 'password', v:v('password')}),
    '<br>',
    i0.nugget('button', {width: '80px', height: '40px', text: 'Signup', onclick: async () => {
        const res = await i0.fetch('signin', {signup: true, ...form})
        console.log(res)
        if(res.error) {
            document.querySelector('#error').classList.remove('hidden')
            account.clearSession()
        }
        else {
            account.login(res)
            location.hash = 'character-select'
        }
    }}),
    i0.nugget('button', {width: '80px', height: '40px', text: 'Login', onclick: async () => {
        const res = await i0.fetch('signin', {signin: true, ...form})
        console.log(res)
        if(res.error) {
            document.querySelector('#error').classList.remove('hidden')
            account.clearSession()
        }
        else {
            account.login(res)
            location.hash = 'character-select'
        }
    }}),
    '<br>',
    `<div class="error hidden" id="error">Invalid credentials.</div>`
]}))

export default {}
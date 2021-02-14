import i0 from './i0/_module.js'
import play from './routes/play.js'
import home from './routes/home.js'
import select from './routes/character-select.js'
import create from './routes/character-create.js'

i0.target('https://archonreset.blbbrayan.repl.co')

i0.router({
    '': 'home',
    '#': 'home',
    '#home': 'home',
    '#character-select': 'character-select',
    '#character-create': 'character-create',
    '#play': 'play'
})
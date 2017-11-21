import Express from 'express'
import ews from 'express-ws'

const app = Express();
const socket = ews(app);

app.use((req, res, next) => {
    console.log('middleware')
    req.testing = 'testing'
    return next()
})

app.get('/', (req, res) => {
    res.send(`I'm ok!`);
});

app.ws('/ws', (ws, req) => {
    ws.on('message', (msg) => {
        console.log('服务器收到数据: ', msg);
        ws.send('我收到数据啦,谢谢');
    })
    console.log('socket', req.testing)
})

app.listen(8000, () => {
    console.log('server running http://localhost:8000')
});


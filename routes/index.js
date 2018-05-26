const fs = require('fs');
const os = require('os');

const router = require('koa-router')();
const wxC = require('../controllers/v1.0/wxController');

router.post('/api/v1.0/getWxUserInfo', wxC.getWxUserInfo)
router.get('/api/v1.0/findStudentById', wxC.findStudentById)
router.post('/api/v1.0/addStudent', wxC.addStudent)

router.get('/index', async function (ctx) {
    await ctx.render('index')
})

// upload 
router.post('/api/v1.0/upload', async (ctx, next) => {

    if ('POST' != ctx.method) return await next();

    const file = ctx.request.body.files.file;
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    reader.pipe(stream);
    console.log('uploading %s -> %s', file.name, stream.path);

    ctx.redirect('/index');
})

module.exports = router;
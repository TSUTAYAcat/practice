const Router = require('koa-router');

let router = new Router();
router.get('',async ctx=>{
    let data = await ctx.db.excute("select * from note")
    await ctx.render('list',{a:12,data:data});
})
router.get('detail/:id',async ctx=>{
    ctx.body="麦田守望者"
})

module.exports=router.routes();

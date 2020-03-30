module.exports = (server)=>{
    server.use(async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            console.log("似乎有什么未知的事情发生哦",error)
        }
    })
}
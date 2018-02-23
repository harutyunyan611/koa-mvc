// const post = require("../models/posts");
const csrfMiddleware = require("../middlewares/csrf");
const passport = require("../auth/local");
const user = require("../models/users");
module.exports = {
    showForm: async (ctx, next) => {
        console.log(ctx.isAuthenticated());
        await ctx.render("auth/login", { csrf: ctx.csrf, error: ctx.session.error });
        ctx.session.error = [];
    },
    doLogin: async (ctx, next) => {
        return passport.authenticate('local', function (err, user, info, status) {
            if (user === false) {
                // ctx.body = { success: false, error: info.message }
                ctx.session.error = info.message;
                return ctx.redirect('/login');
                // ctx.throw(401)
            } else {
                ctx.body = { success: true }
                return ctx.login(user)
            }
        })(ctx)        
        // passport.authenticate('local', function (err, user, info) {
        //     console.log("here");
        //     if (err) { return next(err) }
        //     if (!user) { return ctx.body = JSON.stringify({ message: info.message }) }
        //     JSON.stringify(user);
        // })
    },
    index: async function (ctx, next) {
        // ctx.body = JSON.stringify(post.findAll());
        // let asd = new user({
        //     username: "tsovak",
        //     password: "tsovak",
        // })
        // asd.save();
        ctx.body = JSON.stringify(await ctx.isAuthenticated());
    }
};
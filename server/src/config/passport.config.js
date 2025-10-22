import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import User from "../models/user.models.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await  User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
})

// Google Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8800/api/v1/auth/google/callback"
        },

       async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({googleId: profile.id});
                // console.log(user);
                
                if(!user){
                    user = new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                        password: ""
                    })
                   await user.save();
                }
                return done(null, user);
            } catch (error) {
                // console.log(error);
                return done(error, null);
            }
        }
    )
 )

//  Github Strategy

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:8800/api/v1/auth/github/callback"
        },
       async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({githubId: profile.id});
                // console.log(user);

                if (!user) {
                    user =  User.create({
                        username: profile.username,
                        githubId: profile.id,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                        password: ""
                    })
                   await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
)

export default passport;
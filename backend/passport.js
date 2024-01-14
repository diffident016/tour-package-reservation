const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "980977772448-54i13k09ul6285ugn1ebmbev44mv0bkc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "1398590854070503";
const FACEBOOK_APP_SECRET = "8a52a904409eb46984f12536522d211b";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "https://localhost:3000/oauth2/redirect/facebook",
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
/**
 * This is the User model. 
 * It requires a unique email, a password and a optional name.
 */
module.exports = mongoose => {

    bcrypt = require('bcrypt');
    SALT_WORK_FACTOR = 10;

    // Creating a User schema.
    var userSchema = mongoose.Schema(
        {
            email: {
                type: String,
                required: true,
                unique: true
            },

            password: {
                type: String,
                required: true,
                unique: false
            },

            firstName: {
                type: String,
                required: true,
                unique: false
            },

            lastName: {
                type: String,
                required: true,
                unique: false
            }
        },
        {
            timestamps: false,
            versionKey: false
        }
    );

    userSchema.pre('save', function (next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // override the neutral password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    return mongoose.model("user", userSchema);
}

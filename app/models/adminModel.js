/**
 * This is the Admin model.
 * It requires a unique email, a password and a optional name.
 */
module.exports = mongoose => {

    bcrypt = require('bcrypt');
    SALT_WORK_FACTOR = 10;

    // Creating a Admin schema.
    var adminSchema = mongoose.Schema(
        {
            email: { type: String, required: true, trim: true, unique: true },
            password: { type: String, required: true },
            name: String,
        },
        {
            timestamps: false,
            versionKey: false
        });

    adminSchema.pre('save', function (next) {
        var admin = this;

        // only hash the password if it has been modified (or is new)
        if (!admin.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(admin.password, salt, function (err, hash) {
                if (err) return next(err);

                // override the neutral password with the hashed one
                admin.password = hash;
                next();
            });
        });
    });

    return mongoose.model("admin", adminSchema);
}

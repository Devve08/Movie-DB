const mongoose = require('mongoose')

Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true }
});

userSchema.pre('save', function(next){
    let user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        user.password=hash;
        next()
    })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

// module.exports = mongoose.model("user", userSchema);
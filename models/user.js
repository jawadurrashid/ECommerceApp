//Library initialization
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

//Step 1: Create user schema field; declare user name attributes 
var UserSchema = new Schema({
    email: {type: String, unique: true, lowercase:true},
    password: String,
    adress: String,
    
    profile: {
        name: {type: String, default: ''},
        picture: {type: String, default: ''},
    },
    
    history: [{
        date: Date,
        paid: {type: Number, default: 0},
//      item: {type: Schema.Types.ObjectId, ref: ''}
    }] 
});


//Step 2: Hash password before saving to database; ensures greater security

UserSchema.pre('save', function(next) {   //Pre-save
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(8, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });   
})

//Step 3: User input and database Password comparator 

UserSchema.methods.passwordComparator = function(inputPassword){
    return bcrypt.compareSync(inputPassword, this.password)
}

//Export entire schema for global use
module.exports = mongoose.model('User', UserSchema);
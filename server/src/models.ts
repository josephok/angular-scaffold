import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/angular';
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
(<any>mongoose).Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

export type UserModel = mongoose.Document & {
  username: string,
  password: string,
  comparePassword: (candidatePassword: string) => boolean
};

const userSchema = new Schema(
  {
    username: String,
    password: String
  }
);

// JWT token
const tokenSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,  // 连接user
    token: String
  }
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (error: mongoose.Error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
export const Token = mongoose.model('Token', tokenSchema);

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTP =require('../models/otp');
const otpgenerator=require('otp-generator');
const { jwtSecret, jwtExpire } = require('../config/keys');
const otp = require('../models/otp');

exports.signupController = async (req, res) => {
    const { firstname,lastname, email, password,otpb } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {//user exist
            return res.status(400).json({
                errorMessage: 'Email already exists',
            });
        }

        const newUser = new User();
        newUser.firstname = firstname;
        newUser.lastname = lastname;
        newUser.email = email;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);//cripte le password
        // const otpcode=otpgenerator.generate(4,{digits:true,lowerCaseAlphabets:false,specialChars:false,upperCaseAlphabets:false});
        // console.log(otpcode);
        // const otp=new OTP();
        // otp.otp=otpcode;
        // otp.email=email;
        // // otp.otp = await bcrypt.hash(otp.otp, salt);//cripte le otp
        // res.json({
        //     otp: 'otp send successfully',
        // });
        // await otp.save();
        // const otpHolder =await OTP.find({
        //     email:email
        // },{otp});
        // console.log(otpHolder);
        // if (otpHolder.length===0)return res.satatus(400).send('otp expired try again');
        // const bodyotp= req.body.otp
        // console.log(bodyotp);

        //  if(otpb===otpHolder){





          await newUser.save();

          res.json({
              successMessage: 'Registration success. Please signin.',
          });
        // }
    } catch (err) {
        console.log('signupController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

exports.signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        const payload = {
            user: {
                _id: user._id,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
            if (err) console.log('jwt error: ', err);
            const { _id, firstname,lastname, email } = user;

            res.json({
                token,
                user: { _id, firstname,lastname, email },
                successMessage: 'welcome to your account ',
            });
        });
    } catch (err) {
        console.log('signinController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

exports.otpverification =async(req,res)=>{
    const otpHolder =await otp.find()
}
    

 
    


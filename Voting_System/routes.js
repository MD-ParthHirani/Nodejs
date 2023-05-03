
const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const userModel = require("./models.js");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
var session=require('express-session');
let bodyParser = require('body-parser');
app.use(express.urlencoded());
var urlencodeParser = bodyParser.urlencoded({extended: false});

passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
app.get('/otp.htm', function(req,res){
  res.sendFile( __dirname + "/" + "otp.htm");
});
// app.get('/test.html', function(req,res){
//   res.sendFile( __dirname + "/" + "test.html");
  
// })

app.get('/proposal.html', function(req,res){
    res.sendFile( __dirname + "/" + "proposal.html");
    
  })
  
  app.get('/cre_pro.html', function(req,res){
    res.sendFile( __dirname + "/" + "cre_pro.html");
    
  })
  app.get('/login.htm', function(req,res){
    res.sendFile( __dirname + "/" + "login.htm");
    
  })

// app.get("/login.htm", isLoggedIn, function (req, res) {
//   res.sendFile(__dirname + "/" +"login.htm");
//});
app.get("/signup.htm", function (req, res) {
  res.sendFile(__dirname + "/" +"signup.htm");
});

app.post("/signup", urlencodeParser,  async (req, res)=>{
  const usernm = await userModel.findOne({username: req.body.addusername});
  if (usernm){
    res.send("user already exists")
  } else {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "parthhirani536@gmail.com",
        pass: "siyo qddh jqhn pcbu"
      }
    });
    
    const otp = (length = 4) => {
        let otp = ''
        const characters = '0123456789'
    
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * characters.length)
            otp += characters[index]
        }
      return otp };	
    const generated_otp = otp(6);
    const mailConfigurations = {
    
      // It should be a string of sender/server email
      from: "parthhirani536@gmail.com" ,
    
      to: req.body.addemail ,
    
      // Subject of Email
      subject: 'Email Verification',
      
      // This would be the text of email body
      text: `Hi! There, You have recently visited
        our website and entered your email.
        This is your verification code:${generated_otp}
        Thanks`
      
    };
    
    transporter.sendMail(mailConfigurations, function(error, info){
      if (error) throw Error(error);
      console.log('Email Sent Successfully');
      console.log(info);
    });
    const user = new userModel({
      username : req.body.addusername ,
      election:req.body.addECard,
      email : req.body.addemail,
      password: req.body.addpswd,
      Otp: generated_otp,
    });

    try{
        await user.save();
        //res.send(user);
        res.sendFile( __dirname + "/" + "otp.htm");
    } catch(error){
        res.status(500).send(error);
    }}
});

//............................................................................

app.post('/mail_otp', async (req,res)=> {
   
  try{
          const Otp =req.body.Otp;
          console.log(Otp);
          const userotp = await userModel.findOne({Otp: Otp});
          console.log(userotp)
          if(!userotp){
              res.status(402).json({
                 
                  message:"Error in verifyng. Make sure your otp is correct."
              });
              return;
          }

          userotp.isVerified = true;
          userotp.Otp= undefined;
          userotp.OtpExpires= undefined;
          await userotp.save();
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "parthhirani536@gmail.com",
              pass: "siyo qddh jqhn pcbu"
            }
          });

          const mailOptions = {
              to: userotp.email,
              from: "parthhirani536@gmail.com",
              subject:"Email Verified",
              html:`  <P><b>Hi ${userotp.username},</b></P>
                      <p> Thank You , Your ${userotp.email} is verified. Have a nice day</p>`
                     
          
          };
          transporter.sendMail(mailOptions,(err,result)=> {
              if(err) return res.status(500).json({message: err.message});
              res.sendFile( __dirname + "/" + "login.htm");
             // res.status(200).json({success: true, message: 'Your email address is verified'});
          })
            
  }catch(err){
      res.status(500).json({
           message: err.message
      });
  }

})
app.post("/login", urlencodeParser,  async (req, res)=>{
  // console.log(req.body.usernm);
  const name = await userModel.findOne({username:req.body.username});
  if (name.isVerified==true){
    const psd = await bcrypt.compare(req.body.pswd, name.password);
    if(psd){
      res.sendFile( __dirname + "/" + "proposal.html");
      res.send("loggedin");
    }else{
      res.send("password is incorrect");
    }
  } else{
    res.send("user not verified");
  }
  
  });
//   app.get("/logout", function (req, res) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//       });
// });


module.exports=app;













//  const express = require("express");
//  const nodemailer = require("nodemailer");
// const User = require("./models.js");
// const app = express();
// let bodyParser = require('body-parser');

// app.use(express.urlencoded());
// var urlencodeParser = bodyParser.urlencoded({extended: false});
// //.................................................................................
// app.get('/proposal.html', function(req,res){
//   res.sendFile( __dirname + "/" + "proposal.html");
  
// })

// app.get('/cre_pro.html', function(req,res){
//   res.sendFile( __dirname + "/" + "cre_pro.html");
  
// })
// //......................................................................................

// app.get('/login.htm', function(req,res){
//   res.sendFile( __dirname + "/" + "login.htm");
// })

// app.post("/login", urlencodeParser,  async (req,res )=>{

//   const name = await User.findOne({email:req.body.email});
		
//   if (name.isVerified==true){
//     const psd = await bcryptjs.compare(req.body.pswd, name.password);
//     if(psd){
    
//      res.sendFile( __dirname + "/" + "proposal.html");
//     }else{
//       res.send("password is incorrect");
//     }
//   } else{
//     res.send("user not verified");
//   }

// })

// //...................................................................................


// app.get('/signup.htm', function(req,res){
//   res.sendFile( __dirname + "/" + "signup.htm");
  
// })

// app.post("/signup", urlencodeParser,  async (req, res)=>{
 
// const usernm = await User.findOne({username: req.body.addusername});
// if (usernm){
//   res.send("user already exists")
// } else {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: "parthhirani536@gmail.com",
//       pass: "siyo qddh jqhn pcbu"
//     }
//   });
  
//   const otp = (length = 4) => {
//       let otp = ''
//       const characters = '0123456789'
  
//       for (let i = 0; i < length; i++) {
//           const index = Math.floor(Math.random() * characters.length)
//           otp += characters[index]
//       }
//     return otp };	
//   const generated_otp = otp(6);
//   const mailConfigurations = {
  
    
//     from: "parthhirani536@gmail.com" ,
//     to: req.body.addemail ,
//     subject: 'Email Verification code',
//     text: `This is your verification code:${generated_otp}
//       Thanks`
    
//   };
  
//   transporter.sendMail(mailConfigurations, function(error, info){
//     if (error) throw Error(error);
//     console.log('Email Send Successfully');
//     console.log(info);
//  });
//   const user = new User({
//     username : req.body.addusername ,
//     election:req.body.addECard,
//     email : req.body.addemail,
//     password: req.body.addpswd,
//     Otp: generated_otp,
//   });

//   try{
//       await user.save();
//       //res.send(user);
//       res.sendFile( __dirname + "/" + "otp.htm");
//   } catch(error){
//       res.status(500).send(error);
//   }}
// }
// );

// //......................................................................................

// app.get('/otp.htm', function(req,res){
//   res.sendFile( __dirname + "/" + "otp.htm");
  
// })
// app.post('/mail_otp', async (req,res)=> {
   
//   try{
//           const Otp =req.body.Otp;
//           console.log(Otp);
//           const userotp = await User.findOne({Otp: Otp});
//           console.log(userotp)
//           if(!userotp){
//               res.status(402).json({
                 
//                   message:" your otp is incorrect. plz enter valid otp"
//               });
//               return;
//           }

//           userotp.isVerified = true;
//           userotp.Otp= undefined;
//           userotp.OtpExpires= undefined;
//           await userotp.save();
//           const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: "parthhirani536@gmail.com",
//               pass: "siyo qddh jqhn pcbu"
//             }
//           });

//           const mailOptions = {
//               from: userotp.email,
//               to: "parthhirani536@gmail.com",
//               subject:"Verified Email",
//               html:`  <P><b>Hi ${userotp.username},</b></P>
//                       <p> Thank You , Your ${userotp.email} is verified</p>`
                     
          
//           };
//           transporter.sendMail(mailOptions,(err,result)=> {
            
//               if(err) return res.status(500).json({message: err.message});
//               res.sendFile( __dirname + "/" + "login.htm");
           
//               //res.status(200).json({success: true, message: 'Your email is verified'});
//           })
          
            
//   }catch(err){
//       res.status(500).json({
//            message: err.message
//       });
//   }

// })

// //...........................................................................................

// app.post("/users", async (req, res) => {
//     const users = await User.findOne({email :req.body.addemail, password :req.body.addpswd});
  
//     try {
//       res.send(users);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

// module.exports = app;
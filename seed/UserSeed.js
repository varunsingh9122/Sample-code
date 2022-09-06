const mongoose = require('mongoose');
var UserSchema = require('../app/models/Users');

module.exports = {
    AdminUser : (req, res, next) => {
        console.log("Executing seed.....")
        const adminUser = {
            email : 'varunsingh91@live.com',
            password : "varunsingh",
            fName : "Varun",
            mName : "",
            lName : "Singh",
            _role : "Admin",
            contact : "8744880990"
        };
        
        UserSchema.findOne({email : adminUser.email}).then((data)=>{
            if(data){
                console.log("Dummy Admin user already exists.")

            }else{
                console.log("Creating Dummy User")
                const newUser = new UserSchema(adminUser)

                newUser.save().then((result)=>{
                    console.log("Admin user created successfully", result)
                }).catch((err)=>{
                    console.error("Error while creating admin user", err)
                })
            }
        }).catch((err)=>{
            console.error("Error while fetching User.", err)
        })
    }
}
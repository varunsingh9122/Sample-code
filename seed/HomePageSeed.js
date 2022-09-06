var HomePageSchema = require('../app/models/cms/HomePage');

module.exports = {
    GenerateDummy : (req, res, next) => {
        console.log("Generating Dummy Home Content.");

        const homeContent = {
            heading : ''
        }

        HomePageSchema.find().then((data)=>{
            if(!data){
                
            }else{
                console.log("Home page content already exists.")
            }
        }).catch((err)=>{

        })
    }
}
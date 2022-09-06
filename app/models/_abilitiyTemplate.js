module.exports.template = [{
    dashboard : {
        access : true,
        get : false,
        post : false,
        patch : false,
        delete : false
    },
    agent : {
        access : true,
        get : false,
        post : false,
        patch : false,
        delete : false
    }
}]

module.exports.AdminTemplate = {
    dashboard : {
        access : true,
        get : true,
        post : true,
        patch : true,
        delete : true
    }
}
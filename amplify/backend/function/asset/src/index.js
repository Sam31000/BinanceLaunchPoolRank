exports.handler = async (event, context, callback) => {
    
    console.log("EVENT : ", event.arguments.name);
    
    switch(event.info.fieldName) {
        case "getAsset":
            callback(null, getAsset(event.arguments));
            break;
        default:
            callback("Unknown field, unable to resolve " + event.field, null);
            break;
    }

    
function getAsset(args){
    if (args == null || args.name == null)
        return null;
    
    return {
            name : "BUSD",
            USDValue : 1,
            imageUrl: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/4cf7d633-92fb-4d37-80ed-458c7d1ea410.png"
        };
}
    
};

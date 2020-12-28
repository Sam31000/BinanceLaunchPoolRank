const cheerio = require('cheerio');
const request = require('request');

exports.handler = async (event, context, callback) => {

    const BASE_URL = "https://launchpad.binance.com"
    const LAUNCH_POOL_URL = BASE_URL + "/en/tab3";
    let launchPoolLists = [];

    switch (event.info.fieldName) {
        case "listLaunchPools":
            callback(null, await listLaunchPools());
            break;
        default:
            callback("Unknown field, unable to resolve " + event.field, null);
            break;
    }

    async function listLaunchPools() {

        return await parseBinanceLaunchPoolList().then((res, err) => { return res; });
        //console.log("RES : ", res);
        //return launchPoolLists;
        /* return [{
             totalPoolStacked: 321313412.213,
             totalPoolReward: 1424235251.213,
             earnedAsset: {
                 USDValue: 0.000020,
                 name: "BNB",
                 imageUrl: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/550eda20-1b9a-4bc7-9a65-e4a329e8bb57.png"
             },
             stakedAsset: {
                 USDValue: 10,
                 name: "CHZ",
                 imageUrl: "https://bin.bnbstatic.com/images/20191211/721a863b-5c9d-4061-a2f0-d288dcd3d1ad.png"
             },
             url: "http://google.fr",
         },
         {
             totalPoolStacked: 321412.213,
             totalPoolReward: 14251.213,
             earnedAsset: {
                 USDValue: 0.123,
                 name: "BTC",
                 imageUrl: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/87496d50-2408-43e1-ad4c-78b47b448a6a.png"
             },
             stakedAsset: {
                 USDValue: 10,
                 name: "SOL",
                 imageUrl: "https://bin.bnbstatic.com/images/20200410/6caae4f1-f4c6-4486-b05b-442dd559f51f.jpg"
             },
             url: "http://google.fr",
         },
         {
             totalPoolStacked: 3243412.213,
             totalPoolReward: 21515725.321,
             earnedAsset: {
                 USDValue: 0.123,
                 name: "BAT",
                 imageUrl: "https://bin.bnbstatic.com/images/20191211/b87dedcf-edaa-4069-bfad-de7f88d7204e.png"
             },
             stakedAsset: {
                 USDValue: 140,
                 name: "USDC",
                 imageUrl: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/4cf7d633-92fb-4d37-80ed-458c7d1ea410.png"
             },
             url: "http://google.fr",
         },
         ]; */
    }

    function parseBinanceLaunchPoolList() {

        return new Promise((success, failure) => {
            request({
                method: 'GET',
                url: LAUNCH_POOL_URL
            }, (err, res, body) => {

                if (err) {
                    console.log("ERROR DETECTED");
                    failure({ err: "Error detected" });//console.error(err);
                }

                let $ = cheerio.load(body);

                //Getting LaunchPool pages links
                let launchPoolLinks = $('a[href^="/en/launchpool/"]');

                for (var i = 0; i < launchPoolLinks.length; i++) {
                    launchPoolLists.push({ url: BASE_URL + launchPoolLinks[i].attribs.href });
                    //console.log("Link : ", launchPoolLists[i] );
                }
                //console.log("RES TEST: ", launchPoolLists);

                success(launchPoolLists);

            });
        })


    }

};

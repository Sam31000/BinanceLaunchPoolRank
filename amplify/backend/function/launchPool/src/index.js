const cheerio = require('cheerio');
const request = require('request');

exports.handler = async (event, context, callback) => {

    const BASE_URL = "https://launchpad.binance.com"
    const LAUNCH_POOL_URL = BASE_URL + "/en/tab3";
    const API_GETPRICE_URL = "https://api1.binance.com/api/v3/ticker/price?symbol=";

    switch (event.info.fieldName) {
        case "listLaunchPools":
            callback(null, await listLaunchPools());
            break;
        default:
            callback("Unknown field, unable to resolve " + event.field, null);
            break;
    }

    async function listLaunchPools() {

        let launchPoolList = [];

        //Retreiving launchPoolUrl
        launchPoolList = await parseBinanceLaunchPoolList(launchPoolList).then((res, err) => {
            if (err)
                return err;
            return res;
        });

        //Retreive launchPoolPair
        launchPoolList = await getPairByLPList(launchPoolList).then((res, err) => {
            if (err)
                return err;
            return launchPoolList;
        });

        launchPoolList = await getAssetsUSDTValue(launchPoolList).then((res, err) => { return res });

        console.log("LaunchPool result ")

        return launchPoolList;
    }

    //Initialization of launchPoolList with urls
    function parseBinanceLaunchPoolList(launchPoolList) {
        return new Promise((success, failure) => {
            request({
                method: 'GET',
                url: LAUNCH_POOL_URL
            }, (err, res, body) => {

                if (err) {
                    console.err("Error while retriving LaunchPoolList : ", err);
                    failure({ err: "Error detected" });
                }

                let $ = cheerio.load(body);

                //Getting LaunchPool pages links
                let launchPoolLinks = $('a[href^="/en/launchpool/"]');
                for (var i = 0; i < launchPoolLinks.length; i++) {
                    launchPoolList.push({ url: BASE_URL + launchPoolLinks[i].attribs.href });
                }

                success(launchPoolList);

            });
        });
    }

    function getPairByLPList(LPList) {
        return new Promise(function (success, failure) {

            LPList.forEach((LP) => {
                var pair = LP.url.split('/').pop().split("_");
                LP.stakedAsset = { name: pair.pop() };
                LP.earnedAsset = { name: pair.shift() };
            });
            success(LPList);
        })
    }

    async function getAssetsUSDTValue(LPList) {
        var assetsUSDTValues = [];

        for (var i = 0, len = LPList.length; i < len; i++) {
            if (assetsUSDTValues[LPList[i].stakedAsset.name] == null)
                assetsUSDTValues[LPList[i].stakedAsset.name] = await getAssetValue(LPList[i].stakedAsset.name).then((res, err) => { return res });

            LPList[i].stakedAsset.USDValue = assetsUSDTValues[LPList[i].stakedAsset.name];

            if (assetsUSDTValues[LPList[i].earnedAsset.name] == null)
                assetsUSDTValues[LPList[i].earnedAsset.name] = await getAssetValue(LPList[i].earnedAsset.name).then((res, err) => { return res });

            LPList[i].earnedAsset.USDValue = assetsUSDTValues[LPList[i].earnedAsset.name];
        }

        return LPList;
    }

    function getAssetValue(assetSymbol) {
        return new Promise((success, failure) => {

            request({
                method: 'GET',
                url: API_GETPRICE_URL + assetSymbol + "USDT"
            }, (err, res, body) => {
                if (err) {
                    console.err("Error while retriving %s price : %s", assetSymbol, err);
                    failure({ err: "Error detected" });
                }
                success(JSON.parse(body).price);
            });
        });
    }

};

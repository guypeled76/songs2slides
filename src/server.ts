import express from 'express';
import asyncHandler from 'express-async-handler';
import { scrapeSong } from './scrapers';


// Create a new express application
const app = express();

app.get('/', asyncHandler(async (req, res, next) => {
    const result = await scrapeSong("https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=34&wrkid=2126");
    res.json(result);

}));


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


//AIzaSyDxRPV5skKnMJRxsww7Vcoq25JTj-WEw2E
//c4b1409f8ff5c4fee
//https://www.googleapis.com/customsearch/v1?key=AIzaSyDxRPV5skKnMJRxsww7Vcoq25JTj-WEw2E&cx=c4b1409f8ff5c4fee&q=%D7%90%D7%94%D7%95%D7%91%D7%AA%D7%99&callback=hndlr
//https://programmablesearchengine.google.com/controlpanel/overview?cx=c4b1409f8ff5c4fee
//https://developers.google.com/custom-search/v1/using_rest#response_data
//https://developers.google.com/custom-search/v1/using_rest
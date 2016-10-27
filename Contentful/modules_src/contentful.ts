﻿import * as contentaggregator from "contentaggregator";
var contentful = require('contentful'); 

function getClient(context: contentaggregator.INodeContext) {
    // Get args from the task 
    const spaceId = context.args["spaceId"];
    const accessToken = context.args["accessToken"];

    // Create Contentful client
    const client = contentful.createClient({        
        space: spaceId, // This is the space ID. A space is like a project folder in Contentful terms        
        accessToken: accessToken // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    });
    return client;
}

export async function fetchUpdates(mainCallback: (error, res) => void, event: Object, context: contentaggregator.INodeContext) {
    const client = getClient(context);

    const synctoken = await contentaggregator.bindValue(context, "#{elasticsearch:ContentfulSyncToken}");
    let syncResponse;
    if (synctoken == null || synctoken.length === 0) {
        console.log("Initial sync");
        syncResponse = await client.sync({
            "initial": true,
            "resolveLinks": false
        });
    } else {
        console.log(`Using synctoken ${synctoken}`);
        syncResponse = await client.sync({
            "nextSyncToken": synctoken,
            "resolveLinks": false
        });
    }
    console.log(`Got ${syncResponse.entries.length} entries, ${syncResponse.assets.length} assets, and nextSyncToken is ${syncResponse.nextSyncToken}`);

    await contentaggregator.setValue(context, "elasticsearch:ContentfulSyncToken", syncResponse.nextSyncToken);
    mainCallback(null, syncResponse);
}

/** 
 * Removes locale information for all fields in an Contentful entry
 * and returns an array with one entry per found locale
 *
 * {
 *  "sys": {
 *      "id": "1234"
 *  },
 *  "fields": {
 *      "headline": {
 *          "en-US": "Hello world"
 *          "sv": "Hej världen"
 *      }
 *  }
 * }
 * Becomes an array with:
 * {
 *  "sys": {
 *      "id":"1234"
 *  },
 *  "fields": {
 *      "headline": "Hello world"      
 *  }
 *  "locale":"en-us"
 * },
 * 
 * {
 *  "sys": {
 *      "id": "1234"
 *  },
 *  "fields": {
 *      "headline": "Hej världen"
 *  },
 *  "locale": "sv"
 * }
 */
export function createNewEntryPerLocale(mainCallback: (error, res) => void, entryOrAsset: any, context: contentaggregator.INodeContext) {
    const entry = <EntryWithLocale>entryOrAsset;
    const arrayOfEntries = doCreateNewEntryPerLocale(entry);
    mainCallback(null, new contentaggregator.ProcessJsonArrayResult(arrayOfEntries));
}

class EntryWithLocale
{
    sys:any;
    fields:{[locale: string]:any};
}
class EntryWithoutLocale
{
    locale: string;
    sys:any;
    fields:any;
}

function doCreateNewEntryPerLocale(entryWithLocale:EntryWithLocale) : EntryWithoutLocale[]
{
    const locales: {[locale: string]:EntryWithoutLocale;} = {};
    const fields = entryWithLocale.fields;
    for(var field in fields)
    {
        for (var localeName in fields[field]) {
            if(locales[localeName]==null){
                const newEntry = locales[localeName] = new EntryWithoutLocale();
                newEntry.sys = entryWithLocale.sys;
                newEntry.fields = {};
                newEntry.locale = localeName.toLowerCase();
                locales[localeName] = newEntry;
            }
            const entry = locales[localeName];
            entry.fields[field] = fields[field][localeName];
        }
    }
    return Object.keys(locales).map(l=>locales[l]);
}

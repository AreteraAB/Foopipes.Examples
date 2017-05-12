import * as foopipes from "foopipes";
import ICallContext = foopipes.ICallContext;
import IResult = foopipes.IResult;
import ProcessJsonResult = foopipes.ProcessJsonResult;
import ProcessStreamResult = foopipes.ProcessStreamResult;

export function myFunction(event: any, context: ICallContext): Object {
    console.log("Hello world");
    event.myId = make_random_id();
    return event;
}

function make_random_id() : string
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
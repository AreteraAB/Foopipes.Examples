import * as contentaggregator from "contentaggregator";

export function myFunction(callback: (error, res) => void, data: Object, context: contentaggregator.INodeContext)
{
    console.log("Hello world");
    callback(null, data);
};

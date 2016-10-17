import * as contentAggregator from "contentAggregator";

export function myFunction(callback: (error, res) => void, data: Object, context: contentAggregator.INodeContext)
{
    console.log("Hello world");
    callback(null, data);
};

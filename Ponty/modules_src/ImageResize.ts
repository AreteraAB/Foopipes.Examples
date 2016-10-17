import * as contentAggregator from "contentaggregator";
var gm = require('gm').subClass({imageMagick: true});

export function ImageResize(result: contentAggregator.IBinaryResultStream, physicalPath: string, context: contentAggregator.INodeContext)
{		
    // Invoke the 'gm' NPM module, and have it pipe the resulting image data back
    let transform = gm(physicalPath)
        .resize(50, 50);

	var str;
    if (context.metadata["image_url"].indexOf(".gif")>0)
        str = transform.stream("png");
	else
		str = transform.stream();

    str.pipe(result.stream);
}
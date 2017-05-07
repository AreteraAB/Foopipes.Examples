import * as foopipes from "foopipes";
import ICallContext = foopipes.ICallContext;
import IResult = foopipes.IResult;
import ProcessJsonResult = foopipes.ProcessJsonResult;
import ProcessStreamResult = foopipes.ProcessStreamResult;
import IStreamEvent = foopipes.IStreamEvent;

var gm = require('gm').subClass({imageMagick: true});

export function ImageResize(event: IStreamEvent, context: ICallContext): Promise<IResult>
{		
  return new Promise<IResult>((resolve, reject) => {
        const r = new ProcessStreamResult(context);

        // Invoke the 'gm' NPM module, and have it pipe the resulting image data back
        let transform = gm(event.stream,'img.png')
            .resize(50, 50);

        var str;
        if (context.metadata["image_url"].indexOf(".gif")>0)
            str = transform.stream("png");
        else
            str = transform.stream();

        str.pipe(r.stream).on('finish', ()=>resolve(r));
    });  
}
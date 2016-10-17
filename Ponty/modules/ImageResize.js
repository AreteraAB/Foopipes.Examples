"use strict";
var gm = require('gm');
function ImageResize(result, physicalPath, context) {
    let igm = gm.subClass({ imageMagick: true });
    igm(physicalPath)
        .resize(240, 240)
        .noProfile()
        .write("/var/images/bla.png", err => {
        if (!err)
            console.log('done');
        else
            console.log(err);
    });
    let transform = igm(physicalPath)
        .resize(50, 50);
    var str;
    if (context.metadata["image_url"].indexOf(".gif") > 0)
        str = transform.stream("png");
    else
        str = transform.stream();
    str.pipe(result.stream);
}
exports.ImageResize = ImageResize;
//# sourceMappingURL=ImageResize.js.map
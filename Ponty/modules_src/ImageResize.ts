var sharp = require('sharp');

export function ImageResize(callback, physicalPath, context)
{
    // Invoke the 'sharp' NPM module, and have it pipe the resulting image data back
    let transform = sharp(physicalPath)
        .resize(50, 50);

    if (context.metadata["image_url"].indexOf(".gif")>0)
        transform = transform.png();

    transform.pipe(callback.stream);
}
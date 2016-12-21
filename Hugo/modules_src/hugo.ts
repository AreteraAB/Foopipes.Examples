import * as contentaggregator from "contentaggregator";

export async function formatJob(resultStream: contentaggregator.IBinaryResultStream, data: any, context: contentaggregator.INodeContext) {

    await contentaggregator.setValue(context, "metadata:filename", data.assignment_id + ".md");

    resultStream.stream.write(JSON.stringify(data, null, "\t"));
    resultStream.stream.write("\n");
    resultStream.stream.write("# " + data.title + " #\n");
    resultStream.stream.write(data.body + "\n");
    resultStream.stream.write(data.apply_btn + "\n");       
    resultStream.stream.end();
};


const a_fetch = async function(){
    const f_res = await fetch(web_url);
    const reader = f_res.body.getReader();
    const stream = new ReadableStream({
        start(controller) {
            return pump();
            function pump() {
                return reader.read().then((reader_res) => {
                    const done = reader_res.done;
                    const value = reader_res.value;
                    // When no more data needs to be consumed, close the stream
                    if (done) {
                        controller.close();
                        return;
                    }
                    // Enqueue the next data chunk into our target stream
                    controller.enqueue(value);
                    return pump();
                });
            }
        },
    });
    // Create a new response out of the stream
    const res = new Response(stream);
    console.log("res", res);
    const blob = await res.blob();
    console.log("blob", blob);
    URL.createObjectURL(blob);
};

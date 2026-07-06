const js_msg = " (when in doubt, JavaScript it out!)";

async function send_post(data, url){
    const params = new URLSearchParams();
    for(const i in data){
        params.append(i, data[i]);
    }
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params,
        });
        
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // raw is a string of JSON;
        const raw = await response.text();
        // console.log("raw:", raw);
        
        // t is the result of the contrib;
        const t = JSON.parse(raw)
        // console.log('success:', t);
        
        return t;
    }
    catch(error){
        console.error('error:', error);
    }
}

async function get_stuff(action, props){
    await wait(wait.query);
    
    // rs is a ReadableStream;
    const rs = await fetch(
        "https://minecraft.wiki/api.php?action=" +
        action +
        "&format=json" +
        props
    );
    // raw is a string of JSON;
    const raw = await rs.text();
    // t is the wikitext of the page;
    return JSON.parse(raw);
}

async function get_text(title){
    return (await get_stuff(
        "parse",
        "&prop=wikitext&page=" +
        title
    )).parse?.wikitext?.['*'] ?? "";
}

async function get_redrs(title){
    const o = (await get_stuff(
        "query",
        "&prop=linkshere&titles=" +
        title +
        "&lhshow=redirect&lhprop=title&lhlimit=500"
    )).query.pages;
    // it returns a dictionary instead of an array for some reason;
    return o[
        Object.getOwnPropertyNames(o)?.[0]
    ]?.linkshere ?? [];
}

async function get_wlh(title, raw){
    let o = (await get_stuff(
        "query",
        "&prop=linkshere&titles=" +
        title +
        "&lhprop=title&lhlimit=500"
    ));
    
    // it returns a dictionary instead of an array for a good reason;
    if(raw) return o;
    
    o = o.query.pages;
    return o[
        Object.getOwnPropertyNames(o)?.[0]
    ]?.linkshere ?? [];
}

async function get_transcludedin(title, raw){
    let o = (await get_stuff(
        "query",
        "&prop=transcludedin&titles=" +
        title +
        "&tiprop=title&tilimit=500"
    ));
    
    // it returns a dictionary instead of an array for a good reason;
    if(raw) return o;
    
    o = o.query.pages;
    return o[
        Object.getOwnPropertyNames(o)?.[0]
    ]?.transcludedin ?? [];
}

async function get_subpages(title){
    return (await get_stuff(
        "query",
        "&list=prefixsearch&pssearch=" +
        title.replace(/\/?$/, "/") +
        "&pslimit=500"
    )).query.prefixsearch;
}

/* make a contribution to the wiki, using the account your currently signed-in as; */
async function contrib(options){
    await wait(wait.contrib);
    
    const rs = await fetch(
        "https://minecraft.wiki/api.php?action=query&format=json&meta=tokens&type=*"
    );
    // raw is a string of JSON;
    const raw = await rs.text();
    // t is the token i need;
    const token = JSON.parse(raw).query.tokens.csrftoken;
    
    options.token = token;
    options.bot = true;
    options.format = "json";
    
    return (await send_post(options, "https://minecraft.wiki/api.php"));
}

/*
    update a page;
    don't check if it already exists;
    don't check if the new text is different than the old text;
    just update it to have the new text;
*/
async function update_page(title, f, summary, o = {}){
    const nt = (
        (f instanceof Function) ?
        (f(await get_text(title))) :
        (f)
    );
    
    o.action = "edit";
    o.title = title;
    o.summary = summary + js_msg;
    o.text = nt;
    
    return (await contrib(o));
}

/*
    edit a page;
    title: page to edit;
    f: either:
    - function to convert old text of page to new text of page;
    - new text of page;
    summary: edit summary (briefly describe your changes);
*/
async function edit(title, f, summary){
    const ct = await get_text(title);
    
    const nt = f instanceof Function ? f(ct) : f;
    
    // don't make an edit that does nothing!
    if(ct === nt) return "Didn't make empty edit.";
    return (await update_page(title, nt, summary, {
        nocreate: 1,
    }));
}

/*
    create a new page;
    title: page to create;
    nt: text of the new page;
    summary: edit summary (briefly describe your changes);
*/
async function create(title, nt, summary){
    return (await update_page(title, nt, summary, {
        createonly: 1,
    }));
}
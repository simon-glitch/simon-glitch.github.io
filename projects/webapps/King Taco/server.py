
from flask import Flask
from flask import request
# from flask import jsonify
# from flask import render_template
from flask import render_template_string
from flask import make_response
from flask_cors import CORS

from os.path import exists
import re
import os
# import json
import uuid
import urllib.parse
# from zipfile import ZipFile

# make sure PATH is set
# os.__path__ = "C:\\Users\\simon\\projects\\webapps\\King Taco"
# os.environ["PATH"] += os.pathsep + os.pathsep.join(["C:\\Users\\simon\\projects\\webapps\\King Taco"])

# base paths
my_path = "C:/Users/simon/projects/webapps/King Taco/"
index_path = "index.html"


the_access_code = "anything_343"
app = Flask('app')
CORS(app)

headers = {}

header = headers
# @crossdomain(origin='*', headers='Content-Type')


# useful methods

def index_of(ur_arr, ur_item):
    if (ur_item in ur_arr):
        return ur_arr.index(ur_item)
    return -1


def random_string():
    return uuid.uuid1().hex


# Routing

@app.route('/')
def index():
    text = open(my_path + index_path).read()
    resp = make_response(render_template_string(text), 200, header)
    return resp



@app.errorhandler(404)
def page_not_found(error):
    text = open(my_path + 'my404.html').read()
    return make_response(render_template_string(text), 404)


def decode_params_str(params_str):
    params = []
    match_e = re.match("=", params_str)
    match_a = match_e
    while(match_a):
        params.append(
            (params_str[:(match_e.pos)], params_str[(match_e.pos+1):])
        )
        match_a = re.match("&", params_str)
        if(not match_a):
            break
        params_str = params_str[(match_a.pos):]
        match_e = re.match("=", params_str)
    return params

def decode_subpath(subpath):
    url = {
        "subpath": "",
        "params_str": "",
        "params": []
    }
    # first we have to split the path and the search query
    search = index_of(subpath, "?")
    params = []
    params_str = ""
    if (search > -1):
        my_s = subpath
        subpath = my_s[:search:]
        params_str = my_s[search::]
        params = decode_params_str(params_str)
    # this else handles the case with no search query
    else:
        params_str = ""
    
    url["params"] = params
    url["params_str"] = params_str
    url["subpath"] = subpath
    return url


@app.route('/<path:subpath>')
def access_file(subpath):
    print("original path:", subpath)
    # url = decode_subpath(subpath)
    # subpath = url["subpath"]
    # print("subpath:", subpath)
    
    resp = "Response"
    
    # now if we no longer have a subpath due to cutting off a search query, we have to load the index.html
    o = True
    if (re.search("^(index(\\.html?)?)?$", subpath)):
        print("getting index...")
        resp = index()
        o = False
    text = ""
    if (subpath == "command"):
        o = False
    
    print("time to check thing ...")
    if ((not o) and exists(my_path + subpath)):
        bext = open(my_path + subpath, 'rb')
        text = bext.read()
    else:
        resp = page_not_found("")
    if (o):
        resp = make_response(text, 200, header)
    else:
        print("received command!")
    
    # print("params:", url["params"])
    
    return resp
    


app.run(host='0.0.0.0', port=8080)




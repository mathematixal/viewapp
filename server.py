import json
import os
from logging import getLogger
import datetime
from flask import Flask, request, redirect, Response
# import asyncio
import requests as rq
import traceback
import redis

LOGGER = getLogger(__name__)

class MsgServer(object):
    def __init__(self, static_url_path="/stf", static_url_dir="./frontend/dist/"):
        self.static_url_dir = static_url_dir
        self.static_url_path = static_url_path

        _f = Flask(__name__, static_url_path=self.static_url_path, static_folder=self.static_url_dir)
        print(_f, os.path.abspath(os.curdir))
        print(_f)

        self.f = self._init_flask(_f)



    def _init_flask(self, f):
        LOGGER.info("Starting up the flask...")

        @f.route('/')
        def _serve():
            return "ok", 200

        @f.route('/<path:path>')
        def _static_serve(path):
            return f.send_static_file(path)

        # @f.route('/postmsg', methods=['POST'])
        @f.route('/postmsg/<path:path>', methods=['GET'])
        def _post_to_redis(path):
            # msg = f.request.form['message']
            # user = session.get('user', 'none')
            now = datetime.datetime.now().replace(microsecond=0).time()
            # redis.publish('cct', f'{now.isoformat()}')
            r = redis.StrictRedis(host='localhost', port=6379)
            r.publish('cct', f'{now.isoformat()}:{path}')
            return "ok"

        @f.route('/stream')
        def stream():
            return Response(event_stream(), mimetype='text/event-stream')

        return f

        # @flask.route('/index.html')
        # def _redirect():
        #     static_url_path = self.static_url_path
        #     return redirect(f"{static_url_path}/index.html")



    def launch_server(self, host="localhost", port=8000):
        # print(f"Launching server on {host}:{port}")
        print(self.f)
        self.f.run(host=host, port=port, use_reloader=True, debug=True, threaded=True)

def event_stream():
    r = redis.StrictRedis(host='localhost', port=6379)
    pubsub = r.pubsub()
    pubsub.subscribe('cct')
    for message in pubsub.listen():
        print(message)
        yield 'data: {}\n\n'.format(message['data'])

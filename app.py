import os

from flask import (Flask, redirect, render_template, request,
                   send_from_directory, url_for)
from data import read_json

app = Flask(__name__)

@app.route('/')
def index():
   print('Request for index page received')
   data = read_json('static/json/offers.json')  # Use the function from data.py
   return render_template('index.html', data=data)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/clients')
def clients():
   print('Request for clients page received')
   data = read_json('static/json/clients.json')  # Use the function from data.py
   return render_template('clients.html', data=data)

@app.route('/new_offer_abacus')
def new_offer_abacus():
   print('Request for new offer page received')
   priceList = read_json('static/json/infoniqa_pricelist.json')
   return render_template('new_offer_abacus.html', priceList=priceList)

@app.route('/new_offer_infoniqa')
def new_offer_infoniqa():
   print('Request for new offer page received')
   priceList = read_json('static/json/infoniqa_pricelist.json')
   return render_template('new_offer_infoniqa.html', priceList=priceList)

if __name__ == '__main__':
   app.run()

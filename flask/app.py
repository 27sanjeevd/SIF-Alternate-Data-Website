from flask import Flask, send_file, request
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy as np
from pathlib import Path
import mysql.connector
import pandas as pd
import hashlib

app = Flask(__name__)

cnx = mysql.connector.connect(
    user="root",
    password="Centralroad12!",
    host="127.0.0.1",
    database="temp_database"
)

@app.route("/flight")
def flight():
    temp = request.args.get('options')
    options = []
    val1 = False
    if temp is not None:
        options = temp.split(',')
    else:
        val1 = True

    mycursor = cnx.cursor()
    mycursor.execute("SELECT country FROM flights")
    country1 = mycursor.fetchall()

    mycursor.execute("SELECT amount FROM flights")
    amount1 = mycursor.fetchall()

    mycursor.execute("SELECT time FROM flights")
    time1 = mycursor.fetchall()

    dict1 = {}

    for x in range(len(country1)):
        if country1[x] not in dict1.keys():
            dict1[country1[x]] = {}
        dict1[country1[x]][time1[x]] = amount1[x]
        
    for outside in dict1.keys():
        if not val1 and outside[0] in options:
            x = []
            y = []
            for inside in dict1[outside].keys():
                x.append(inside[0])
                y.append(dict1[outside][inside][0])

            df_x = pd.DataFrame(x, columns=['Time'])
            df_x['Time'] = pd.to_datetime(df_x['Time'])

            x1 = df_x['Time']


            hash_object = hashlib.sha256(outside[0].encode())
            hex_dig = hash_object.hexdigest()
            # Convert the hash to an RGB color
            r, g, b = int(hex_dig[:2], 16), int(hex_dig[2:4], 16), int(hex_dig[4:6], 16)
            color_map = '#{:02x}{:02x}{:02x}'.format(r, g, b)

            plt.plot(x1, y, color=color_map)

    plt.title("flights")
    plt.xticks(rotation=20)

    plt.savefig('/Users/sanjeevdevarajan/Documents/GitHub/SIF-Alternate-Data-Website/sif-website/src/components/plot5.png')
    plt.clf()

    return send_file("/Users/sanjeevdevarajan/Documents/GitHub/SIF-Alternate-Data-Website/sif-website/src/components/plot5.png", mimetype="image/png")

@app.route("/currency")
def currency():

    mycursor = cnx.cursor()

    mycursor.execute("SELECT * FROM currency_data")
    currency1 = mycursor.fetchall()

    dict1 = {}

    for row in currency1:
        for y in range(len(row) - 3):
            if y not in dict1:
                dict1[y] = {}

            dict1[y][row[7]] = row[y]

    for outside in dict1.keys():
        x = []
        y = []
        for inside in dict1[outside].keys():
            x.append(inside)
            y.append(dict1[outside][inside])

        plt.plot(x, y)

    plt.title("random plot")

    plt.savefig('/Users/sanjeevdevarajan/Documents/GitHub/SIF-Alternate-Data-Website/sif-website/src/components/plot5.png')
    plt.clf()

    return send_file("/Users/sanjeevdevarajan/Documents/GitHub/SIF-Alternate-Data-Website/sif-website/src/components/plot5.png", mimetype="image/png")


if __name__ == '__main__':
    app.run()
from flask import Flask, send_file
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path
import mysql.connector

app = Flask(__name__)

cnx = mysql.connector.connect(
    user="root",
    password="Centralroad12!",
    host="127.0.0.1",
    database="temp_database"
)


@app.route("/plot")
def plot():

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
        x = []
        y = []
        for inside in dict1[outside].keys():
            x.append(inside[0])
            y.append(dict1[outside][inside][0])

        plt.plot(x, y)
    
    plt.title("random plot")

    plt.savefig('/Users/sanjeevdevarajan/Documents/GitHub/SIF-Alternate-Data-Website/sif-website/src/components/plot5.png')
    plt.clf()

    return send_file("/Users/sanjeevdevarajan/Documents/GitHub/SIF-Alternate-Data-Website/sif-website/src/components/plot5.png", mimetype="image/png")



if __name__ == '__main__':
    app.run()
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Purchases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Purchase made on {self.date} for the amount of {self.amount}>'
    

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Welcome to the Flask Backend"

if __name__ == '__main__':
    app.run(debug=True)


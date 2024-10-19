from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import func

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Purchases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(20))
    name = db.Column(db.String(100))

    def __repr__(self):
        return f'<Purchase: {self.name}, made on {self.date} for the amount of {self.amount}>'
    

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Welcome to the Flask Backend"





#All 'POST' methods
@app.route('/budget', methods=['POST'])
def addPurchase():
    purchaseData = request.json
    new_purchase = Purchases(amount=purchaseData['amount'], date=purchaseData['date'], name=purchaseData['name'])
    db.session.add(new_purchase)
    db.session.commit()

    return jsonify({'message': 'Task created', 'id': new_purchase.id}), 201




#All 'GET' methods
@app.route('/budget', methods=['GET'])
def getPurchases():
    tableData = Purchases.query.all()
    return jsonify([{ 'amount': purchase.amount, 'date': purchase.date, 'name': purchase.name, 'id': purchase.id} for purchase in tableData]), 200


@app.route('/budget/money', methods=['GET'])
def getMoneyValues():
    tableData = db.session.query(func.sum(Purchases.amount)).scalar()
    return jsonify({'amount': tableData})



#All 'DELETE' methods
@app.route('/budget', methods=['DELETE'])
def delPurchases():
    try:
        delData = Purchases.query().delete()
        db.session.commit()
        return jsonify({'message': f'{delData} tasks removed.'}), 200
    except Exception as e:
        return jsonify({'message': 'Error during deletion: ' + str(e)}), 500
    
@app.route('/budget/<int:id>', methods=['DELETE'])
def delSpecificPurchase(id):
    try:
        delData = Purchases.query.get(id)
        db.session.delete(delData)
        db.session.commit()
        return jsonify({'message': f'{delData} tasks removed.'}), 200
    except Exception as e:
        return jsonify({'message': 'Error during deletion: ' + str(e)}), 500
    




@app.route('/budget/<int:id>', methods=['PATCH'])
def updatePurchase(id):
    purchase = Purchases.query.get(id)
    if(purchase):
        data = request.json
        purchase.amount = data.get('amount', purchase.amount)
        purchase.date = data.get('date', purchase.date)
        purchase.name = data.get('name', purchase.name)

        db.session.commit()
        return jsonify({'message': 'Purchase has been updated'}), 200
    else:
        return jsonify({'message': 'That id is not in the table'}), 404

    




if __name__ == '__main__':
    app.run(debug=True)


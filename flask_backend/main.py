from flask import Flask, jsonify, request
import flask
from flask_pymongo import PyMongo
import json
import ast
from bson.objectid import ObjectId
from bson.json_util import dumps, loads #used to convert Python MongoDB JSON to/from BSON
#pip install Flask Flask-PyMongo
#Example API URL: http://127.0.0.1:5000/response/5d9e2b8e1c9d440000ef192c

app = flask.Flask("__main__")

app.config['MONGO_DBNAME'] = 'Platform'
app.config['MONGO_URI'] = 'mongodb+srv://testUser:testUserUltimate3@ultimatesurvey-74jff.mongodb.net/' + 'Platform' +'?retryWrites=true&w=majority'
mongo = PyMongo(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all_urls(path):
    return flask.render_template("index.html")




#TODO - implement
def survey_replace_questions(surveys):
	#Helper Function
	#queries database for each question_id and replace the object pointer with the question object
	return surveys

def array_survey_replace_questions(array_surveys):
	#Helper Function
	x = 0
	while(x < len(array_surveys)):
		array_surveys[x] = survey_replace_questions(array_surveys[x])
		x = x+1
	return array_surveys



#FOR TESTING
#Get User ID - in the database, Stephany is the manager of Deangelo - there is a survey created and a response in the database
@app.route('/user/<email>', methods=['GET'])
def get_user_id(email):
	user_dictionary = {'Deangelo_Durham@bluesorbetsecurity.com': '5d9f7051269df83d214204b4',
						'Stephany_Knox@bluesorbetsecurity.com':"5d9f7051269df83d214204b0"}
	return user_dictionary[email]



#EMPLOYEEE ----------------------------------------------------------

#GET - return a list of all responses for a certain employeeid
#POST - pushes a response to the database
	#example post request - {"surveyid":"5d9e2dea1c9d440000ef1937","answers":["Nice",4]}
@app.route('/response/<user_id>', methods=['GET', 'POST'])
def user_response(user_id):
	if flask.request.method == 'GET':
		responses = mongo.db.Responses
		cursor_query= responses.find({"employeeid":ObjectId(user_id)})
		if cursor_query is None:
			return []
		else:
			return dumps(list(cursor_query))
	elif flask.request.method == 'POST':
		#TODO - implement POST response
		responses = mongo.db.Responses
		body = request.json
		_surveyid = ObjectId(body['surveyid'])
		_answers = body['answers']
		_employeeid = ObjectId(user_id)

		object_id = responses.insert({'surveyid': _surveyid, 'answers':_answers, 'employeeid':_employeeid})
		return "Inserted Response for Employee " + str(user_id) 

	else:
		return ""

#GET - return a list of all surveys available to a employee
@app.route('/survey/employee/<user_id>', methods=['GET'])
def user_survey(user_id):
	if flask.request.method == 'GET':
		surveys = mongo.db.Surveys
		cursor_query = surveys.find({'Employees':ObjectId(user_id)})
		if cursor_query is None:
			return []
		else:
			return dumps(array_survey_replace_questions(list(cursor_query)))
	else:
		return ""
		#TODO - implement POST



#MANAGER ----------------------------------------------------------------

#GET - return a list of all surveys created by a manager
#POST - submit a new survey
@app.route('/survey/manager/<manager_id>', methods=['GET', 'POST'])
def get_created_surveys(manager_id):
	if flask.request.method == 'GET':
		surveys = mongo.db.Surveys
		cursor_query = surveys.find({"manager":ObjectId(manager_id)}) #we will need to join question objects here, I'm thinking a function that queries for all the needed questions and replaces each index of the questions array with the proper object, will need this to get single surveys too
		if cursor_query is None:
			return []
		else:
			return ast.literal_eval(dumps(array_survey_replace_questions(list(cursor_query))))
	else:
		#TODO - implement POST
		return ''

@app.route('/responses/<survey_id>', methods=['GET'])
def get_survey_respones(survey_id):
	responses = mongo.db.Responses
	cursor_query = responses.find({'surveyid': ObjectId(survey_id)})
	if cursor_query is None:
		return []
	else:
		return dumps(list(cursor_query))


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import joblib
import pandas as pd
from bson.json_util import dumps


app = Flask(__name__ )
CORS(app,resources={r"/*":{"origins":"*"}})

# Configure MongoDB connection
app.config['MONGO_URI'] = "mongodb+srv://mahammasood2001:MPZoHzPLMS84Pu9e@cluster0.51ggakp.mongodb.net/TalentTrek?retryWrites=true&w=majority"
mongo = PyMongo(app)





# Load the trained model
model = joblib.load('personality_predictor.joblib')

# Load career data
career_data = pd.read_csv('PersonalityCareers.csv')

# Load the CSV file containing universities and degrees
universities_data = pd.read_csv('degrees_information.csv')





# Dictionary to store universities offering each degree
degree_universities = {}

# Iterate over each row in universities data
for index, row in universities_data.iterrows():
    degree = row['Degree']
    university = row['University']
    city = row['City']
    duration = row['Degree Duration']
    fee = row['Fee']
    contact_number = row['Contact Number']
    email = row['Email']
    url = row['URL']
    address = row['Address']
    
    # If degree already exists in the dictionary, append university along with additional information
    if degree in degree_universities:
        if university not in degree_universities[degree]:
            degree_universities[degree].append((university, city, duration, fee, contact_number, email, url, address))
    else:
        # If degree doesn't exist, create a new list with the university along with additional information
        degree_universities[degree] = [(university, city, duration, fee, contact_number, email, url, address)]

# Function to display universities for a given degree along with additional information
def get_universities(degree):
    universities = []
    if degree in degree_universities:
        for uni_info in degree_universities[degree]:
            university, city, duration, fee, contact_number, email, url, address = uni_info
            universities.append({
                'university': university,
                'city': city,
                'degree_duration': duration,
                'fee': fee,
                'contact_number': contact_number,
                'email': email,
                'url': url,
                'address': address
            })
    return universities









# Predict universities api
@app.route('/predict-career-universities', methods=['GET'])
def predict_career_universities():
    try:
        # Get data from the request
        #data = request.get_json()
        # Fetch user data from MongoDB based on email
        user_data = mongo.db.User.find_one({'email': 'minal123@gmail.com'})

        # Log the fetched user data
        print("Fetched user data:", user_data)
  
        if not user_data:
            return jsonify({'error': 'User not found'})

        # Extract features from the questionnaireResults field
        features = [user_data['questionnaireResults'][key] for key in sorted(user_data['questionnaireResults'])]

        # Make predictions using the loaded model
        predictions = model.predict([features])

        # Assuming your model returns personality1 and personality2
        personality1 = predictions[0][0]
        personality2 = predictions[0][1]



        # Filter out the careers for the first personality type
        careers_personality1 = career_data[career_data['personality'] == personality1]['careers'].tolist()

        # Filter out the careers for the second personality type
        careers_personality2 = career_data[career_data['personality'] == personality2]['careers'].tolist()

        # Concatenate careers from both personality types into a single list
        all_careers = list(set(careers_personality1 + careers_personality2))

       

        # Prepare response data
        response = {
            'personality1': {
                'personality': personality1,
                'recommended_careers': careers_personality1,
                'recommended_universities': {career: get_universities(career) for career in careers_personality1}
            },
            'personality2': {
                'personality': personality2,
                'recommended_careers': careers_personality2,
                'recommended_universities': {career: get_universities(career) for career in careers_personality2}
            }
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})






if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
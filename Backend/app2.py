from flask import Flask, jsonify, request
import pandas as pd
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('personality_predictor.joblib')

# Load career data
career_data = pd.read_csv('PersonalityCareers.csv')

# Read the Excel file containing study areas
study_areas_data = pd.read_excel('Degrees_Data.xlsx')

@app.route('/predict-careerrrrr', methods=['GET'])
def predict_career():
    try:

       # Predict personality types
        predictions = model.predict([[1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,0]])

        personality1 = predictions[0][0]
        personality2 = predictions[0][1]

        # Filter out the careers for the first personality type
        careers_personality1 = career_data[career_data['personality'] == personality1]['careers']

        # Filter out the careers for the second personality type
        careers_personality2 = career_data[career_data['personality'] == personality2]['careers']

        # Merge careers data with study areas data for the first personality type
        merged_data_personality1 = pd.merge(careers_personality1, study_areas_data, left_on='careers', right_on='Degree_Title', how='left')

        # Merge careers data with study areas data for the second personality type
        merged_data_personality2 = pd.merge(careers_personality2, study_areas_data, left_on='careers', right_on='Degree_Title', how='left')

        return jsonify({
            'personality1': {
                'personality': personality1,
                'recommended_careers': merged_data_personality1[['careers', 'Study_Area']].to_dict(orient='records'),
            },
            'personality2': {
                'personality': personality2,
                'recommended_careers': merged_data_personality2[['careers', 'Study_Area']].to_dict(orient='records'),
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

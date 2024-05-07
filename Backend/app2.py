from flask import Flask, jsonify, request
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

app = Flask(__name__)

# Load the trained model
model = joblib.load('personality_predictor.joblib')

# Load career data
career_data = pd.read_csv('PersonalityCareers.csv')

# Read the Excel file containing study areas
study_areas_data = pd.read_excel('Degrees_Data.xlsx')

# @app.route('/predict-careerrrrr', methods=['GET'])
# def predict_career():
#     try:

#        # Predict personality types
#         predictions = model.predict([[1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,0]])

#         personality1 = predictions[0][0]
#         personality2 = predictions[0][1]

#         # Filter out the careers for the first personality type
#         careers_personality1 = career_data[career_data['personality'] == personality1]['careers']

#         # Filter out the careers for the second personality type
#         careers_personality2 = career_data[career_data['personality'] == personality2]['careers']

#         # Merge careers data with study areas data for the first personality type
#         merged_data_personality1 = pd.merge(careers_personality1, study_areas_data, left_on='careers', right_on='Degree_Title', how='left')

#         # Merge careers data with study areas data for the second personality type
#         merged_data_personality2 = pd.merge(careers_personality2, study_areas_data, left_on='careers', right_on='Degree_Title', how='left')

#         return jsonify({
#             'personality1': {
#                 'personality': personality1,
#                 'recommended_careers': merged_data_personality1[['careers', 'Study_Area']].to_dict(orient='records'),
#             },
#             'personality2': {
#                 'personality': personality2,
#                 'recommended_careers': merged_data_personality2[['careers', 'Study_Area']].to_dict(orient='records'),
#             }
#         })
#     except Exception as e:
#         return jsonify({'error': str(e)})




# Load the dataset
data = pd.read_csv("PreviousTrendingCareers.csv")  # Replace "PreviousTrendingCareers.csv" with the actual file path
# Get unique career labels from the dataset
unique_career_labels_before = data["career"].unique()

# Generate career label mapping dynamically
career_mapping = {career_label: idx + 1 for idx, career_label in enumerate(unique_career_labels_before)}

# Replace non-numeric career labels with numeric labels using map
data["career"] = data["career"].map(career_mapping)

# Create features and target variable
features = ["year"]
target = "career"

# Define preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['year']),  # Scale numerical features
    ],
    remainder='passthrough'  # Pass through any remaining columns
)

# Define the model
model = RandomForestClassifier(random_state=42)

# Create the pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', model)
])

# Fit the pipeline on the entire data
pipeline.fit(data[features], data[target])

@app.route('/predictTrends', methods=['GET'])
def predict():
    #if request.method == 'GET':
        # Get the input year from the request data
        # input_data = request.get_json()
        # year = input_data['year']
        
        # Make predictions for the input year
        new_data = pd.DataFrame({"year": [2025]})
        probabilities = pipeline.predict_proba(new_data)
        
        # Get the top 20 predicted careers
        top_15_indices = probabilities.argsort()[0][-20:][::-1]
        top_20_careers = [unique_career_labels_before[idx] for idx in top_15_indices]
        
        # Prepare the response
        response = {
            "predictions": top_20_careers
        }
        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

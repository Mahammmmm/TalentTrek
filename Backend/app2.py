from flask import Flask, jsonify, request
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split

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




data = pd.read_csv("PakistanCareers.csv")  

# Engineering features for ranking and repeatedness
career_counts = data['career'].value_counts()
data['career_rank'] = data['career'].map({career: rank for rank, career in enumerate(career_counts.index, 1)})
data['career_frequency'] = data['career'].map(career_counts)

# Create features and target variable
features = ["year", "career_rank", "career_frequency"]
target = "career"

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(data[features], data[target], test_size=0.2, random_state=42)

# Define preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['year', 'career_rank', 'career_frequency']),  # Scale numerical features
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

# Fit the pipeline on the training data
pipeline.fit(X_train, y_train)

@app.route('/predictTrends', methods=['GET'])
def predictCareers():
    # Create new data for prediction
    new_data = pd.DataFrame({"year": [2025], "career_rank": [21], "career_frequency": [1]})

    # Make predictions for the new data
    probabilities = pipeline.predict_proba(new_data)

    # Get the top 20 predicted careers
    top_20_indices = probabilities.argsort()[0][-20:][::-1]
    top_20_careers = [data['career'].unique()[career_idx - 1] for career_idx in top_20_indices]

    # Prepare the response
    response = {
        "top_20_careers": top_20_careers
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)

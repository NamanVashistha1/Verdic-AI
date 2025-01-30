import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error

# Load the dataset
df = pd.read_csv("legal_case_data.csv")

# One-hot encode categorical features
encoder = OneHotEncoder(drop='first', sparse_output=False)
categorical_features = df[['Case Type', 'Complexity', 'State']]
categorical_encoded = encoder.fit_transform(categorical_features)
categorical_columns = encoder.get_feature_names_out(['Case Type', 'Complexity', 'State'])

# Create final dataset
X = pd.DataFrame(categorical_encoded, columns=categorical_columns)
y_hours = df['Hours Required']
y_cost = df['Cost']

# Split data into training and testing sets
X_train, X_test, y_hours_train, y_hours_test = train_test_split(X, y_hours, test_size=0.2, random_state=42)
X_train, X_test, y_cost_train, y_cost_test = train_test_split(X, y_cost, test_size=0.2, random_state=42)

# Train the regression models
model_hours = LinearRegression()
model_hours.fit(X_train, y_hours_train)

model_cost = LinearRegression()
model_cost.fit(X_train, y_cost_train)

# Predictions
y_hours_pred = model_hours.predict(X_test)
y_cost_pred = model_cost.predict(X_test)

# Evaluate model performance
print("Hours Required Prediction:")
print("R² Score:", r2_score(y_hours_test, y_hours_pred))
print("Mean Absolute Error:", mean_absolute_error(y_hours_test, y_hours_pred))

print("\nCost Prediction:")
print("R² Score:", r2_score(y_cost_test, y_cost_pred))
print("Mean Absolute Error:", mean_absolute_error(y_cost_test, y_cost_pred))

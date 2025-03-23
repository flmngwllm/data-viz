import pandas as pd
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status

class UploadDatasetView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']

        try:
            # Read the file into a Pandas DataFrame
            df = pd.read_csv(file)

            # Check if there are any numeric columns
            numeric_df = df.select_dtypes(include=['number'])
            if numeric_df.empty:
                return Response({"error": "No numeric data found in the file"}, status=status.HTTP_400_BAD_REQUEST)

            # Calculate summary statistics for all numeric columns
            summary = {
                'mean': numeric_df.mean().to_dict(),
                'median': numeric_df.median().to_dict(),
                'std': numeric_df.std().to_dict(),
            }

            # Return the processed data
            return Response(summary, status=status.HTTP_200_OK)

        except Exception as e:
            # Handle errors (e.g., invalid file format)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
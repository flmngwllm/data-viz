from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework import status
from .models import Dataset

# Create your views here.
import pandas as pd
import numpy as np
from .models import Dataset

class UploadDatasetView(APIView):
    parser_classes = (MultiPartParser)

    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({'error' : "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        dataset = Dataset(name=file.name, file=file)
        dataset.save()

        df = pd.read_csv(dataset.file)
        summary = {
            'mean': df.mean().to_dict(),
            'median': df.median().to_dict(),
            'std': df.std().to_dict(),
        }

        return Response(summary, status=status.HTTP_200_OK)
    
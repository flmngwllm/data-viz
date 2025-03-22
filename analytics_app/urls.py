from django.urls import path
from .views import UploadDatasetView

# URL patterns for the anallytics app
urlpatterns = [
    path('api/upload/', UploadDatasetView.as_view(), name='upload_dataset'),
]
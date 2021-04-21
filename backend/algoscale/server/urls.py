from django.urls import path,re_path
from server import views

urlpatterns = [
    path('saveData/', views.ContactUsView.as_view(), name='saveData'),
    path('getData/', views.GetDataView.as_view(), name='getData'),
]
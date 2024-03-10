from django.urls import path
from . import views

urlpatterns = [
    path('students/signup/',views.CreateStudent),
    path('students/',views.GetStudentList),
    path('students/<int:id>/',views.GetStudentById),
    path('students/login/',views.StudentLogin),
    path('firstquiz/',views.FistQuizView),
]
from django.urls import path
from . import views

urlpatterns = [
    path('students/signup/',views.CreateStudent),
    path('students/',views.GetStudentList),
    path('students/<int:id>/',views.GetStudentById),
    path('students/login/',views.StudentLogin),
    path('firstquiz/',views.FistQuizView),
    path('courses/',views.GetCourses),
    path('course/<int:cid>/lessons/',views.GetLessons),
    path('course/<int:cid>/lesson/<int:lid>',views.GetLessonById),
    path('course/<int:cid>/lesson/<int:lid>/material',views.GetLessonMaterial),
    path('course/<int:cid>/lesson/<int:lid>/quiz',views.QuestionnaireView)
]
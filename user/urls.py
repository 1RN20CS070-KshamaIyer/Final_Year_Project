from django.urls import path
from . import views

urlpatterns = [
    path('students/signup/',views.CreateStudent),
    path('students/',views.GetStudentList),
    path('students/<int:id>/',views.GetStudentById),
    path('students/login/',views.StudentLogin),
    path('student/<int:id>/firstquiz/',views.FistQuizView),
    path('student/<int:id>/courses/',views.GetCourses),
    path('student/<int:id>/course/enroll',views.EnrollStudent),
    path('student/<int:id>/course/<int:cid>/lessons/',views.LessonsView),
    path('student/<int:id>/course/<int:cid>/lesson/<int:lid>',views.GetLessonById),
    path('student/<int:id>/course/<int:cid>/lesson/<int:lid>/material',views.GetLessonMaterial),
    path('student/<int:id>/course/<int:cid>/lesson/<int:lid>/quiz',views.QuestionnaireView)
]
from django.contrib import admin
from .models import Student,Client,Course,Lesson,Material,FirstQuiz,Questionnaire,MaterialProgress,CourseProgress,LessonProgress
# Register your models here.

admin.site.register(Student)
admin.site.register(Client)
admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(Material)
admin.site.register(FirstQuiz)
admin.site.register(Questionnaire)
admin.site.register(MaterialProgress)
admin.site.register(CourseProgress)
admin.site.register(LessonProgress)
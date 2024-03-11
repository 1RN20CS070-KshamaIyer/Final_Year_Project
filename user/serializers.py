from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ['pwd','learnstyle']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id','email','pwd','clientname']

class FirstQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstQuiz
        fields = ['id','question','choice1','choice2','choice3','choice4']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id','coursename','coursedescription','clientid']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id','lessonname','lessondescription','courseid']

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id','visual','auditory','reading','difficulty','lessonid']

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['id','question','choice1','choice2','choice3','choice4','answer','difficulty','lessonid','materialid']

class MaterialProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialProgress
        fields = ['id','notattempted','inprogress','completed','studentid','lessonid','materialid']

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseProgress
        fields = ['id','progress','studentid','courseid']

class FeedbackSerializer(serializers.ModelSerializer):
    mood = serializers.CharField(max_length=65535)
    studentid = serializers.IntegerField()


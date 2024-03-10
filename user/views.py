from django.http import JsonResponse
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.
@api_view(['GET'])
def GetStudentList(request):
    student=Student.objects.all()
    serializer=StudentSerializer(student,many=True)
    return JsonResponse({'students': serializer.data})

@api_view(['POST'])
def CreateStudent(request):
    serializer = StudentSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response('Student created successfully',status=200)
    else:
        return Response(serializer.errors, status=400)

@api_view(['POST'])
def StudentLogin(request):
    serializer = StudentSerializer(data=request.data)
    
    username = serializer.initial_data['username']
    pwd = serializer.initial_data['pwd']

    try:
        student = Student.objects.get(username=username)  # Attempt to retrieve student
        if student.pwd == pwd:
            return Response("Student Login Successful", status=status.HTTP_200_OK)
        else:
            return Response('Wrong password', status=status.HTTP_401_UNAUTHORIZED)
    except ObjectDoesNotExist:
        return Response("Student username does not exist", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def GetStudentById(request,id):
    student=Student.objects.get(id=id)
    serializer=StudentSerializer(student)
    return JsonResponse(serializer.data)

@api_view(['GET','POST'])
def FistQuizView(request):
    if request.method == 'GET':
        firstQuiz = FirstQuiz.objects.all()
        serializer=FirstQuizSerializer(firstQuiz,many=True)
        return JsonResponse({'firstquiz': serializer.data})
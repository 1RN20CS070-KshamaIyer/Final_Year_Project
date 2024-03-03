from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .serializers import *
from rest_framework.decorators import api_view



# Create your views here.
@api_view(['GET'])
def GetStudentList(request):
    student=Student.objects.all()
    serializer=StudentSerializer(student,many=True)
    return JsonResponse({'students': serializer.data})


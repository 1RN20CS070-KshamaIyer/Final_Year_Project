from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .serializers import *
from rest_framework.decorators import api_view



# Create your views here.
@api_view(['GET','POST'])
def student_list(request):
    if request.method == 'GET':
        student=Student.objects.all()
        serializer=StudentSerializer(student,many=True)
        return JsonResponse({'student': serializer.data})


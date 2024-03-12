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

@api_view(['GET'])
def GetCourses(request):
    course=Course.objects.all()
    serializer=CourseSerializer(course,many=True)
    return JsonResponse({'courses': serializer.data})

@api_view(['GET'])
def GetLessons(request,cid):
    lessons=Lesson.objects.filter(courseid=cid)
    serializer=LessonSerializer(lessons,many=True)
    return JsonResponse({'lessons': serializer.data})

@api_view(['GET'])
def GetLessonById(request,cid,lid):
    lesson=Lesson.objects.filter(id=lid,courseid=cid)
    serializer=LessonSerializer(lesson,many=True)
    return JsonResponse({'lesson': serializer.data})

@api_view(['GET'])
def GetLessonMaterial(request,cid,lid):
    material=Material.objects.filter(lessonid=lid)
    serializer=MaterialSerializer(material,many=True)
    return JsonResponse({'material': serializer.data})

@api_view(['GET', 'POST'])
def QuestionnaireView(request, cid, lid):
    if request.method == 'GET':
        # Retrieve the next question based on the user's progress
        quiz_question = get_next_question_for_user(request.user.id, cid, lid)
        serializer = QuestionnaireSerializer(quiz_question)
        return Response({'question': serializer.data})

    elif request.method == 'POST':
        # Process the user's response and get the next question
        user_answer = request.data.get('user_answer')
        next_question, is_correct = process_user_response(request.user.id, cid, lid, user_answer)

        if next_question is not None:
            serializer = QuestionnaireSerializer(next_question)
            return Response({'question': serializer.data, 'is_correct': is_correct})
        else:
            # Quiz completed, calculate and return the total score
            total_score = calculate_total_score(request.user.id, cid, lid)
            return Response({'message': 'Quiz completed', 'total_score': total_score})

def get_next_question_for_user(user_id, cid, lid):
    # Implement logic to get the next question based on the user's progress
    # For example, retrieve the next question with increasing difficulty levels
    last_answered_question = get_last_answered_question(user_id, cid, lid)

    if last_answered_question:
        difficulty_order = ['easy', 'medium', 'hard']  # Adjust as needed
        current_difficulty = last_answered_question.difficulty
        next_difficulty_index = (difficulty_order.index(current_difficulty) + 1) % len(difficulty_order)
        next_difficulty = difficulty_order[next_difficulty_index]

        next_question = Questionnaire.objects.filter(lesson_id=lid, difficulty=next_difficulty).first()
        return next_question

    # If there's no last answered question, start with an easy question
    return get_first_question_for_user(user_id, cid, lid)
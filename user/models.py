from django.db import models

# Create your models here.
class Student(models.Model):
    email = models.CharField(max_length=1000)
    pwd = models.CharField(max_length=65535)
    username = models.CharField(max_length=1000,unique=True)
    learnstyle = models.CharField(max_length=1000)

    def __str__(self) -> str:
        return self.username

class Client(models.Model):
    email = models.CharField(max_length=1000)
    pwd = models.CharField(max_length=65535)
    clientname = models.CharField(max_length=1000,unique=True)

    def __str__(self) -> str:
        return self.clientname

class FirstQuiz(models.Model):
    question = models.CharField(max_length=2000)
    choice1 = models.CharField(max_length=1000)
    choice2 = models.CharField(max_length=1000)
    choice3 = models.CharField(max_length=1000)
    choice4 = models.CharField(max_length=1000)

    def __str__(self) -> str:
        return self.question

class Course(models.Model):
    coursename = models.CharField(max_length=1000,unique=True)
    coursedescription = models.CharField(max_length=65535)
    clientid = models.ForeignKey(Client, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.coursename

class Lesson(models.Model):
    lessonname = models.CharField(max_length=1000)
    lessondescription = models.CharField(max_length=65535)
    courseid = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self) -> str:
       return self.lessonname

class Material(models.Model):
    visual = models.CharField(max_length=65535)
    auditory = models.CharField(max_length=65535)
    reading = models.CharField(max_length=65535)
    difficulty = models.CharField(max_length=1000)
    lessonid = models.ForeignKey(Lesson, on_delete=models.CASCADE)

    def __str__(self) -> str:
       return self.difficulty

class Questionnaire(models.Model):
    question = models.CharField(max_length=65535)
    choice1 = models.CharField(max_length=1000)
    choice2 = models.CharField(max_length=1000)
    choice3 = models.CharField(max_length=1000)
    choice4 = models.CharField(max_length=1000)
    answer = models.CharField(max_length=65535)
    difficulty = models.CharField(max_length=1000)
    lessonid = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    materialid = models.ForeignKey(Material, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.question

class MaterialProgress(models.Model):
    notattempted = models.BooleanField()
    inprogress = models.BooleanField()
    completed = models.BooleanField()
    studentid = models.ForeignKey(Student, on_delete=models.CASCADE)
    lessonid = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    materialid = models.ForeignKey(Material, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.studentid


class Progress(models.Model):
    progress = models.DecimalField(decimal_places=2,max_digits=3)
    studentid = models.ForeignKey(Student, on_delete=models.CASCADE)
    courseid = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.studentid+' '+self.progress

class Feedback(models.Model):
    mood = models.CharField(max_length=65535)
    studentid = models.ForeignKey(Student, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.studentid+' '+self.mood
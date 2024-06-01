from django.shortcuts import render
from .models import Task


def task_list(request):
    tasks = Task.objects.all()
    return render(request, 'tasks/task_list.html', {'tasks': tasks})


def task_create(request):
    return 


def task_update(request, pk):
    return 


def task_delete(request, pk):
    return 

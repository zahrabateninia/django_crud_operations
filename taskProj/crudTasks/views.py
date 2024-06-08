from django.http import JsonResponse
from django.urls import reverse
from django.shortcuts import render, get_object_or_404, redirect
from .models import Task
from .forms import TaskForm

# List all tasks
def task_list(request):
    tasks = Task.objects.all()
    return render(request, 'tasks/task_list.html', {'tasks': tasks})

def task_create(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            new_task = form.save()
            return JsonResponse({'success': True, 'redirect': reverse('task_list')})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
    else:
        form = TaskForm()
        return render(request, 'tasks/task_form.html', {'form': form})
    
def task_update(request, pk):
    task = get_object_or_404(Task, pk=pk)
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            updated_task = form.save()
            return JsonResponse({'success': True, 'task': {'id': updated_task.id, 'title': updated_task.title, 'description': updated_task.description}})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
    else:
        form = TaskForm(instance=task)
        return render(request, 'tasks/task_form.html', {'form': form})

def task_delete(request, pk):
    task = get_object_or_404(Task, pk=pk)
    if request.method == 'POST':
        task.delete()
        return JsonResponse({'success': True})
    else:
        return render(request, 'tasks/task_confirm_delete.html', {'task': task})

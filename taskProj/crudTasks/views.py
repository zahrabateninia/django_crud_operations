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
            form.save() # save the new task to the db
            return redirect('task-list')
    else:
        form = TaskForm() # It creates an empty form instance if the request method is not POST.
    return render(request, 'tasks/task_form.html', {'form': form})

def task_update(request, pk):
    # Retrieve the task with the given primary key (pk), or return a 404 error if it doesn't exist.
    task = get_object_or_404(Task, pk=pk)
    if request.method == 'POST':
        # Bind form data to the existing task instance.
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('task-list')
    else:
        #  Create a form pre-filled with the task's data if the request method is not POST.
        form = TaskForm(instance=task)
    return render(request, 'tasks/task_form.html', {'form': form})

def task_delete(request, pk):
    task = get_object_or_404(Task, pk=pk)
    if request.method == 'POST':
        task.delete()
        return redirect('task-list')
    #  Render a confirmation page before deleting the task.
    return render(request, 'tasks/task_confirm_delete.html', {'task': task})

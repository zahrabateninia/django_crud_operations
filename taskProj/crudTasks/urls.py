from django.urls import path, include
from .views import task_list, task_create, task_update, task_delete


urlpatterns = [
    # Map the root URL of the tasks/ path to the task_list view, which will display the list of tasks.
    path('', task_list, name='task-list'),
    # Map the tasks/create/ path to the task_create view, which will display a form to create a new task.
    path('create/', task_create, name='task-create'),
    # Map the tasks/update/<int:pk>/ path to the task_update view, which will display a form to update an existing task.
    path('update/<int:pk>/', task_update, name='task-update'),
    # It display a confirmation page to delete a task.
    path('delete/<int:pk>/', task_delete, name='task-delete'),
]


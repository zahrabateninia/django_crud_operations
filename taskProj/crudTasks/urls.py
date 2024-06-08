from django.contrib import admin
from django.urls import path, include
from django.urls import path
from .import views
from .views import task_list, task_create, task_update, task_delete

urlpatterns = [
    # Map the root URL of the tasks/ path to the task_list view, which will display the list of tasks.
    path('', views.task_list, name='task_list'),
    path('create/', views.task_create, name='task_create'),
    path('update/<int:pk>/', views.task_update, name='task_update'),
    path('delete/<int:pk>/', views.task_delete, name='task_delete'),
]


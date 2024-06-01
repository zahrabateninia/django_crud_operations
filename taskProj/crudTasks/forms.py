from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task  
        fields = ['title', 'description', 'due_date', 'is_completed']  
        labels = {
            'title': 'Task Title',
            'description': 'Task Description',
            'due_date': 'Due Date',
            'is_completed': 'Completed',
        }
        help_texts = {
            'title': 'Enter the title of the task.',
            'description': 'Enter a detailed description of the task.',
        }
        widgets = {
            'due_date': forms.DateTimeInput(attrs={'class': 'datetimepicker'}),
        }
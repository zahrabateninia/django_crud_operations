from django.contrib import admin
# register Task model:
from .models import Task


admin.site.register(Task)
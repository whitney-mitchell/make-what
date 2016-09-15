from django.contrib.auth.models import User
from django.http import HttpResponse
# from django.views import generic
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

import json

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from makeWhatApi.models import Projects, Supplies, Types, MakersProjects, SuppliesProjects, TypesProjects
from makeWhatApi.serializers import *

# The Generic View that now relies on Angular to do the rest.
# class IndexView(generic.TemplateView):
# 	template_name = 'index.html'

class UsersList(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UsersSerializer

class ProjectsList(viewsets.ModelViewSet):
	model = Projects
	queryset = Projects.objects.all()
	serializer_class = ProjectsSerializer

class SuppliesList(viewsets.ModelViewSet):
	model = Supplies
	queryset = Supplies.objects.all()
	serializer_class = SuppliesSerializer

class TypesList(viewsets.ModelViewSet):
	model = Types
	queryset = Types.objects.all()
	serializer_class = TypesSerializer

class MakersProjectsList(viewsets.ModelViewSet):
	model = MakersProjects
	queryset = MakersProjects.objects.all()
	serializer_class = MakersProjectsSerializer

class SuppliesProjectsList(viewsets.ModelViewSet):
	model = SuppliesProjects
	queryset = SuppliesProjects.objects.all()
	serializer_class = SuppliesProjectsSerializer

class TypesProjectsList(viewsets.ModelViewSet):
	model = TypesProjects
	queryset = TypesProjects.objects.all()
	serializer_class = TypesProjectsSerializer



###### User registration and log in below ######
@csrf_exempt
def register_user(request):
	'''Handles the creation of a new user for authentication

	Method arguments:
		request -- The full HTTP request object
	'''

	print(request.body)

	# Load the JSON string of the request body into a dict
	request_content = json.loads(request.body.decode())

	# Create a new user by invoking the `create_user` helper method
	# on Django's built-in User model
	new_user = User.objects.create_user(
			username=request_content['username'],
			password=request_content['password'],
			email=request_content['email'],
			first_name=request_content['first_name'],
			last_name=request_content['last_name'],
			)

	# Commit the user to the database by saving it
	new_user.save()

	# Invoke the login_user method and return its response to the client
	return login_user(request)



def login_user(request):
	'''Handles the creation of a new user for authentication

	Method arguments:
		request -- The full HTTP request object
	'''

	# Load the JSON string of the request body into a dict
	request_content = json.loads(request.body.decode())

	# Use the built-in authenticate method to verify
	authenticated_user = authenticate(
		username=request_content['username'],
		password=request_content['password']
		)

	# If authentication was successful, log the user in
	success = True
	if authenticated_user is not None:
		login(request=request, user=authenticated_user)
	else:
		success = False

	# Data becomes a json object, with one key:value pair
	data = json.dumps({"success":success})
	# Tells client login was successful. Or not.
	return HttpResponse(data, content_type='application/json')

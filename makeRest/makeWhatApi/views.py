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
from django.core import serializers

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
	# permission_classes -- to let django know only logged
	# in users may create/post new projects.
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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
	# permission_classes -- to let django know only logged
	# in users may save projects (post new makerprojects reltionships).
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	# def get_queryset(self):
	# 	"""
	# 	This view should return a list of all the purchases
	# 	for the currently authenticated user.
	# 	"""
	# 	user = self.request.user
	# 	return MakersProjects.objects.filter(maker=user)

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


@csrf_exempt
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
	success = False
	json_user = {}
	if authenticated_user is not None:
		login(request=request, user=authenticated_user)
		json_user = serializers.serialize('json', (authenticated_user, ))
		success = True
		# return HttpResponse(json_user, content_type='application/json')
	# else:
	# 	success = False
		# response = {'success': False, 'message':'User does not exist.'}


	# Data becomes a json object, with one key:value pair
	data = json.dumps({'success':success, 'user':json_user})
	# Tells client login was successful. Or not.
	return HttpResponse(data, content_type='application/json')




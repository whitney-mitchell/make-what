from rest_framework import serializers
from django.contrib.auth.models import User
from makeWhatApi.models import Projects, Supplies, Types, MakersProjects, SuppliesProjects, TypesProjects

class UsersSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'url', 'username', 'password', 'email','first_name', 'last_name')


class ProjectsSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Projects
		fields = ('id', 'url', 'name', 'description', 'link')


class TypesSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Types
		fields = ('id', 'url', 'name')


class SuppliesSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Supplies
		fields = ('id', 'url', 'name')


class MakersProjectsSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = MakersProjects
		fields = ('id', 'url', 'maker', 'project')


class SuppliesProjectsSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = SuppliesProjects
		fields = ('id', 'url', 'supply', 'project')


class TypesProjectsSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = TypesProjects
		fields = ('id', 'url', 'typeof', 'project')


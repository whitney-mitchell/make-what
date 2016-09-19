from rest_framework import serializers
from django.contrib.auth.models import User
from makeWhatApi.models import Projects, Supplies, Types, MakersProjects, SuppliesProjects, TypesProjects

class UsersSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = User
		fields = ('id', 'url', 'username', 'password', 'email', 'first_name', 'last_name')


class TypesSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Types
		fields = ('id', 'url', 'name')


class SuppliesSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Supplies
		fields = ('id', 'url', 'name')


class MakersProjectsSerializer(serializers.HyperlinkedModelSerializer):
	# Due to lack of time before Demo Day, comment out the following line to edit API
	# Will refactor and build multiple serializers.
	maker = UsersSerializer()

	class Meta:
		model = MakersProjects
		fields = ('id', 'url', 'maker', 'project')


class SuppliesProjectsSerializer(serializers.HyperlinkedModelSerializer):
	# Due to lack of time before Demo Day, comment out the following line to edit API
	supply = SuppliesSerializer()

	class Meta:
		model = SuppliesProjects
		fields = ('id', 'url', 'supply', 'project')


class ProjectsSerializer(serializers.HyperlinkedModelSerializer):
	# Due to lack of time before Demo Day, comment out the following 2 lines to edit API
	supply_project = SuppliesProjectsSerializer(many=True)
	maker_project = MakersProjectsSerializer(many=True)

	class Meta:
		model = Projects
		fields = ('id', 'url', 'name', 'description', 'link', 'supply_project', 'maker_project')

class TypesProjectsSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = TypesProjects
		fields = ('id', 'url', 'typeof', 'project')


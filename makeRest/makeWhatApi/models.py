from django.db import models
from django.contrib.auth.models import User

class Projects(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=300)
	link = models.CharField(max_length=200)
	# photo = models. come back to this...

	# This representation is used any time a base string representation
	# is needed, such as the web browseable API interface provide by
	# the framework.
	def __str__(self):
		return "{}: {}".format(self.id, self.name)


class Types(models.Model):
	name = models.CharField(max_length=100)

	def __str__(self):
		return "{}: {}".format(self.id, self.name)


class Supplies(models.Model):
	name = models.CharField(max_length=100)

	def __str__(self):
		return "{}: {}".format(self.id, self.name)

class MakersProjects(models.Model):
	maker = models.ForeignKey('auth.User', related_name='maker_project')
	project = models.ForeignKey(Projects, related_name='maker_project')


class SuppliesProjects(models.Model):
	supply = models.ForeignKey(Supplies, related_name='supply_project')
	project = models.ForeignKey(Projects, related_name='supply_project')


class TypesProjects(models.Model):
	typeof = models.ForeignKey(Types, related_name='type_project')
	project = models.ForeignKey(Projects, related_name='type_project')




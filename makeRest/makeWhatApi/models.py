from django.db import models
from django.contrib.auth.models import User

# class Users(models.Model):
#   username = models.CharField(max_length=100)
#   password = models.
#   # This representation is used any time a base string representation
#   # is needed, such as the web browseable API interface provide by
#   # the framework.
#   def __str__(self):
#     return "{}: {}".format(self.id, self.username)


# class Albums(models.Model):
#   album_name = models.CharField(max_length=100)
#   artist_ID = models.ForeignKey(Artists, on_delete = models.CASCADE)


#   def __str__(self):
#     return "{}: {}".format(self.id, self.album_name)



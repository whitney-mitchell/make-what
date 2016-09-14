from rest_framework import routers
from django.conf.urls import url, include
from makeWhatApi import views

# The URL pattern that the project calls, now points to index.
app_name = "makeWhatApi"
urlpatterns = [
	url(r'^register/$', views.register_user, name='register_user'),
	url(r'^login/$', views.login_user, name='login_user'),
	url(r'^', include(router.urls)),
]

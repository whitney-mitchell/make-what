from rest_framework import routers
from django.conf.urls import url, include
from makeWhatApi import views

# The URL pattern that the project calls, now points to index.
# app_name = "makeWhatApi"

router = routers.DefaultRouter()
router.register(r'users', views.UsersList)
router.register(r'projects', views.ProjectsList)
router.register(r'supplies', views.SuppliesList)
router.register(r'types', views.TypesList)
router.register(r'makersprojects', views.MakersProjectsList)
router.register(r'suppliesprojects', views.SuppliesProjectsList)
router.register(r'typesprojects', views.TypesProjectsList)

urlpatterns = [
	url(r'^register/$', views.register_user, name='register_user'),
	url(r'^login$', views.login_user, name='login_user'),
	url(r'^makerproj$', views.maker_proj, name='maker_proj'),
	url(r'^', include(router.urls)),
]

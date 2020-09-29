from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('login/', views.Login.as_view()),
    path('logout/', views.Logout.as_view()),
    path('get_current_user/', views.GetCurrentUser.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)

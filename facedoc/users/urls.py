from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('register/',UserRegistrationView.as_view(),name='register'),
    path('login/',UserLoginView.as_view(),name='login'),
    path('profile/',UserProfileView.as_view(),name='profile'),
    path('logout/', UserLogoutView.as_view(),name='logout'),
    path('roles', UserRolesView.as_view(), name = 'roles'),
    path('userinfo', UserInfoView.as_view(), name = 'userInfo'),
    path('checkEmail', userExists, name = 'checkEmail'),
    path('changePassword/<int:pk>/', ChangePasswordView.as_view(), name = 'checkPassword'),
    path('updateProfile/<int:pk>/',UpdateProfileView.as_view(), name = 'updateProfile'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('profile/', views.profile, name='profile'),

    # custom pages
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('forgot-username/', views.forgot_username, name='forgot_username'),
]

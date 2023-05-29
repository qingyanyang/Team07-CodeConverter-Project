"""code_converter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app01 import views


"""
Routing:
.../codeConverter/             : GET request; display code editor
.../codeConverter/api/submit/  : POST request; submit infor, return string
"""
urlpatterns = [
    # path("admin/", admin.site.urls),
    path("codeConverter/",views.code_converter),
    path("codeConverter/api/submit/", views.code_converter_submit),
    path("codeConverter/api/correct/",views.correct_fromLanguage),
    path("test/",views.test),
]



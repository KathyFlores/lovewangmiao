# -*- coding: UTF-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

from api.utils.response import make_response

# Create your views here.
@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return make_response(200, 'success', '登录成功')
        else:
            return make_response(401, 'unauthorized', '用户名或密码错误')
    else:
        if request.user.is_authenticated:
            return make_response(200, 'success', '已登录')
        else:
            return make_response(401, 'unauthorized', '未登录')

def user_logout(request):
    logout(request)
    return make_response(200, 'success', '已登出')    

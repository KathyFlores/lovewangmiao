# -*- coding: UTF-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from api.utils.response import make_response

# Create your views here.
def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/api/gifts/index')
        else:
            return make_response(401, 'unauthorized', '用户名或密码错误')
    else:
        return make_response(404, 'page_not_found', '页面不存在')

def user_logout(request):
    logout(request)    

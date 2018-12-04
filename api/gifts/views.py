# -*- coding: UTF-8 -*-
from django.shortcuts import render

from api.utils.response import make_response

# Create your views here.
def view_gifts(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return render(request, 'gifts/gifts.html')
        else:
            return make_response(401, 'unauthorized', '尚未登录')
    else:
        return make_response(404, 'page_not_found', '页面不存在')

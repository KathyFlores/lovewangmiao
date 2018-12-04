# -*- coding: UTF-8 -*-
from django.shortcuts import render
from django.contrib.auth import authenticate

from api.video.models import Video
from api.utils.response import make_response

# Create your views here.
def view_video_list(request):
    if request.method == 'GET':
        res_data = {'video_list': []}
        if not request.user.is_authenticated:
            for video in Video.objects.all():
                res_data['video_list'].append(video.make_response_data(True))
            return make_response(200, 'success', '请求成功', res_data)
        else:
            for video in Video.objects.all():
                res_data['video_list'].append(video.make_response_data(False))
            return make_response(401, 'unauthorized', '尚未登录', res_data)
    else:
        return make_err_response(404, 'page_not_found', '页面不存在')

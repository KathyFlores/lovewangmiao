from django.test import TestCase

# Create your tests here.

from django.shortcuts import render
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse
# TEST
from django.views.decorators.csrf import csrf_exempt 

from api.video.models import Video

# Create your views here.
# TEST
@csrf_exempt
def view_video_list(request):
    if request.method == 'GET':
        res_data = {'video_list': []}
        if not request.user.is_authenticated:
            for video in Video.objects.all():
                res_data['video_list'].append(video.make_response_data(True))
            return JsonResponse(res_data)
        else:
            for video in Video.objects.all():
                res_data['video_list'].append(video.make_response_data(False))
            return JsonResponse(res_data, status=401)
    else:
        return HttpResponse(content='Page Not Found', status=404)

if __name__ == "__main__":
    import requests
    s = requests.Session()
    login_url = 'http://127.0.0.1:8080/api/accounts/login/'
    video_url = 'http://127.0.0.1:8080/api/gifts/video/'
    r = s.get(video_url)
    print(r)
    login_data = {'username': 'ynl', 'password': 'ynl123456'}
    r = s.post(login_url, data=login_data)
    r = s.get(video_url)
    print(r)


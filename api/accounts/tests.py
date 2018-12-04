from django.test import TestCase

# Create your tests here.

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
# TEST
from django.views.decorators.csrf import csrf_exempt 

# Create your views here.
# TEST
@csrf_exempt 
def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # TEST
            return HttpResponse(content='Login Success', status=200) 
        else:
            # TEST
            return HttpResponse(content='Unauthorized', status=401)
    else:
        return HttpResponse(content='Page Not Found', status=404)

def user_logout(request):
    logout(request)

if __name__ == '__main__':
    import requests
    url = 'http://127.0.0.1:8080/api/accounts/login/'
    r = requests.get(url)
    print(r.status_code)
    login_data = {'username': 'ynl', 'password': 'ynl1234567'}
    r = requests.post(url, data=login_data)
    print(r.status_code)
    login_data = {'username': 'ynl', 'password': 'ynl123456'}
    r = requests.post(url, data=login_data)
    print(r.status_code)


from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# TEST
from django.views.decorators.csrf import csrf_exempt 

# Create your views here.
# TEST
# @csrf_exempt 
def view_gifts(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            # TEST
            # return HttpResponse(content='Success', status=200)
            return render(request, 'gifts/gifts.html')
        else:
            err_msg = {'status_code': 401, 'status': 'unauthorized', 'msg': '尚未登录'}
            return JsonResponse(err_msg)
    else:
        return HttpResponse(content='Page Not Found', status=404)

if __name__ == "__main__":
    import requests
    s = requests.Session()
    login_url = 'http://127.0.0.1:8080/api/accounts/login/'
    gifts_url = 'http://127.0.0.1:8080/api/gifts/index/'
    r = s.get(gifts_url)
    print(r.status_code)
    login_data = {'username': 'ynl', 'password': 'ynl123456'}
    r = s.post(login_url, data=login_data)
    print(r.status_code)
    r = s.get(gifts_url)
    print(r.status_code)

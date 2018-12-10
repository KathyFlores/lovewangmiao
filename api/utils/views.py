from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token

import copy

# Create your views here.
def get_csrf_token(request):
    csrf_token = get_token(request)
    return make_response(200, 'success', '请求成功', {'csrf_token': csrf_token})

def make_response(status_code, status, msg, user_def=None):
    if user_def:
        res = copy.deepcopy(user_def)
    else:
        res = {}
    res['status'] = status
    res['msg'] = msg
    return JsonResponse(res, status=status_code)

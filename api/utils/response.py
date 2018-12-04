from django.http import HttpResponse, JsonResponse

import copy

def make_response(status_code, status, msg, user_def=None):
    if user_def:
        res = copy.deepcopy(user_def)
    else:
        res = {}
    res['status'] = status
    res['msg'] = msg
    return JsonResponse(res, status=status_code)

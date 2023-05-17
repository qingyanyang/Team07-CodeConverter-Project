from django.shortcuts import render, HttpResponse
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from urllib.parse import parse_qs
from urllib.parse import unquote

from app01.utils import solver

# from app01 import cpp2pyConvert
# Create your views here.
def code_converter(request):
    if request.method=='GET':
        return render(request, 'index.html')

    
def test(request):
    if request.method == 'POST':
        print('收到啦')
        body = request.body
        #extract json file
        parsed_data = parse_qs(body)
        json_str = parsed_data[b'text'][0].decode('utf-8') 
        json_data = unquote(json_str)
        print(json_data)

        data = json.loads(json_data)
        
        inputCode = data['raw_code']
        
        target = data['toLanguage']
        
        print(target + "&"+inputCode)
        # convert function
        result = convert_text(target,inputCode)
        return HttpResponse({'result': result})
    else:
        return HttpResponse({'error': 'Invalid request method.'})

def convert_text(target,inputCode):
    return inputCode.upper() 



"""
Decorator enables to handle POST request
"""
@csrf_exempt
def code_converter_submit(request):
    if request.method == "POST":
        print('收到啦')
        body = request.body
        #extract json file
        data_str = body.decode('utf-8')
        data = json.loads(data_str)
        raw_code = data['raw_code']

        print(raw_code)
        toLanguage = data['toLanguage']
        print("toLanguage",toLanguage)
        ans = solver(raw_code, toLanguage)
        print(ans)
        return HttpResponse(ans)

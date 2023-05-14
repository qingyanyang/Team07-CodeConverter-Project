from django.shortcuts import render, HttpResponse
<<<<<<< HEAD
from django.http import JsonResponse
=======
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from urllib.parse import parse_qs
from urllib.parse import unquote

from app01.utils import solver

>>>>>>> 5233c49611ce8106afd5b8ec84785ddb988cf76e
# from app01 import cpp2pyConvert
# Create your views here.
def code_converter(request):
    if request.method=='GET':
<<<<<<< HEAD
        return render(request, 'index1.html')
    
def test(request):
    if request.method == 'POST':
        text = request.POST.get('text')
        #split
        elements = text.split('@',2)
        #parsing
        source = elements[0]
        target = elements[1]
        inputCode = elements[2]
        
        # convert function
        result = convert_text(source,target,inputCode)
        # result = "hehe"
        return JsonResponse({'result': result})
    else:
        return JsonResponse({'error': 'Invalid request method.'})

def convert_text(source,target,inputCode):
    return inputCode.upper()
=======
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
        # body = json.loads(request.body)
        # raw_code = body["raw_code"]
        # toLanguage = body["toLanguage"]
        print('收到啦')
        body = request.body
        #extract json file
        data_str = body.decode('utf-8')
        query_dict = parse_qs(data_str)
        json_str = query_dict['text'][0]
        json_data = unquote(json_str)
        data = json.loads(json_data)

        raw_code = data['raw_code']

        print(raw_code)
        toLanguage = data['toLanguage']

        ans = solver(raw_code, toLanguage)
        print(ans)
        return HttpResponse(ans)
>>>>>>> 5233c49611ce8106afd5b8ec84785ddb988cf76e

from django.shortcuts import render, HttpResponse
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from app01.utils import checker, converter, bugChecker, identifier,comparator,corrector

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

def correct_fromLanguage(request):
    if request.method == "POST":
        print('收到需要correct的input')
        body = request.body

        # extract json file
        data_str = body.decode('utf-8')
        data = json.loads(data_str)

        # get input code that need to be corrected
        raw_code = data['raw_code']
        print(raw_code)

        #correct it and send it back to front-end
        corrected_code = corrector(raw_code)
        return HttpResponse(corrected_code)

"""
Decorator enables to handle POST request
"""
@csrf_exempt
def code_converter_submit(request):
    if request.method == "POST":
        # print('收到啦')
        body = request.body

        # extract json file
        data_str = body.decode('utf-8')
        data = json.loads(data_str)

        # get input code
        raw_code = data['raw_code']
        # print(raw_code)

        # get target language
        toLanguage = data['toLanguage']
        print("toLanguage",toLanguage)

        # get source language
        fromLanguage = data['fromLanguage']
        print("fromLanguage",fromLanguage)

        isBug = bugChecker(raw_code)
        print("isBug",isBug)
        # check bug
        if str(isBug).startswith('Yes'):
            # identify language even it has errors
            identifyLan = identifier(raw_code)
            print("identifyLan",identifyLan)
            #Compare to fromLanguage
            compareLan = comparator(str(identifyLan),fromLanguage)
            return HttpResponse(compareLan)
        # no bug
        # check if raw_code is fromLanguage
        ans = checker(raw_code, fromLanguage)
        print(ans)
        
        # if yes, convert it and send to front-end
        # if no, send "No" to front-end
        if str(ans).startswith('Yes'):
            code_converted = converter(raw_code,toLanguage)
            print(code_converted)
            return HttpResponse(code_converted)
        return HttpResponse(ans)

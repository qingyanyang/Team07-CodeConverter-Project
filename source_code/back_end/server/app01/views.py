from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from app01.utils import solver

# from app01 import cpp2pyConvert
# Create your views here.
def code_converter(request):
    if request.method=='GET':
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
        return JsonResponse({'result': result})
    else:
        return JsonResponse({'error': 'Invalid request method.'})

def convert_text(source,target,inputCode):
    return inputCode.upper()



"""
Decorator enables to handle POST request
"""
@csrf_exempt
def code_converter_submit(request):
    if request.method == "POST":
        body = json.loads(request.body)
        raw_code = body["raw_code"]
        toLanguage = body["toLanguage"]

        ans = solver(raw_code, toLanguage)
        return HttpResponse(ans)

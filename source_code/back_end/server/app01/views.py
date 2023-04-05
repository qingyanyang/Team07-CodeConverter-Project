from django.shortcuts import render, HttpResponse
# from app01 import cpp2pyConvert
# Create your views here.
def code_converter(request):
    if request.method=='GET':
        return render(request, 'index.html')
    input_lan = request.POST.get("input")
    # output_lan = cpp2pyConvert.convert(input_lan)
    # print(input_lan)
    return render(request, 'index.html',{'input_lan':input_lan})

def upload_list(request):
    if request.method == 'GET':
        return render(request,'index.html')
    print('shoudao')
    #print(request.POST.get('import'))
    get_value = request.POST.get('selected_option').lower()

    if get_value=='c++':
        get_value='cpp'

    if get_value=='python':
        get_value='py'

    file_object = request.FILES.get('import')
    name = file_object.name
    suffix = name.split('.')[-1]
    #check name suffix
    check = 0
    if get_value!=suffix:
        check = 1

    print(check)
    return render(request, 'index.html',{'check':check})

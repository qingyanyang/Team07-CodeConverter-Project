def convert(cpp):
    sl=[]
    fl=[]    
    for i in cpp:
        app=''
        if i!='':
            app+=i
        else:
            app=''
        sl.append(app)
        app=''
    for i in sl:
        if i != '\n':
            app+=i
        else:
            fl.append(app)
            app=''
    print(fl)

cpp='#include <iostream> using namespace std;\nint main() {\nint n;\n       cout << "输入一个整数: "; \ncin >> n;\nif ( n % 2 == 0)         \ncout << n << " 为偶数。";     \nelse         \ncout << n << " 为奇数。";       \nreturn 0; }\n'  
convert(cpp)
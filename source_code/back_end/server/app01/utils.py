import openai

# common generator
def generator(prompt:str)-> str:
    """
    This function utilizes the OpenAI service for convert code.
    
    To replace the API key:

    1. Visit the official website of OpenAI and sign in to your account.
    2. Go to the API key section and generate a new key if you don't have one already.
    3. Copy the new API key.
    4. Replace the value of openai.api_key variable with the new API key.
    5. Save the file and ensure the updated API key is used in subsequent API calls.
    """
    openai.api_key = "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" # private API key
    model_engine = "text-davinci-003"  # Specify the model engine to use
    temperature = 0.5
    max_tokens = 1000 # maximum char length

    # Send the API request and print the generated text
    response = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        temperature=temperature,
        max_tokens=max_tokens
    )
    generated_text = response.choices[0].text.strip()
    return generated_text


# check if raw_code is fromLanguage
def checker(raw_code:str, fromLanguage: str) -> str:
    print(fromLanguage)
    prompt = "is the following code written in "+ fromLanguage + " ? reply \'Yes\' or \'No\' and reason \n" + raw_code
    return generator(prompt)

'''
*Description:
Use openai API to convert code into target coding language 

*args:
    string raw_code : origianl code in string format
    string toLanguge : coding language to be converted
*ret:
    string generated_text : converted code in string format
'''
def converter(raw_code:str, toLanguage:str) -> str:
    prompt = "convert this code \n" +raw_code+ "\n to "+ toLanguage
    return generator(prompt)

def bugChecker(raw_code:str) -> str:
    prompt = "does this code \n" + raw_code+ "\n has snytax error? reply \'Yes\' or \'No\' and reason"
    return generator(prompt)

def identifier(raw_code:str) -> str:
    prompt = "identify the programming language of this code \n" +raw_code + " \n only reply the language name"
    return generator(prompt)

def comparator(identifyLan:str,fromLanguage: str) -> str:
    prompt = "are \n" + identifyLan + "\n and \n" + fromLanguage + "\n represent the same programming language? only reply \'Yes\' or \'No\'"
    return generator(prompt)

def corrector(raw_code:str) -> str:
    prompt = "return me the correct version of this code: \n" + raw_code 

    return generator(prompt)
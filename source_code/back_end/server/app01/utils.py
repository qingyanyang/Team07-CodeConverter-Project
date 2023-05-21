import openai



'''
*Description:
Use openai API to convert code into target coding language 

*args:
    string raw_code : origianl code in string format
    string toLanguge : coding language to be converted
*ret:
    string generated_text : converted code in string format
'''
# check if raw_code is fromLanguage
def checker(raw_code:str, fromLanguage: str) -> str:
    #for developer: replace it ....with...
    openai.api_key = "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" # private API key
    model_engine = "text-davinci-002"  # Specify the model engine to use

    prompt = "is this " +raw_code+ " "+fromLanguage + " code? only reply \'Yes\' or \'No\'"
    print(prompt)
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

# when the answer is yes, do converting
def converter(raw_code:str, toLanguage:str) -> str:
    
    openai.api_key = "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" # private API key
    model_engine = "text-davinci-002"  # Specify the model engine to use

    prompt = "convert this code " +raw_code+ " to "+ toLanguage + "make it concise."
    print(prompt)
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

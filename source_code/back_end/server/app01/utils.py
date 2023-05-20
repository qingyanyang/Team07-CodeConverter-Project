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
    """
    This function utilizes the OpenAI service for check the code language.
    To replace the API key:
    1. Visit the official website of OpenAI and sign in to your account.
    2. Go to the API key section and generate a new key if you don't have one already.
    3. Copy the new API key.
    4. Replace the value of openai.api_key variable with the new API key.
    5. Save the file and ensure the updated API key is used in subsequent API calls.
    """
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

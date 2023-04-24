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
def solver(raw_code:str, toLangauge:str) -> str:
    
    openai.api_key = "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" # private API key
    model_engine = "text-davinci-002"  # Specify the model engine to use

    prompt = "convert this code to " + toLangauge + "\n" + raw_code

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

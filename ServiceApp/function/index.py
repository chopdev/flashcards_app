import json
from googletrans import Translator

def lambda_handler(event, context):
    text = event['queryStringParameters']['text']
    from_lang = event['queryStringParameters'].get('fromLang', 'en')
    to_lang = event['queryStringParameters'].get('toLang', 'uk')

    translated_text = translate_text(text, from_lang, to_lang)
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'originalText': text,
            'translatedText': translated_text,
            'additionalInfo': 'Metadata'
        })
    }

def translate_text(text, from_lang, to_lang):
    translator = Translator()
    return translator.translate(text, to_lang, from_lang).text

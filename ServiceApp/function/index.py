import json
from googletrans import Translator

def lambda_handler(event, context):
    text = event['queryStringParameters']['text']
    
    translated_text = translate_text(text)
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

def translate_text(text):
    translator = Translator()
    return translator.translate('leech', 'uk', 'en').text

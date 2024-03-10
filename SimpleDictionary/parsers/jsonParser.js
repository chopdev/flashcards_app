import {Word}  from '../models/wordEntity';

const cyrillicPattern = /[а-яА-ЯЁё]/;

export function parseToWords(jsonArray) {
    const words = [];

    for (const row of jsonArray) {

        
        if (isNullOrEmpty(row))
            continue;

        let word = row.eng;
        let translation = row.translation;

        if (cyrillicPattern.test(word)) {
            const temp = word;
            word = translation;
            translation = temp;
        }

        if (isNullOrEmpty(word) || isNullOrEmpty(translation)) {
            console.warn("INCORRECT WORD")
        }

        words.push(new Word(word, translation, ''));
    }

    return words;
}

function isNullOrEmpty(str) {
    return str == null || str == '';
}
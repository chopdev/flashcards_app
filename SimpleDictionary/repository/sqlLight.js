import * as SQLite from 'expo-sqlite';
import { Word } from '../models/wordEntity';

const db = SQLite.openDatabase('dictionary.db');

const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY NOT NULL, eng TEXT NOT NULL, translation TEXT NOT NULL, transcription TEXT, examples TEXT);',
                [],
                () => { resolve(); },
                (_, error) => { reject(error); }
            );
        });
    });
};

export async function fetchWords() {
    await init();  // Ensure the database and tables are initialized
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM words ORDER BY id DESC;',
                [],
                (_, { rows: { _array } }) => {
                    const words = _array.map(word => new Word(word.eng, word.translation, word.transcription, word.examples ? word.examples.split(';') : []));
                    resolve(words);
                },
                (_, error) => {
                    console.error('Error fetching words:', error);
                    reject(error);
                }
            );
        });
    });
}

export async function persistWord(newWord) {
    return new Promise(async (resolve, reject) => {
        try {
            await init();
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO words (eng, translation, transcription, examples) VALUES (?, ?, ?, ?);',
                    [newWord.eng, newWord.translations, newWord.transcription, newWord.examples],
                    (_, result) => {
                        resolve(result.insertId); // Resolve with the ID of the newly added word
                    },
                    (_, error) => {
                        console.error('Error adding word:', error);
                        reject(error); // Reject the promise on error
                    }
                );
            });
        } catch (error) {
            console.error('Database operation failed:', error);
            reject(error); // Handle initialization errors
        }
    });
}

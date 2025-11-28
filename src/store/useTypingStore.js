import { create } from 'zustand';
import { generateWords } from '../utils/words';

export const useTypingStore = create((set, get) => ({
    phase: 'start', // start, typing, finish
    words: generateWords(30),
    typedHistory: '', // Stores all typed characters including backspaces? No, just the current input state usually.
    // Actually, for advanced analytics we need a log.
    // But for the UI, we need the current input string.
    currInput: '',
    startTime: 0,
    endTime: 0,
    wpm: 0,
    accuracy: 0,
    keystrokeLog: [], // { char: 'a', time: 123456789, expected: 'a' }

    reset: () => {
        set({
            phase: 'start',
            words: generateWords(30),
            currInput: '',
            startTime: 0,
            endTime: 0,
            wpm: 0,
            accuracy: 0,
            keystrokeLog: []
        });
    },

    handleInput: (char) => {
        const { phase, currInput, words, startTime, keystrokeLog } = get();
        const now = Date.now();

        if (phase === 'finish') return;

        if (phase === 'start') {
            set({ phase: 'typing', startTime: now });
        }

        // Handle Backspace
        if (char === 'Backspace') {
            if (currInput.length > 0) {
                set({ currInput: currInput.slice(0, -1) });
            }
            return;
        }

        // Ignore other special keys
        if (char.length > 1) return;

        // Append char
        const newInput = currInput + char;

        // Log keystroke
        const expectedChar = words[currInput.length];
        const newLog = [...keystrokeLog, { char, time: now, expected: expectedChar, isCorrect: char === expectedChar }];

        // Check if finished
        if (newInput.length === words.length) {
            const duration = (now - (startTime || now)) / 1000 / 60; // minutes
            const correctChars = newLog.filter(l => l.isCorrect).length;
            const wpm = Math.round((correctChars / 5) / duration);
            const accuracy = Math.round((correctChars / words.length) * 100);

            set({
                phase: 'finish',
                currInput: newInput,
                endTime: now,
                wpm: isFinite(wpm) ? wpm : 0,
                accuracy: isFinite(accuracy) ? accuracy : 0,
                keystrokeLog: newLog
            });
        } else {
            set({ currInput: newInput, keystrokeLog: newLog });
        }
    }
}));

import { useEffect, useRef, useState } from 'react';
import { useTypingStore } from '../store/useTypingStore';
import Caret from './Caret';

const TypingArea = () => {
    const { words, currInput, handleInput, phase, reset, wpm, accuracy } = useTypingStore();
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const [caretPos, setCaretPos] = useState({ top: 0, left: 0 });

    // Focus input on click or keypress
    useEffect(() => {
        const handleKeyDown = () => inputRef.current?.focus();
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Calculate caret position
    useEffect(() => {
        if (containerRef.current) {
            const charElements = containerRef.current.querySelectorAll('.char');
            const activeChar = charElements[currInput.length];

            if (activeChar) {
                setCaretPos({
                    top: activeChar.offsetTop,
                    left: activeChar.offsetLeft
                });
            } else if (currInput.length === words.length) {
                // End of text
                const lastChar = charElements[currInput.length - 1];
                if (lastChar) {
                    setCaretPos({
                        top: lastChar.offsetTop,
                        left: lastChar.offsetLeft + lastChar.offsetWidth
                    });
                }
            }
        }
    }, [currInput, words]);

    const handleInputChange = (e) => {
        // We handle input via onKeyDown in the hidden input to capture special keys better if needed,
        // but onChange is fine for simple chars. 
        // Actually, to handle Backspace properly with the store logic, we might need onKeyDown.
        // Let's use onKeyDown for everything to be consistent with the store's handleInput.
    };

    const onKeyDown = (e) => {
        // Prevent default for some keys if needed
        if (e.key === 'Tab') {
            e.preventDefault();
            reset();
            return;
        }

        // We pass the key to the store
        // We only care about single chars and backspace
        if (e.key.length === 1 || e.key === 'Backspace') {
            handleInput(e.key);
        }
    };

    return (
        <div className="relative max-w-3xl w-full font-mono text-2xl leading-relaxed outline-none" onClick={() => inputRef.current?.focus()}>

            {/* Hidden Input */}
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 -z-10"
                autoFocus
                onKeyDown={onKeyDown}
                onChange={() => { }} // Controlled by store via onKeyDown
                value="" // Always empty, we manage state in store
            />

            {/* Stats Overlay (Simple) */}
            {phase === 'finish' && (
                <div className="absolute inset-0 bg-bg-dark/90 z-20 flex flex-col items-center justify-center text-primary">
                    <div className="text-6xl font-bold mb-4">{wpm} WPM</div>
                    <div className="text-2xl text-text-sub">{accuracy}% Accuracy</div>
                    <button
                        onClick={reset}
                        className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-text-main transition-colors"
                    >
                        Press Tab to Restart
                    </button>
                </div>
            )}

            {/* Text Display */}
            <div ref={containerRef} className="relative break-words select-none">
                {phase !== 'finish' && <Caret top={caretPos.top} left={caretPos.left} />}

                {words.split('').map((char, index) => {
                    let colorClass = 'text-text-sub/50'; // Default untyped

                    if (index < currInput.length) {
                        const typedChar = currInput[index];
                        if (typedChar === char) {
                            colorClass = 'text-text-main'; // Correct
                        } else {
                            colorClass = 'text-error'; // Incorrect
                        }
                    }

                    return (
                        <span key={index} className={`char ${colorClass}`}>
                            {char}
                        </span>
                    );
                })}
            </div>

            <div className="mt-8 text-center text-sm text-text-sub/30">
                Press <span className="text-primary">Tab</span> to restart
            </div>
        </div>
    );
};

export default TypingArea;

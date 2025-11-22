import { useEffect, useState } from "react";

export const useGameLogic = (cardValues) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const initializeGame = () => {
        const shuffled = shuffleArray(cardValues);
        const finalCards = shuffled.map((value, index) => ({
            id: index,
            value,
            isFlipped: false,
            isMatched: false,
        }));

        setCards(finalCards);
        setMoves(0);
        setScore(0);
        setIsLocked(false);
        setMatchedCards([]);
        setFlippedCards([]);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardClick = (card) => {
        if (card.isFlipped || card.isMatched || isLocked) return;

        // flip the clicked card
        setCards((prev) =>
            prev.map((c) =>
                c.id === card.id ? { ...c, isFlipped: true } : c
            )
        );

        const newFlippedCards = [...flippedCards, card.id];
        setFlippedCards(newFlippedCards);

        // only check when 2 cards are flipped
        if (newFlippedCards.length === 2) {
            setIsLocked(true);
            setMoves((prev) => prev + 1);

            const firstCard = cards.find((c) => c.id === newFlippedCards[0]);
            const secondCard = cards.find((c) => c.id === newFlippedCards[1]);

            if (firstCard.value === secondCard.value) {
                // MATCH
                setTimeout(() => {
                    setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
                    setScore((prev) => prev + 1);

                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === firstCard.id || c.id === secondCard.id
                                ? { ...c, isMatched: true }
                                : c
                        )
                    );

                    setFlippedCards([]);
                    setIsLocked(false);
                }, 500);
            } else {
                // NO MATCH → flip back
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                            newFlippedCards.includes(c.id)
                                ? { ...c, isFlipped: false }
                                : c
                        )
                    );
                    setFlippedCards([]);
                    setIsLocked(false);
                }, 800);
            }
        }
    };

    const isGameCompleted = matchedCards.length === cardValues.length;

    return {
        cards,
        handleCardClick,
        score,
        moves,
        initializeGame,
        isGameCompleted
    };
};

import { Button, Checkbox, Display, Subtitle1, Subtitle2, Title1 } from '@fluentui/react-components';
import { useState, useEffect } from 'react'
import { useStyles } from './Firstquiz.styles';

interface QuestionBank {
    question: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
}

const Firstquiz = () => {

    const [questionBank, setQuestionBank] = useState<Array<QuestionBank>>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userChoices, setUserChoices] = useState<string[]>([]);
    const [learningStyle, setLearningStyle] = useState('');
    const [score, setScore] = useState({
        visual: 0,
        auditory: 0,
        reading: 0,
        kinaesthetic: 0
    })
    const styles = useStyles();

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/firstquiz/')
            .then(response => response.json())
            .then(data => {
                const questions = shuffleArray(data.firstquiz)
                setQuestionBank(questions);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;

    const handleChoiceSelection = (choice: string) => {
        const selectedQuestion = questionBank[currentQuestionIndex];
        setUserChoices([...userChoices, choice]);

        if (choice === selectedQuestion.choice1) {
            setScore({ ...score, visual: score.visual + 1 });
        } else if (choice === selectedQuestion.choice2) {
            setScore({ ...score, auditory: score.auditory + 1 });
        } else if (choice === selectedQuestion.choice3) {
            setScore({ ...score, reading: score.reading + 1 });
        } else if (choice === selectedQuestion.choice4) {
            setScore({ ...score, kinaesthetic: score.kinaesthetic + 1 });
        }

        if (currentQuestionIndex < questionBank.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            determineLearningStyle();
        }
    };

    const determineLearningStyle = () => {
        const { visual, auditory, reading, kinaesthetic } = score;

        if (visual > auditory && visual > reading && visual > kinaesthetic) {
            setLearningStyle('Visual');
        } else if (auditory > visual && auditory > reading && auditory > kinaesthetic) {
            setLearningStyle('Auditory');
        } else if (reading > visual && reading > auditory && reading > kinaesthetic) {
            setLearningStyle('Reading/Writing');
        } else if (kinaesthetic > visual && kinaesthetic > auditory && kinaesthetic > reading) {
            setLearningStyle('Kinesthetic');
        } else {
            setLearningStyle('Modular');
        }
    };

    return (
        <div className={styles.root}>
            <div>
                <Title1>Learning Style Quiz</Title1>
            </div>
            <div className={styles.body}>
                {currentQuestionIndex === 16 ? (
                    <Subtitle1>End</Subtitle1>
                ) : (
                    <div className={styles.quiz}>
                        <div className={styles.question}>
                            <Subtitle1>Question {currentQuestionIndex+1}</Subtitle1>
                            <Subtitle2>{questionBank[currentQuestionIndex].question}</Subtitle2>
                        </div>

                        <div className={styles.choice}>
                            {shuffleArray([
                                questionBank[currentQuestionIndex].choice1,
                                questionBank[currentQuestionIndex].choice2,
                                questionBank[currentQuestionIndex].choice3,
                                questionBank[currentQuestionIndex].choice4,
                            ]).map(choice => (
                                <Button className={styles.button} appearance='subtle' key={choice}
                                    onClick={() => handleChoiceSelection(choice)}>{choice}</Button>

                            ))}
                        </div>
                    </div>
                )}
            </div>
            {learningStyle && (
                <div>
                    <h2>Learning Style: {learningStyle}</h2>
                </div>
            )}
        </div>
    )
}

export default Firstquiz
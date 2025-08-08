import { FC, useState } from 'react';
//Components
import './translateAppStyle.css';
import TranslateSection from './TranslateSection.tsx';
import TranslationSection from './TranslationSection.tsx';
import CopyToast from './CopyToast.tsx';
import { useScale } from './anim.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Image, Row } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { animated } from '@react-spring/web';
//Images
import LogoImg from '../resources/logo.svg';

const TranslateApp: FC = () => {
    const [langOne, setLangOne] = useState<string>('en');
    const [langSec, setLangSec] = useState<string>('fr');

    const [translatingText, setTranslatingText] = useState<string>("Hello, how are you?");
    const [translatedText, setTranslatedText] = useState<string>("Bonjour, comment vas-tu?");

    const [showTost, setShowToast] = useState<boolean>(false);

    const handleTranslate = async () => {
        try {
            const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: {
                q: translatingText,
                langpair: `${langOne}|${langSec}`
            }
            });

            const translated = response.data.responseData.translatedText;
            setTranslatedText(translated || 'Translation failed.');
        } catch (error) {
            console.error('Translation error:', error);
            setTranslatedText('Error occurred during translation.');
        }
    };

    const handleSwitch = () => {
        setLangOne(prev => langSec);
        setLangSec(prev => langOne);
    }

    const languagesSet: Record<string, string> = {
        'en': 'english',
        'fr': 'french',
        'es': 'spanish',
        'uk': 'ukrainian',
        'de': 'german',
        'ja': 'japanese',
    }

    const handleCopy = (textForCopy: string) => {
        navigator.clipboard.writeText(textForCopy)
            .then(() => setShowToast(true))
            .catch(err => console.error('Failed to copy text: ', err));
    };

    const speakText = (text: string, langCode: string) => {
        const langMap: Record<string, string> = {
            en: 'en-US',
            fr: 'fr-FR',
            es: 'es-ES',
            uk: 'uk-UA',
            de: 'de-DE',
            ja: 'ja-JP',
        };

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langMap[langCode] || 'en-US'; // Adjust based on language
        speechSynthesis.cancel(); // Stop any ongoing speech
        speechSynthesis.speak(utterance);
    };

    const hoverAnim = useScale(200);

    return (
        <Container fluid className='py-5 min-vh-100 cs-bg-image d-flex flex-column align-items-center justify-content-center gap-3'>
            <animated.div style={hoverAnim}>
                <Image src={LogoImg} alt='logo' />
            </animated.div>
            <Container>
                <Row>
                    <TranslateSection 
                        setLangOne={setLangOne}
                        languagesSet={languagesSet}
                        langOne={langOne}
                        translatingText={translatingText}
                        setTranslatingText={setTranslatingText}
                        handleTranslate={handleTranslate}
                        handleCopy={handleCopy}
                        speakText={speakText}
                    />
                    <TranslationSection 
                        setLangSec={setLangSec}
                        languagesSet={languagesSet}
                        langSec={langSec}
                        handleSwitch={handleSwitch}
                        translatedText={translatedText}
                        handleCopy={handleCopy}
                        speakText={speakText}
                    />
                </Row>
            </Container>
            <CopyToast 
                showTost={showTost}
                setShowToast={setShowToast}
            />
        </Container>
    );
}

export default TranslateApp;
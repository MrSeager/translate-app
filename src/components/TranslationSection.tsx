import { FC, useState } from 'react';
//Bootstrap
import { Container, Image, Col, Button, Dropdown } from 'react-bootstrap';
//Images
import HTLImg from '../resources/Horizontal_top_left_main.svg';
//Icons
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { LuCopy } from "react-icons/lu";

interface TranslationSectionProps {
    setLangSec: (langSec: string) => void,
    languagesSet: Record<string, string>,
    langSec: string,
    handleSwitch: () => void,
    translatedText: string,
    handleCopy: (textForCopy: string) => void,
    speakText: (text: string, langCode: string) => void,
}

const TranslationSection: FC<TranslationSectionProps> = ({ setLangSec, languagesSet, langSec, handleSwitch, translatedText, handleCopy, speakText }) => {
    const [dropLang, setDropLang] = useState('es');
    
    const handleDropLang = (lang: string) => {
        setLangSec(lang);
        setDropLang(lang);
    }
    
    return (
        <Col lg={6} xs={12} className='py-0 my-1'>
            <Container className='h-100 cs-bg-sec cs-border-one rounded rounded-4 p-3 d-flex flex-column'>
                <Container className='cs-tc-one d-flex gap-3 align-items-center cs-border-sec pb-3'>
                    <Button className={`cs-tc-one cs-transition rounded-4 border-3 cs-btn${langSec === 'en' ? '-active' : ''}`} onClick={() => setLangSec('en')}>English</Button>
                    <Button className={`cs-tc-one cs-transition rounded-4 border-3 cs-btn${langSec === 'fr' ? '-active' : ''}`} onClick={() => setLangSec('fr')}>French</Button>
                    <Dropdown drop='down-centered'>
                        <Dropdown.Toggle id="dropdown-basic" className={`cs-tc-one cs-transition rounded-4 border-3 text-capitalize cs-btn${langSec !== 'en' && langSec !== 'fr' ? '-active' : ''}`}>
                            {languagesSet[dropLang]}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='text-capitalize'>
                            <Dropdown.Item onClick={() => handleDropLang('es')}>Spanish</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropLang('uk')}>Ukrainian</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropLang('de')}>German</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropLang('ja')}>Japanese</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button size='sm' className='bg-transparent border-3 rounded-4 cs-transition cs-btn-sec ms-auto' onClick={handleSwitch}><Image src={HTLImg} alt='img' /></Button>
                </Container>
                    <p className='h-100 cs-tc-one mt-4 p-0'>{translatedText}</p>
                <Container className='px-0 d-flex align-items-center cs-tc-one gap-3'>
                    <Button size='sm' className='bg-transparent border-3 rounded-4 cs-transition cs-btn-sec' onClick={() => speakText(translatedText, langSec)}><HiMiniSpeakerWave size={25} /></Button>
                    <Button size='sm' className='bg-transparent border-3 rounded-4 cs-transition cs-btn-sec' onClick={() => handleCopy(translatedText)}><LuCopy size={25} /></Button>
                </Container>
            </Container>
        </Col>
    );
}

export default TranslationSection;
import { FC } from 'react';
//Components
import { useScale } from './anim.tsx';
//Bootstrap
import { Container, Col, Button, Dropdown, Form } from 'react-bootstrap';
//Icons
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { LuCopy } from "react-icons/lu";
import { PiTextAUnderlineBold } from "react-icons/pi";
//Spring
import { animated } from '@react-spring/web';

interface TranslateSectionProps {
    langOne: string,
    setLangOne: (langOne: string) => void,
    languagesSet: Record<string, string>, 
    translatingText: string,
    setTranslatingText: (translatingText: string) => void, 
    handleTranslate: () => void,
    handleCopy: (textForCopy: string) => void,
    speakText: (text: string, langCode: string) => void,
}

const TranslateSection: FC<TranslateSectionProps> = ({ setLangOne, languagesSet, langOne, translatingText, setTranslatingText, handleTranslate, handleCopy, speakText }) => {
    const scaleAnim = useScale(300);
    
    return (
        <Col lg={6} xs={12} className='py-0 my-1'>
            <animated.div style={scaleAnim} className='container user-select-none cs-bg-one cs-border-one rounded rounded-4 p-3 d-flex flex-column'>
                <Container className='d-flex gap-3 align-items-center cs-border-sec pb-3'>
                    <h1 className='cs-tc-one h6 m-0'>Detect Language</h1>
                    <Button className={`cs-tc-one cs-transition rounded-4 border-3 cs-btn${langOne === 'en' ? '-active' : ''}`} onClick={() => setLangOne('en')}>English</Button>
                    <Button className={`cs-tc-one cs-transition rounded-4 border-3 cs-btn${langOne === 'fr' ? '-active' : ''}`} onClick={() => setLangOne('fr')}>French</Button>
                    <Dropdown drop='down-centered'>
                        <Dropdown.Toggle id="dropdown-basic" className={`cs-tc-one cs-transition rounded-4 border-3 text-capitalize cs-btn${langOne !== 'en' && langOne !== 'fr' ? '-active' : ''}`}>
                            {languagesSet[langOne !== 'en' && langOne !== 'fr' ? langOne : 'es']}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='text-capitalize'>
                            <Dropdown.Item onClick={() => setLangOne('es')}>Spanish</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLangOne('uk')}>Ukrainian</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLangOne('de')}>German</Dropdown.Item>
                            <Dropdown.Item onClick={() => setLangOne('ja')}>Japanese</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
                <Form className='my-3 d-flex flex-column align-items-end'>
                    <Form.Control
                        as='textarea'
                        rows={5}
                        maxLength={500}
                        className='shadow-none px-0 w-100 bg-transparent border-0 cs-tc-one fw-semibold'
                        onChange={(e) => setTranslatingText(e.target.value)}
                        defaultValue={translatingText}
                    />
                    <Form.Text className='cs-tc-one'>
                        {translatingText.length}/500
                    </Form.Text>
                </Form>
                <Container className='px-0 d-flex align-items-end cs-tc-one gap-3'>
                    <Button size='sm' className='bg-transparent border-3 rounded-4 cs-transition cs-btn-sec' onClick={() => speakText(translatingText, langOne)}><HiMiniSpeakerWave size={25} /></Button>
                    <Button size='sm' className='bg-transparent border-3 rounded-4 cs-transition cs-btn-sec' onClick={() => handleCopy(translatingText)}><LuCopy size={25} /></Button>
                    <Button size='lg' className='rounded-4 cs-transition ms-auto cs-btn-thr' onClick={handleTranslate}><PiTextAUnderlineBold size={25} /> Translate</Button>
                </Container>
            </animated.div>
        </Col>
    );
}

export default TranslateSection;
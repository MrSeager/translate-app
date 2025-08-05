import React, { FC, useState } from 'react';
//Components
import './translateAppStyle.css';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Image, Row, Col, Button, Dropdown, Form } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import LogoImg from '../resources/logo.svg';
import HTLImg from '../resources/Horizontal_top_left_main.svg';
//Icons
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { LuCopy } from "react-icons/lu";
import { PiTextAUnderlineBold } from "react-icons/pi";

const TranslateApp: FC = () => {
    const [langOne, setLangOne] = useState('en');
    const [langSec, setLangSec] = useState('fr');

    const [translatingText, setTranslatingText] = useState("Hello, how are you?");
    const [translatedText, setTranslatedText] = useState("");

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

    const languagesSet = {
        'en': 'english',
        'fr': 'french',
        'es': 'spanish',
        'uk': 'ukrainian',
        'de': 'german',
        'ja': 'japanese',
    }
    
    return (
        <Container fluid className='min-vh-100 cs-bg-image d-flex flex-column align-items-center justify-content-center gap-3'>
            <Image src={LogoImg} alt='logo' />
            <Container>
                <Row>
                    <Col lg={6} xs={12} className='py-0 my-1'>
                        <Container className='cs-bg-one cs-border-one rounded rounded-4 p-3 d-flex flex-column'>
                            <Container className='cs-tc-one d-flex gap-3 align-items-center cs-border-sec pb-3'>
                                <h1 className='h5 m-0'>Detect Language</h1>
                                <Button onClick={() => setLangOne('en')}>English</Button>
                                <Button onClick={() => setLangOne('fr')}>French</Button>
                                <Dropdown drop='down-centered'>
                                    <Dropdown.Toggle id="dropdown-basic" className='text-capitalize'>
                                        {languagesSet[langOne]}
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
                            <Container className='px-0 d-flex align-items-center cs-tc-one gap-3'>
                                <Button><HiMiniSpeakerWave size={25} /></Button>
                                <Button><LuCopy size={25} /></Button>
                                <Button className='ms-auto' onClick={handleTranslate}><PiTextAUnderlineBold size={25} /> Translate</Button>
                            </Container>
                        </Container>
                    </Col>
                    <Col lg={6} xs={12} className='py-0 my-1'>
                        <Container className='h-100 cs-bg-sec cs-border-one rounded rounded-4 p-3 d-flex flex-column'>
                            <Container className='cs-tc-one d-flex gap-3 align-items-center cs-border-sec pb-3'>
                                <Button onClick={() => setLangSec('en')}>English</Button>
                                <Button onClick={() => setLangSec('fr')}>French</Button>
                                <Dropdown drop='down-centered'>
                                    <Dropdown.Toggle id="dropdown-basic" className='text-capitalize'>
                                        {languagesSet[langSec]}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='text-capitalize'>
                                        <Dropdown.Item onClick={() => setLangSec('es')}>Spanish</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setLangSec('uk')}>Ukrainian</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setLangSec('de')}>German</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setLangSec('ja')}>Japanese</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button className='ms-auto' onClick={handleSwitch}><Image src={HTLImg} alt='img' /></Button>
                            </Container>
                                <p className='h-100 cs-tc-one mt-3'>{translatedText}</p>
                            <Container className='px-0 d-flex align-items-center cs-tc-one gap-3'>
                                <Button><HiMiniSpeakerWave size={25} /></Button>
                                <Button><LuCopy size={25} /></Button>
                            </Container>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default TranslateApp;
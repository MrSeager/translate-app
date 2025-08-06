import { FC } from 'react';
//Bootstrap
import { Container, Col, Button, Dropdown, Form } from 'react-bootstrap';
//Icons
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { LuCopy } from "react-icons/lu";
import { PiTextAUnderlineBold } from "react-icons/pi";

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
    return (
        <Col lg={6} xs={12} className='py-0 my-1'>
            <Container className='user-select-none cs-bg-one cs-border-one rounded rounded-4 p-3 d-flex flex-column'>
                <Container className='cs-tc-one d-flex gap-3 align-items-center cs-border-sec pb-3'>
                    <h1 className='h6 m-0'>Detect Language</h1>
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
                    <Button onClick={() => speakText(translatingText, langOne)}><HiMiniSpeakerWave size={25} /></Button>
                    <Button onClick={() => handleCopy(translatingText)}><LuCopy size={25} /></Button>
                    <Button className='ms-auto' onClick={handleTranslate}><PiTextAUnderlineBold size={25} /> Translate</Button>
                </Container>
            </Container>
        </Col>
    );
}

export default TranslateSection;
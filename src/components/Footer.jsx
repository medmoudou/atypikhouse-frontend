import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css'
import '../assets/css/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as Brands from '@fortawesome/free-brands-svg-icons';
import { Row, Col, ListGroup, NavDropdown, Button, Image, Form, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import CookieBanner from './CookieBanner';
import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://azurewebsites.us14.list-manage.com/subscribe/post?u=8772cd8c5640c8f3b066847fd&amp;id=484721ae2e&amp;f_id=004a9be0f0";

const SimpleForm = () => <MailchimpSubscribe url={url} />

const Footer = () => {
    let navigate = useNavigate();
    return (
        <>
            <div className='mt-5'>
                <footer className="bg-atypik text-white container-fluid">
                    <Row>
                        <Col className='p-5'>
                            <h5 className='text-white'>MODES DE PAIEMENT:</h5>
                            <div className='d-flex  py-4'>
                                <FontAwesomeIcon className="px-3" icon={Brands.faCcVisa} color="#fff" size="2x" />
                                <FontAwesomeIcon className="px-3" icon={Brands.faCcMastercard} color="#fff" size="2x" />
                                {/* <FontAwesomeIcon className="px-3" icon={Brands.faPaypal} color="#fff" size="2x" /> */}
                            </div>
                            <h5 className='text-white mt-4'>RETROUVEZ-NOUS SUR :</h5>
                            <div className='d-flex pt-4'>
                                <FontAwesomeIcon role='button' onClick={() => window.open('https://www.facebook.com')} className="px-3" icon={Brands.faFacebookF} color="#fff" size="2x" />
                                <FontAwesomeIcon role='button' onClick={() => window.open('https://www.twitter.com')} className="px-3" icon={Brands.faTwitter} color="#fff" size="2x" />
                                <FontAwesomeIcon role='button' onClick={() => window.open('https://www.instagram.com')} className="px-3" icon={Brands.faInstagram} color="#fff" size="2x" />
                                <FontAwesomeIcon role='button' onClick={() => window.open('https://www.linkedin.com')} className="px-3" icon={Brands.faLinkedin} color="#fff" size="2x" />
                                <FontAwesomeIcon role='button' onClick={() => window.open('https://wa.me/')} className="px-3" icon={Brands.faWhatsapp} color="#fff" size="2x" />
                            </div>
                        </Col>
                        <Col className='p-5'>
                            <h5 className='text-white'>LIENS UTILES :</h5>
                            <ListGroup variant="flush" className='mt-4'>
                                <ListGroup.Item role='button' onClick={() => navigate('/devenir-proprietaire')} className='bg-atypik border-0 text-white py-1'>• Devenir propriétaire</ListGroup.Item>
                                <ListGroup.Item role='button' onClick={() => navigate('/contact')} className='bg-atypik border-0 text-white py-1'>• Contactez-nous</ListGroup.Item>
                                <ListGroup.Item role='button' onClick={() => navigate('/about-us')} className='bg-atypik border-0 text-white py-1'>• À propos de nous</ListGroup.Item>
                                <ListGroup.Item role='button' onClick={() => navigate('/cgu')} className='bg-atypik border-0 text-white py-1'>• CGU / CGV</ListGroup.Item>
                                <ListGroup.Item role='button' onClick={() => navigate('/confidentialite')} className='bg-atypik border-0 text-white py-1'>• Politique de confidentialité</ListGroup.Item>
                                <ListGroup.Item role='button' onClick={() => navigate('/faq')} className='bg-atypik border-0 text-white py-1'>• FAQ</ListGroup.Item>
                                <ListGroup.Item role='button' onClick={() => navigate('/plan')} className='bg-atypik border-0 text-white py-1'>• Plan du site</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col className='p-5'>
                            <h5 className='text-white mb-4'>NEWSLETTER:</h5>
                            <span>
                                Inscrivez-vous à nos communications
                                Et accédez aux meilleures offres du
                                moment
                            </span>
                            <div className='subscribe mt-4 bg-white rounded p-4'>
                                <MailchimpSubscribe
                                    url={url}
                                    render={({ subscribe, status, message }) => (
                                        <div style={{ color: "white !important" }}>
                                            <SimpleForm onSubmitted={formData => { subscribe(formData) }} />
                                        </div>
                                    )}
                                />
                            </div>
                            {/* <Form className='mt-3 p-3'>
                                <div className='d-flex'>
                                    <Form.Control type="email" placeholder="Votre email" />
                                    <Button variant="atypik" type="submit">
                                        Inscrire
                                    </Button>
                                </div>
                            </Form> */}
                        </Col>
                    </Row>
                    <Row>
                        <span className='bg-light text-atypik text-center py-2'>© 2023 AtypikHouse - Tous droits réservés</span>
                    </Row>
                </footer>
            </div>
            <CookieBanner />
        </>
    )
}

export default Footer
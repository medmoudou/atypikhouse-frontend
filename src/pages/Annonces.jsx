import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Divider, Empty, Badge, Popconfirm, message } from 'antd';
import bg from '../assets/img/bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL } from '../Variables';

const Annonces = () => {
    let curUser = Cookies.get('user');
    const [houses, setHouses] = useState([]);

    console.log()
    useEffect(() => {
        getHouses()
    }, []);

    const getHouses = () => {
        fetch(API_URL + '/houses?owner.id=' + JSON.parse(curUser)['id'] + '&order[createdAt]=desc')
            .then(res => res.json())
            .then((result) => { setHouses(result["hydra:member"]) })
    }

    return (
        <div>
            <Navbar />
            <Container className='mt-5'>
                <Divider><h2 className='text-center text-blue'>Mes annonces</h2></Divider>
                {/* <div className='row justify-content-md-center mt-5'>
                    <Empty description="Aucune annonce publiée" />
                    <Button variant="atypik" className='mt-5 w-25 btn-sm'>Publier une annonce</Button>
                </div> */}
                <Container>
                    {houses.map((h) => {
                        return <Row className='mt-5 shadow-sm p-sm-3 mx-0'>
                            <Row className='mx-auto text-center'>
                                {h.status == "NEW_LISTING" ? <Badge status="processing" text={<small><strong>En cours de révision</strong></small>} color={'#aeaeae'} />
                                    : h.status == "APPROVED" ? <Badge status="processing" text={<small><strong>Annonce approvée</strong></small>
                                    } color={'#4caf50'} />
                                        : <Badge status="error" text={<small><strong>Annonce rejetée</strong></small>} color={'#f44336'} />}

                            </Row>
                            <Col sm={2} className='text-center'>
                                <Image src={h.images[0] ? h.images[0].filePath + '/' + h.images[0].fileName : null} height={100} width={150} style={{ objectFit: 'cover' }} />
                            </Col>
                            <Col sm={8}>

                                <h5 className='m-0'>{h.title}</h5>
                                <small>{h.description}</small>
                                <div className='d-flex'>
                                    <div className='p-3'>
                                        <FontAwesomeIcon icon={Icons.faEuroSign} color="#8ed081" /> <small>{h.price}</small>
                                    </div>
                                    <div className='p-3'>
                                        <FontAwesomeIcon icon={Icons.faPeopleGroup} color="#8ed081" /> <small>{h.nbPerson}</small>
                                    </div>
                                    <div className='p-3'>
                                        <FontAwesomeIcon icon={Icons.faPersonShelter} color="#8ed081" /> <small>{h.rooms}</small>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={2}>
                                <Button variant='flat' className='text-warning btn-sm w-100'><FontAwesomeIcon icon={Icons.faEye} /> Voir</Button>
                                <Button variant='flat' className='text-black btn-sm w-100'><FontAwesomeIcon icon={Icons.faEdit} /> Modifier</Button>
                                <Popconfirm title="Voulez-vous vraiment supprimer cette annonce?" onConfirm={() =>
                                    fetch(API_URL + '/houses/' + h.id, {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': 'bearer ' + Cookies.get("token"),
                                            'Content-Type': 'application/merge-patch+json'
                                        }
                                    })
                                        .then(
                                            (result) => {
                                                if (result.status == 204) {
                                                    message.success('L\'annonce à été supprimée avec succès');
                                                } else {
                                                    message.error('Impossible de l\'annonce veuillez contacter l\'administration');
                                                }
                                                getHouses();
                                            }
                                        )
                                } onOpenChange={() => console.log('open change')}>
                                    <Button variant='flat' className='text-danger btn-sm w-100'><FontAwesomeIcon icon={Icons.faTrash} /> Supprimer</Button>
                                </Popconfirm>

                            </Col>
                        </Row>
                    })}
                </Container>

            </Container >
            <Footer />
        </div >
    )
}

export default Annonces
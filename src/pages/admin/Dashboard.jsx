import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'
import { API_URL } from '../../Variables';
import { useState } from 'react';
import { Skeleton } from 'antd';

const Dashboard = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        document.title = "Admin panel - AtypikHouse";

        fetch(API_URL + '/stats', {
            headers: {
                'Authorization': 'bearer ' + Cookies.get("token"),
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setLoading(false);
                },
                (error) => {
                    console.log(error)
                }
            )
    }, []);

    let curUser = Cookies.get('user');

    if (!curUser) {
        console.log("NOT LOGED")
    }
    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className='p-5'>
                <Skeleton paragraph={false} loading={loading} active>
                    <Row>
                        <Col className='px-5'>
                            <Container className='bg-atypik text-white py-3 px-0 pb-0 text-center rounded shadow-sm'>
                                <Container>
                                    <p>Total des annonces</p>
                                    <div className='d-flex align-items-center justify-content-around'>
                                        <FontAwesomeIcon icon={Icons.faFile} className='me-3' size='3x' />
                                        <h3 className='m-0 text-white '>
                                            {items.houses_all}
                                        </h3>
                                    </div>
                                </Container>
                                <Container className='mt-3 py-2 bg-light d-flex align-items-centers justify-content-center'>
                                    <small className='text-blue'>{items.houses_pending} en attente de validation</small>
                                </Container>
                            </Container>
                        </Col>
                        <Col className='px-5'>
                            <Container className='bg-warning text-white py-3 px-0 pb-0 text-center rounded shadow-sm'>
                                <Container>
                                    <p>Total des réservations</p>
                                    <div className='d-flex align-items-center justify-content-around'>
                                        <FontAwesomeIcon icon={Icons.faCartShopping} className='me-3' size='3x' />
                                        <h3 className='m-0 text-white '>
                                            {items.reservations_all}
                                        </h3>
                                    </div>
                                </Container>
                                <Container className='mt-3 py-2 bg-light d-flex align-items-centers justify-content-center'>
                                    <small className='text-blue'>{items.reservations_canceled} réservations annulé</small>
                                </Container>
                            </Container>
                        </Col >
                        <Col className='px-5'>
                            <Container className='bg-danger text-white py-3 px-0 pb-0 text-center rounded shadow-sm'>
                                <Container>
                                    <p>Total des utilisateurs</p>
                                    <div className='d-flex align-items-center justify-content-around'>
                                        <FontAwesomeIcon icon={Icons.faUsers} className='me-3' size='3x' />
                                        <h3 className='m-0 text-white '>
                                            {items.users}
                                        </h3>
                                    </div>
                                </Container>
                                <Container className='mt-3 py-2 bg-light d-flex align-items-centers justify-content-center'>
                                    <small className='text-blue'>{items.users_hotes} hôte</small>
                                </Container>
                            </Container>
                        </Col>
                    </Row >
                </Skeleton>
                {/* <Row>
                    <Col sm={6} className='mt-5'>
                        <Divider orientation="left">les dérniers 5 annonces <small><Button size='sm' variant='flat p-0 text-atypik'>- Gérer les annonces </Button></small> </Divider>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titre</th>
                                    <th>Destination</th>
                                    <th>Prix</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Lorem ipsum dolor sit amet</td>
                                    <td>Paris, France</td>
                                    <td>300</td>
                                    <td><Badge bg="atypik">Accepté</Badge></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Lorem ipsum dolor sit amet</td>
                                    <td>Paris, France</td>
                                    <td>300</td>
                                    <td><Badge bg="danger">Rejeté</Badge></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col> 
                </Row>*/}
            </Container >
        </div >

    )
}

export default Dashboard
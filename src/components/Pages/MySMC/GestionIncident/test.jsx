import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Données simulées pour les graphiques
  const dataLine = [
    { name: 'Semaine 1', taux4H: 75, taux24H: 90 },
    { name: 'Semaine 2', taux4H: 85, taux24H: 92 },
    { name: 'Semaine 3', taux4H: 80, taux24H: 94 },
  ];

  const dataPie = [
    { name: 'Ouverts', value: 200 },
    { name: 'Fermés', value: 1300 },
    { name: 'Annulés', value: 50 },
  ];

  return (
    <Container fluid className="p-4">
      <h2>Gestion des avis d'incidents - Indicateurs du mois en cours : Janvier 2024</h2>

      <Row className="mt-4">
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#cce5ff" }}>
            <Card.Body>
              <Card.Title>Total Avis Incidents</Card.Title>
              <h3>1500</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#f8d7da" }}>
            <Card.Body>
              <Card.Title>Taux Notification Avis</Card.Title>
              <h3>78%</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#d1ecf1" }}>
            <Card.Body>
              <Card.Title>Taux Détection Avis</Card.Title>
              <h3>70%</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#d4edda" }}>
            <Card.Body>
              <Card.Title>Taux Traitement 4H</Card.Title>
              <h3>85%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#d4edda" }}>
            <Card.Body>
              <Card.Title>Taux Traitement 24H</Card.Title>
              <h3>92%</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#f8d7da" }}>
            <Card.Body>
              <Card.Title>Taux Avis Annulés</Card.Title>
              <h3>5%</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#d4edda" }}>
            <Card.Body>
              <Card.Title>Total Avis Clos (Délais)</Card.Title>
              <h3>1300</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="text-center" style={{ backgroundColor: "#ffeeba" }}>
            <Card.Body>
              <Card.Title>Total Avis Ouverts</Card.Title>
              <h3>200</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12} md={6} className="mb-4">
          <h4>Évolution du Taux de Traitement</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataLine}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="taux4H" stroke="#82ca9d" />
              <Line type="monotone" dataKey="taux24H" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Col>

        <Col xs={12} md={6} className="mb-4">
          <h4>Répartition des Incidents</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12}>
          <h4>Comparaison des Taux</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataLine}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="taux4H" fill="#82ca9d" />
              <Bar dataKey="taux24H" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

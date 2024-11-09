import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useAuth from '@/store/useAuth';
import { useUserInfo } from '@/api/hooks/getUserInfo';
import styles from '@/styles/navbar.module.css';
import { FaBars } from 'react-icons/fa'; // Icono de hamburguesa
import Logo from '@/assets/jobkler-logo.webp';

const NavBar = () => {
  const auth = useAuth((state) => state.auth);
  const logout = useAuth((state) => state.logout);
  const { data: userInfo } = useUserInfo();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className={`${styles.bgColorNavbar} fixed-top`}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={Logo} alt="Jobkler Logo" width={60} height={40} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars style={{ color: '#F7C04A' }} />  {/* Icono de hamburguesa */}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link className={styles.navLink}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/resources">
              <Nav.Link className={styles.navLink}>Recursos</Nav.Link>
            </LinkContainer>

            {!auth && (
              <>
                <LinkContainer to="/register">
                  <Nav.Link className={styles.navLink}>Registro</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link className={styles.navLink}>Iniciar Sesión</Nav.Link>
                </LinkContainer>
              </>
            )}

            {auth && (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link className={styles.navLink}>Perfil</Nav.Link>
                </LinkContainer>
                <Nav.Link className={styles.navLink} onClick={handleLogout}>
                  Cerrar Sesión
                </Nav.Link>
                <Nav.Item className={`${styles.navUserInfo} ms-md-4`}>
                  <span>Hola, {userInfo?.username}</span>  {/* Mostrar el username */}
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

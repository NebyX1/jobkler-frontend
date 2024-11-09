import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import ProfileCard from '@/components/search/ProfileCard';
import SearchBox from '@/components/search/SearchBox';
import { useGetProfiles } from '@/api/hooks/getProfiles';
import { useGetProfessions } from '@/api/hooks/getProfessions';
import { useGetLocations } from '@/api/hooks/getLocations';
import ReactPaginate from 'react-paginate';
import axios from '@/api/axios';
import styles from '@/styles/results.module.css';

const ResultsPage = () => {
  const { slug } = useParams();
  const [professionCode, setProfessionCode] = useState('');
  const [locationCode, setLocationCode] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Obtener listas de profesiones y localidades usando los hooks
  const { data: professions = [], isLoading: isProfessionsLoading } = useGetProfessions();
  const { data: locations = [], isLoading: isLocationsLoading } = useGetLocations();

  // Extraer códigos desde el slug
  useEffect(() => {
    if (slug) {
      const [profCode, locCode] = slug.split('-');
      setProfessionCode(profCode || '');
      setLocationCode(locCode || '');
      setCurrentPage(0); // Resetear página al cambiar filtros
    }
  }, [slug]);

  // Obtener perfiles filtrados por códigos
  const { data: profiles = [], isLoading, isError } = useGetProfiles(professionCode, locationCode);

  // Función para mezclar los perfiles aleatoriamente
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Mezcla los perfiles antes de paginar
  const shuffledProfiles = shuffleArray([...profiles]);
  const pageCount = Math.ceil(shuffledProfiles.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentProfiles = shuffledProfiles.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Función para mapear código a nombre basado en código
  const getNameByCode = (code, list) => {
    const item = list.find((element) => element.code === code);
    return item ? item.name : '';
  };

  // Función para mapear ID a nombre basado en ID
  const getNameById = (id, list) => {
    const item = list.find((element) => element.id === parseInt(id, 10));
    return item ? item.name : '';
  };

  // Obtener los nombres de la profesión y la localidad buscadas usando getNameByCode
  const searchedProfessionName = getNameByCode(professionCode, professions);
  const searchedLocationName = getNameByCode(locationCode, locations);

  // Estado para profesiones disponibles en el departamento
  const [availableProfessions, setAvailableProfessions] = useState([]);

  // Efecto para obtener profesiones disponibles si no hay perfiles
  useEffect(() => {
    const fetchAvailableProfessions = async () => {
      if (locationCode && !isLoading && professions.length > 0 && currentProfiles.length === 0) {
        try {
          // Obtener perfiles solo por departamento utilizando locationCode
          const params = { location: locationCode };
          const { data: profilesByLocation } = await axios.get('api/profiles/', { params });

          // Extraer IDs de profesión y eliminar duplicados
          const professionIds = [...new Set(profilesByLocation.map(profile => profile.profession).filter(Boolean))];

          // Mapear IDs a nombres usando getNameById
          const availableProfNames = professionIds.map(id => getNameById(id, professions)).filter(Boolean);

          setAvailableProfessions(availableProfNames);
        } catch (error) {
          console.error('Error al obtener profesiones disponibles por departamento:', error);
        }
      } else if (currentProfiles.length > 0) {
        setAvailableProfessions([]);
      }
    };

    if (locationCode && !isLoading) {
      fetchAvailableProfessions();
    }
  }, [locationCode, professions, currentProfiles.length, isLoading]); // Dependencias para ejecutar el efecto solo cuando sea necesario

  return (
    <div className={styles.container}>
      <div className={styles.searchBoxContainer}>
        <SearchBox />
      </div>
      <div className={styles.searchParams}>
        <h1 className={styles.title}>Resultados de búsqueda</h1>
        <p className={styles.text}>
          <span className={styles.bold}>Servicio:</span> {isProfessionsLoading ? 'Cargando...' : (searchedProfessionName || 'Todos')}
        </p>
        <p className={styles.text}>
          <span className={styles.bold}>Departamento:</span> {isLocationsLoading ? 'Cargando...' : (searchedLocationName || 'Todos')}
        </p>
      </div>
      <div className={styles.resultsGrid}>
        {isLoading ? (
          <p>Cargando resultados...</p>
        ) : isError ? (
          <p>Error al cargar los resultados.</p>
        ) : currentProfiles.length > 0 ? (
          currentProfiles.map((profile) => (
            <ProfileCard
              key={profile.user}
              id={profile.user}
              nombre={profile.name}
              apellido={profile.surname}
              telefono={profile.phone}
              profile_image={profile.header}
              sobre_mi={profile.about}
              business_image={profile.portfolio1}
            />
          ))
        ) : (
          <div>
            <p className={styles.noResults}>No hay profesionales disponibles en esta categoría.</p>
            {availableProfessions.length > 0 && (
              <div>
                <p>Profesiones disponibles en {searchedLocationName}:</p>
                <ul>
                  {availableProfessions.map((profName) => (
                    <li key={profName}>{profName}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Componente de paginación */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={styles.paginationContainer}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          previousClassName={styles.pageItem}
          nextClassName={styles.pageItem}
          previousLinkClassName={styles.pageLink}
          nextLinkClassName={styles.pageLink}
          disabledClassName={styles.disabled}
          activeClassName={styles.activePage}
        />
      )}
    </div>
  );
};

export default ResultsPage;

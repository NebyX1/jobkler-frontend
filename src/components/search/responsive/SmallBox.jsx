import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useGetLocations } from "@/api/hooks/getLocations";
import { useGetProfessions } from "@/api/hooks/getProfessions";
import styles from '@/styles/smallsearchbox.module.css';

const schema = yup.object().shape({
  servicio: yup.string().required('Por favor selecciona un servicio'),
  departamento: yup.string().required('Por favor selecciona un departamento'),
});

const SmallBox = () => {
  const navigate = useNavigate();
  const { data: locations = [], isLoading: loadingLocations, isError: isLocationsError } = useGetLocations();
  const { data: professions = [], isLoading: loadingProfessions, isError: isProfessionsError } = useGetProfessions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { servicio, departamento } = data;
    navigate(`/results/${encodeURIComponent(servicio)}-${encodeURIComponent(departamento)}`);
  };

  // Función para mapear código a nombre (opcional, si deseas mostrar los nombres en otro contexto)
  const getNameByCode = (code, list) => {
    const item = list.find((element) => element.code === code);
    return item ? item.name : '';
  };

  return (
    <div className={`${styles.container} p-4`}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Select para Profesiones */}
        <select
          className={`${styles.select} ${errors.servicio ? styles.inputError : ''}`}
          {...register('servicio')}
          defaultValue=""
        >
          <option value="" disabled hidden>
            {loadingProfessions ? 'Cargando servicios...' : 'Selecciona un servicio'}
          </option>
          {professions.map((profession) => (
            <option key={profession.code} value={profession.code}>
              {profession.name.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
        {errors.servicio && <p className={styles.errorText}>{errors.servicio.message}</p>}

        {/* Select para Departamentos */}
        <select
          className={`${styles.select} ${errors.departamento ? styles.inputError : ''}`}
          {...register('departamento')}
          defaultValue=""
        >
          <option value="" disabled hidden>
            {loadingLocations ? 'Cargando ubicaciones...' : 'Selecciona tu departamento'}
          </option>
          {locations.map((location) => (
            <option key={location.code} value={location.code}>
              {location.name.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
        {errors.departamento && <p className={styles.errorText}>{errors.departamento.message}</p>}

        <button type="submit" className={styles.button}>
          Buscar
        </button>
      </form>

      {/* Contenedor de Errores Globales (Opcional) */}
      {/* 
      <div className={styles.errorContainer}>
        {isProfessionsError && <p className={styles.errorText}>Error al cargar profesiones.</p>}
        {isLocationsError && <p className={styles.errorText}>Error al cargar ubicaciones.</p>}
      </div> 
      */}
    </div>
  );
};

export default SmallBox;
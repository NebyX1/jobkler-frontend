import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useGetLocations } from "@/api/hooks/getLocations";
import { useGetProfessions } from "@/api/hooks/getProfessions";
import styles from '@/styles/bigsearchbox.module.css';

const schema = yup.object().shape({
  servicio: yup.string().required('Por favor selecciona un servicio'),
  departamento: yup.string().required('Por favor selecciona un departamento'),
});

const BigBox = () => {
  const navigate = useNavigate();
  const { data: locations = [], isLoading: loadingLocations } = useGetLocations();
  const { data: professions = [], isLoading: loadingProfessions } = useGetProfessions();

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

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Select para Profesiones */}
        <select
          className={`${styles.select} ${errors.servicio ? styles.inputError : ''}`}
          {...register('servicio')}
          defaultValue=""
        >
          <option value="" disabled hidden>
            {loadingProfessions ? 'Cargando profesiones...' : 'Selecciona un servicio'}
          </option>
          {professions.map((profession) => (
            <option key={profession.code} value={profession.code}>
              {profession.name.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>

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

        <button type="submit" className={styles.button}>
          Buscar
        </button>
      </form>

      {/* Contenedor de Errores */}
      <div className={styles.errorContainer}>
        {errors.servicio && <p className={styles.errorText}>{errors.servicio.message}</p>}
        {errors.departamento && <p className={styles.errorText}>{errors.departamento.message}</p>}
      </div>
    </div>
  );
};

export default BigBox;


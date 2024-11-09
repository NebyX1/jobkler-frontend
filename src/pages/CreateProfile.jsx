import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import HeaderSection from "@/components/createProfile/HeaderSection";
import CreateProfileForm from "@/components/createProfile/CreateProfileForm";
import Snippet from "@/snippet/Snippet";
import styles from "@/styles/createprofile.module.css";
import { useGetLocations } from "@/api/hooks/getLocations";
import { useGetProfessions } from "@/api/hooks/getProfessions";
import { useCreateUserProfile } from "@/api/hooks/useCreateUserProfile";
import { useUserInfo } from "@/api/hooks/getUserInfo";
import { useUserProfile } from "@/api/hooks/getUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Obtener la información del usuario
  const { data: userInfo, isLoading: userInfoLoading } = useUserInfo();

  // Obtener el perfil del usuario
  const {
    data: userProfile,
    error: profileError,
    isLoading: profileLoading,
    isError: profileIsError,
  } = useUserProfile(userInfo?.id);

  // Obtener ubicaciones y profesiones
  const { data: locations = [] } = useGetLocations();
  const { data: professions = [] } = useGetProfessions();

  // Hook para crear perfil de usuario
  const { mutate: createUserProfile, isLoading: isCreating } = useCreateUserProfile();

  const userId = userInfo?.id;

  useEffect(() => {
    if (!userInfo && !userInfoLoading) {
      navigate("/login", { replace: true });
    }
    if (userProfile && !profileLoading) {
      navigate("/profile", { replace: true });
    }
  }, [userInfo, userProfile, navigate, userInfoLoading, profileLoading]);

  const handleSubmit = (data) => {
    const profileData = {
      ...data,
    };

    createUserProfile(profileData, {
      onSuccess: () => {
        toast.success("Perfil creado exitosamente");

        // Invalidamos la consulta del perfil de usuario
        queryClient.invalidateQueries(["userProfile", userId]);

        // Redirigimos al usuario al perfil
        navigate(`/profile`);
      },
      onError: (error) => {
        toast.error(error.message || "Error al crear el perfil");
      },
    });
  };

  if (userInfoLoading || profileLoading) {
    return <p className="mt-5">Cargando...</p>;
  }

  if (
    profileIsError &&
    profileError?.response?.data?.detail !== "Este usuario no tiene un perfil creado"
  ) {
    return <p>Error al obtener la información del perfil.</p>;
  }

  return (
    <section className={styles.createProfileSection}>
      <Snippet pageName="Crear Perfil" />
      <HeaderSection />
      <Container className={`${styles.formContainer} m-auto m-2 p-2 mt-2`}>
        <CreateProfileForm
          onSubmit={handleSubmit}
          professions={professions}
          locations={locations}
          userId={userId}
        />
      </Container>
    </section>
  );
};

export default CreateProfile;
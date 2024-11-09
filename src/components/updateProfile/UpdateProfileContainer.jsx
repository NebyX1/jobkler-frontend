import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUserInfo } from "@/api/hooks/getUserInfo";
import { useUserProfile } from "@/api/hooks/getUserProfile";
import { useUpdateProfile } from "@/api/hooks/useUpdateProfile";
import { useGetLocations } from "@/api/hooks/getLocations";
import { useGetProfessions } from "@/api/hooks/getProfessions";
import { useQueryClient } from "@tanstack/react-query";
import Snippet from "@/snippet/Snippet";
import UpdateProfileForm from "./UpdateProfileForm";
import HeaderSection from "./HeaderSection";
import styles from "@/styles/createprofile.module.css";
import ChatBot from "@/components/bot/ChatBot";
import { BsChatDotsFill } from "react-icons/bs";

const UpdateProfileContainer = () => {
  const navigate = useNavigate();
  const [chatVisible, setChatVisible] = useState(false);

  const { data: userInfo, isLoading: userInfoLoading } = useUserInfo();
  const userId = userInfo?.id;
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading: profileLoading } =
    useUserProfile(userId);
  const { mutate: updateProfile, isLoading: isUpdating } = useUpdateProfile();
  const { data: locations = [] } = useGetLocations();
  const { data: professions = [] } = useGetProfessions();

  useEffect(() => {
    if (!userInfo && !userInfoLoading) {
      navigate("/login", { replace: true });
      return;
    }
    if (!profileLoading && userProfile === null) {
      toast.error(
        "No tienes un perfil creado. Por favor, crea un perfil primero."
      );
      navigate("/create-profile", { replace: true });
    }
  }, [userInfo, userInfoLoading, profileLoading, userProfile, navigate]);

  const onSubmit = (data) => {
    updateProfile(
      { userId, profileData: data },
      {
        onSuccess: () => {
          toast.success("Perfil actualizado exitosamente");
          queryClient.invalidateQueries(["userProfile", userId]);
          navigate(`/profile`);
        },
        onError: (error) => {
          toast.error(error.message || "Error al actualizar el perfil");
        },
      }
    );
  };

  if (userInfoLoading || profileLoading) {
    return <p className="mt-5">Cargando...</p>;
  }

  if (userProfile === null) {
    return null;
  }

  return (
    <>
      <section className={styles.createProfileSection}>
        <Snippet pageName="Actualizar Perfil" />
        <HeaderSection />
        <Container className={`${styles.formContainer} m-auto m-2 p-2 mt-2`}>
          <UpdateProfileForm
            onSubmit={onSubmit}
            userProfile={userProfile}
            professions={professions}
            locations={locations}
            userId={userId}
          />
        </Container>
      </section>

      {/* Botón del chat siempre visible en la esquina inferior derecha */}
      <div
        className={styles.chatButton}
        onClick={() => setChatVisible(!chatVisible)}
      >
        <BsChatDotsFill size={30} color="white" />
      </div>

      {chatVisible && <ChatBot />}
    </>
  );
};

export default UpdateProfileContainer;

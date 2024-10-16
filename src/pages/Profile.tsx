import React, { useEffect, useState } from 'react';
import { account } from '../appwrite';


const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await account.get();
        setUserProfile(user);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      {userProfile ? (
        <div>
          <p><strong>Nome:</strong> {userProfile.name}</p>
          <p><strong>E-mail:</strong> {userProfile.email}</p>
        </div>
      ) : (
        <p>Carregando perfil...</p>
      )}
    </div>
  );
};

export default Profile;

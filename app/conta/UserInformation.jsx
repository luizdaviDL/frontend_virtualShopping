import React, { useState } from "react";

export const UserInformation = ({ state, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [expandedAddress, setExpandedAddress] = useState(null);
  const [profileData, setProfileData] = useState(state.user);
  const [isSaving, setIsSaving] = useState(false);


const handleSaveProfile = async (e) => {
  e.preventDefault();

  try {
    setIsSaving(true);

    // 🔧 Monta payload formatado para o backend
    const payloadClientInfo = {
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      password: profileData.password, // aqui estava "password" por engano
    };

    // Se o backend espera um array de endereços diretamente:
    const payloadAdressClient = profileData.adressList?.data || [];

    // --- 1️⃣ Atualiza dados do cliente ---
    const responseClient = await fetch("http://localhost:8081/client/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadClientInfo),
    });

    if (!responseClient.ok) {
      throw new Error("Erro ao salvar os dados do cliente");
    }

    const updatedUser = await responseClient.json();

    // --- 2️⃣ Atualiza endereços do cliente ---
    const responseAdress = await fetch("http://localhost:8081/clientAdress/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadAdressClient),
    });

    if (!responseAdress.ok) {
      throw new Error("Erro ao salvar os dados de endereço");
    }

    const updatedUserAdress = await responseAdress.json();

    // --- 3️⃣ Atualiza o estado global ---
    dispatch({
      type: "UPDATE_USER",
      payload: {
        ...updatedUser,
        adressList: { data: updatedUserAdress },
      },
    });

    setIsEditing(false);
    alert("Informações atualizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar perfil:", error);
    alert("Ocorreu um erro ao salvar suas informações. Tente novamente.");
  } finally {
    setIsSaving(false);
  }
};



  const handleCancelEdit = () => {
    setProfileData(state.user);
    setIsEditing(false);
  };

  const handleProfileChange = (e, addressIndex) => {
    const { name, value } = e.target;

    if (addressIndex !== undefined) {
      // Atualiza o endereço correto dentro de adressList.data
      const updatedAddresses = profileData.adressList.data.map((addr, idx) =>
        idx === addressIndex ? { ...addr, [name]: value } : addr
      );

      setProfileData({
        ...profileData,
        adressList: {
          ...profileData.adressList,
          data: updatedAddresses,
        },
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const toggleAddress = (index) => {
    setExpandedAddress(expandedAddress === index ? null : index);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold">Meu Perfil</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Editar Informações
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveProfile}>
        {/* ==================== INFORMAÇÕES PESSOAIS ==================== */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Informações Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome completo</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                name="password"
                value={profileData.password}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>

          </div>
        </div>

        {/* ==================== ENDEREÇOS ==================== */}
        <div>
          <h3 className="font-medium mb-4">Endereços de Entrega</h3>

          {profileData.adressList?.data?.length > 0 ? (
            profileData.adressList.data.map((address, index) => (
              <div
                key={index}
                className="border border-border rounded-md p-4 mb-3 bg-background"
              >
                {/* Cabeçalho do endereço */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold">
                    {address.city} - {address.neighborhood}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleAddress(index)}
                    className="text-sm text-primary hover:underline"
                  >
                    {expandedAddress === index ? "Ocultar detalhes" : "Ver detalhes"}
                  </button>
                </div>

                {/* Campos detalhados */}
                {expandedAddress === index && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">CEP</label>
                      <input
                        type="text"
                        name="cep"
                        value={address.cep || ""}
                        onChange={(e) => handleProfileChange(e, index)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Estado</label>
                      <input
                        type="text"
                        name="state"
                        value={address.state || ""}
                        onChange={(e) => handleProfileChange(e, index)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Endereço</label>
                      <input
                        type="text"
                        name="adress"
                        value={address.adress || ""}
                        onChange={(e) => handleProfileChange(e, index)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Número</label>
                      <input
                        type="text"
                        name="numberHome"
                        value={address.numberHome || ""}
                        onChange={(e) => handleProfileChange(e, index)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Complemento</label>
                      <input
                        type="text"
                        name="complement"
                        value={address.complement || ""}
                        onChange={(e) => handleProfileChange(e, index)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Bairro</label>
                      <input
                        type="text"
                        name="neighborhood"
                        value={address.neighborhood || ""}
                        onChange={(e) => handleProfileChange(e, index)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={address.city || ""}
                        onChange={(e) => handleProfileChange(e, index)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum endereço cadastrado.</p>
          )}
        </div>
      </form>
    </div>
  );
};

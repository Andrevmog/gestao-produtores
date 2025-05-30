import { useProducers } from '../../../contexts/ProducersContext';
import { useState } from 'react';
import styles from "./ProducerList.module.scss";
import type { Producer, Farm, Crop } from '../../../utils/types';


export const ProducerList = () => {
  const { producers, deleteProducer, editProducer } = useProducers();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Omit<Producer, 'id'> | null>(null);

  const startEditing = (producer: Producer) => {
    setEditingId(producer.id);
    setEditForm({
      name: producer.name,
      documentType: producer.documentType,
      document: producer.document,
      farms: [...producer.farms]
    });
  };

  const handleEditSubmit = (id: string) => {
    if (editForm) {
      editProducer(id, editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleFarmChange = (
  farmIndex: number,
  field: keyof Farm,
  value: Farm[keyof Farm]
) => {
  if (!editForm) return;
  
  const updatedFarms = [...editForm.farms];
  updatedFarms[farmIndex] = { ...updatedFarms[farmIndex], [field]: value };
  
  setEditForm({ ...editForm, farms: updatedFarms });
};

  const handleCropChange = (farmIndex: number, cropIndex: number, field: keyof Crop, value: string) => {
    if (!editForm) return;
    
    const updatedFarms = [...editForm.farms];
    const updatedCrops = [...updatedFarms[farmIndex].crops];
    updatedCrops[cropIndex] = { ...updatedCrops[cropIndex], [field]: value };
    updatedFarms[farmIndex] = { ...updatedFarms[farmIndex], crops: updatedCrops };
    
    setEditForm({ ...editForm, farms: updatedFarms });
  };

  return (
    <div className={styles.container}>
      <h2>Produtores Cadastrados</h2>
      {producers.length === 0 ? (
        <p>Nenhum produtor cadastrado ainda.</p>
      ) : (
        <div className={styles.list}>
          {producers.map(producer => (
            <div key={producer.id} className={styles.producer}>
              {editingId === producer.id && editForm ? (
                <div className={styles.editForm}>
                  <h3>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </h3>
                  <p>
                    <strong>Documento:</strong>
                    <select
                      value={editForm.documentType}
                      onChange={(e) => setEditForm({
                        ...editForm, 
                        documentType: e.target.value as 'CPF' | 'CNPJ'
                      })}
                    >
                      <option value="CPF">CPF</option>
                      <option value="CNPJ">CNPJ</option>
                    </select>
                    <input
                      type="text"
                      value={editForm.document}
                      onChange={(e) => setEditForm({...editForm, document: e.target.value})}
                    />
                  </p>
                  <div>
                    <h4>Fazendas:</h4>
                    {editForm.farms.map((farm, farmIndex) => (
                      <div key={farmIndex} className={styles.farmEdit}>
                        <p>
                          <strong>Nome:</strong>
                          <input
                            type="text"
                            value={farm.name}
                            onChange={(e) => handleFarmChange(farmIndex, 'name', e.target.value)}
                          />
                        </p>
                        <p>
                          <strong>Localização:</strong>
                          <input
                            type="text"
                            value={farm.city}
                            onChange={(e) => handleFarmChange(farmIndex, 'city', e.target.value)}
                            placeholder="Cidade"
                          />
                          <input
                            type="text"
                            value={farm.state}
                            onChange={(e) => handleFarmChange(farmIndex, 'state', e.target.value)}
                            placeholder="Estado"
                          />
                        </p>
                        <p>
                          <strong>Áreas:</strong>
                          <input
                            type="number"
                            value={farm.totalArea}
                            onChange={(e) => handleFarmChange(farmIndex, 'totalArea', Number(e.target.value))}
                            placeholder="Total (ha)"
                          />
                          <input
                            type="number"
                            value={farm.arableArea}
                            onChange={(e) => handleFarmChange(farmIndex, 'arableArea', Number(e.target.value))}
                            placeholder="Agricultável (ha)"
                          />
                          <input
                            type="number"
                            value={farm.vegetationArea}
                            onChange={(e) => handleFarmChange(farmIndex, 'vegetationArea', Number(e.target.value))}
                            placeholder="Vegetação (ha)"
                          />
                        </p>
                        <div>
                          <strong>Culturas:</strong>
                          <button 
                            onClick={() => {
                              const updatedFarms = [...editForm.farms];
                              updatedFarms[farmIndex].crops.push({ type: '', harvestYear: '' });
                              setEditForm({...editForm, farms: updatedFarms});
                            }}
                          >
                            Adicionar Cultura
                          </button>
                          <ul>
                            {farm.crops.map((crop, cropIndex) => (
                              <li key={cropIndex}>
                                <input
                                  type="text"
                                  value={crop.type}
                                  onChange={(e) => handleCropChange(farmIndex, cropIndex, 'type', e.target.value)}
                                  placeholder="Tipo de cultura"
                                />
                                <input
                                  type="text"
                                  value={crop.harvestYear}
                                  onChange={(e) => handleCropChange(farmIndex, cropIndex, 'harvestYear', e.target.value)}
                                  placeholder="Ano safra"
                                />
                                <button
                                  onClick={() => {
                                    const updatedFarms = [...editForm.farms];
                                    updatedFarms[farmIndex].crops.splice(cropIndex, 1);
                                    setEditForm({...editForm, farms: updatedFarms});
                                  }}
                                >
                                  Remover
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.editActions}>
                    <button onClick={() => handleEditSubmit(producer.id)}>
                      Salvar
                    </button>
                    <button onClick={() => {
                      setEditingId(null);
                      setEditForm(null);
                    }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3>{producer.name}</h3>
                  <p>
                    <strong>Documento:</strong> {producer.documentType} {producer.document}
                  </p>
                  <div>
                    <h4>Fazendas:</h4>
                    {producer.farms.map((farm, farmIndex) => (
                      <div key={farmIndex} className={styles.farm}>
                        <p><strong>Nome:</strong> {farm.name}</p>
                        <p><strong>Localização:</strong> {farm.city}, {farm.state}</p>
                        <p><strong>Áreas:</strong> Total: {farm.totalArea} ha | Agricultável: {farm.arableArea} ha | Vegetação: {farm.vegetationArea} ha</p>
                        <div>
                          <strong>Culturas:</strong>
                          <ul>
                            {farm.crops.map((crop, cropIndex) => (
                              <li key={cropIndex}>
                                {crop.type} (Safra {crop.harvestYear})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.actions}>
                    <button 
                      onClick={() => startEditing(producer)}
                      className={styles.editButton}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => deleteProducer(producer.id)}
                      className={styles.deleteButton}
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
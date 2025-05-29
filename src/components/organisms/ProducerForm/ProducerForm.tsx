import { useState } from "react";
import { useProducers } from "../../../contexts/ProducersContext";
import styles from "./ProducerForm.module.scss";

export const ProducerForm = () => {
  const { addProducer } = useProducers();
  const [form, setForm] = useState({
    documentType: "CPF" as const,
    document: "",
    name: "",
    farmName: "",
    city: "",
    state: "",
    totalArea: 0,
    arableArea: 0,
    vegetationArea: 0,
    crops: [] as Array<{ type: string; harvestYear: string }>,
  });

  const [currentCrop, setCurrentCrop] = useState({
    type: "",
    harvestYear: new Date().getFullYear().toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      Number(form.arableArea) + Number(form.vegetationArea) >
      Number(form.totalArea)
    ) {
      alert(
        "A soma das áreas agricultável e de vegetação não pode ser maior que a área total"
      );
      return;
    }

    if (
      (form.documentType === "CPF" && form.document.length !== 11) ||
      (form.documentType === "CNPJ" && form.document.length !== 14)
    ) {
      alert("Documento inválido");
      return;
    }

    const newProducer = {
      documentType: form.documentType,
      document: form.document,
      name: form.name,
      farms: [
        {
          name: form.farmName,
          city: form.city,
          state: form.state,
          totalArea: Number(form.totalArea),
          arableArea: Number(form.arableArea),
          vegetationArea: Number(form.vegetationArea),
          crops: form.crops.map((crop) => ({
            type: crop.type,
            harvestYear: crop.harvestYear,
            area: 0,
          })),
        },
      ],
    };

    addProducer(newProducer);
    alert("Produtor adicionado com sucesso");

    // Resetar formulário
    setForm({
      documentType: "CPF",
      document: "",
      name: "",
      farmName: "",
      city: "",
      state: "",
      totalArea: 0,
      arableArea: 0,
      vegetationArea: 0,
      crops: [],
    });
  };

  const addCrop = () => {
    if (currentCrop.type && currentCrop.harvestYear) {
      setForm((prev) => ({
        ...prev,
        crops: [...prev.crops, currentCrop],
      }));
      setCurrentCrop({
        type: "",
        harvestYear: new Date().getFullYear().toString(),
      });
    }
  };

  const removeCrop = (index: number) => {
    setForm((prev) => ({
      ...prev,
      crops: prev.crops.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formData}>
        <h2>Cadastrar Produtor Rural</h2>

        <div className={styles.formInput}>
          <label>
            Tipo de Documento:
            <select
              value={form.documentType}
              onChange={(e) =>
                setForm({
                  ...form,
                  documentType: e.target.value as "CPF" | "CNPJ",
                })
              }
              required
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>
          </label>
        </div>

        <div className={styles.formInput}>
          <label>
            Documento:
            <input
              type="text"
              value={form.document}
              onChange={(e) =>
                setForm({
                  ...form,
                  document: e.target.value.replace(/\D/g, ""),
                })
              }
              required
            />
          </label>
        </div>

        <div className={styles.formInput}>
          <label>
            Nome do Produtor:
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
        </div>

        <div className={styles.formInput}>
          <label>
            Nome da Fazenda:
            <input
              type="text"
              value={form.farmName}
              onChange={(e) => setForm({ ...form, farmName: e.target.value })}
              required
            />
          </label>
        </div>

        <div className={styles.formInput}>
          <label>
            Cidade:
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
          </label>
        </div>

        <div className={styles.formInput}>
          <label>
            Estado:
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              required
            >
              <option value="">Selecione</option>
              <option value="SP">São Paulo</option>
              <option value="MG">Minas Gerais</option>
              {/* Adicione outros estados */}
            </select>
          </label>
        </div>

        <div className={styles.formInput}>
          <label>
            Área Total (ha):
            <input
              type="number"
              value={form.totalArea === 0 ? "" : form.totalArea}
              onChange={(e) => {
                const value = e.target.value;
                setForm({
                  ...form,
                  totalArea: value === "" ? 0 : Number(value),
                });
              }}
              required
            />
          </label>
        </div>

        <div className={styles.formInput}>
          <label>
            Área Agricultável (ha):
            <input
              type="number"
              value={form.arableArea === 0 ? "" : form.arableArea}
              onChange={(e) => {
                const value = e.target.value;
                setForm({
                  ...form,
                  arableArea: value === "" ? 0 : parseFloat(value) || 0,
                });
              }}
              step="0.01"
              min="0"
              required
            />
          </label>
        </div>

        <div className={styles.formInput}>
  <label>
    Área de Vegetação (ha):
    <input
      type="number"
      value={form.vegetationArea || ''}
      onChange={(e) => {
        const value = e.target.value;
        setForm({
          ...form,
          vegetationArea: value === '' ? 0 : parseFloat(value)
        });
      }}
      min="0"
      step="0.01"
      required
    />
  </label>
</div>

        <div className={styles.formInput}>
          <h3>Culturas Plantadas</h3>
          <div
            style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}
          >
            <select
              value={currentCrop.type}
              onChange={(e) =>
                setCurrentCrop({ ...currentCrop, type: e.target.value })
              }
            >
              <option value="">Selecione a cultura</option>
              <option value="Soja">Soja</option>
              <option value="Milho">Milho</option>
              <option value="Café">Café</option>
              <option value="Cana">Cana-de-Açúcar</option>
            </select>
            <input
              type="text"
              value={currentCrop.harvestYear}
              onChange={(e) =>
                setCurrentCrop({ ...currentCrop, harvestYear: e.target.value })
              }
              placeholder="Ano da safra"
            />
            <button type="button" onClick={addCrop}>
              Adicionar
            </button>
          </div>
          <ul>
            {form.crops.map((crop, index) => (
              <li key={index}>
                {crop.type} - {crop.harvestYear}
                <button type="button" onClick={() => removeCrop(index)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Cadastrar Produtor</button>
      </div>
    </form>
  );
};

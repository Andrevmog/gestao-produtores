import { useProducers } from "../../../contexts/ProducersContext";
import styles from "./Dashboard.module.scss";
import { PieChartComponent } from "./../../utils/PieChart";

export const Dashboard = () => {
  const { totalFarms, totalArea, statesData, cropsData } = useProducers();

  const statesChartData = statesData.map((item) => ({
    name: item.state,
    value: item.count,
  }));

  const cropsChartData = cropsData.map((item) => ({
    name: item.crop,
    value: item.count,
  }));

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>

      <div
        className={styles.infos}
      >
        <div
          className={styles.info}
        >
          <h3>Total de Fazendas</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{totalFarms}</p>
        </div>

        <div
          className={styles.info}
        >
          <h3>Área Total</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {totalArea.toLocaleString()} ha
          </p>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chart}>
          <PieChartComponent
            data={statesChartData}
            title="Distribuição por Estado"
          />
        </div>

        <div className={styles.chart}>
          <PieChartComponent data={cropsChartData} title="Culturas Plantadas" />
        </div>
      </div>
    </div>
  );
};

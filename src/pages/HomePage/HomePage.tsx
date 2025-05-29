import { ProducerForm } from "../../components/organisms/ProducerForm/ProducerForm";
import { ProducerList } from "../../components/organisms/ProducerList/ProducerList";
import { Dashboard } from "../../components/organisms/Dashboard/Dashboard";
import { useState } from "react";
import {Text} from "../../components/atoms/Typography"
import styles from './HomePage.module.scss';

export const Home = () => {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className={styles.container}>
      <Text variant="large">Gestão de Produtores Rurais</Text>
      <div className={styles.tabButtons}>
        <button 
          onClick={() => setActiveTab("form")}
          className={activeTab === "form" ? styles.active  : styles.tabButton}
        >
          Formulário
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={activeTab === "dashboard" ? styles.active : styles.tabButton}
        >
          Dashboard
        </button>
      </div>

      <div
        className={styles.content}
      >
        {activeTab === "form" ? (
          <ProducerForm />
        ) : (
          <div>
            <Dashboard />
            <ProducerList />
          </div>
        )}
      </div>
    </div>
  );
};

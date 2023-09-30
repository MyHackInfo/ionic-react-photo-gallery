import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useEffect } from "react";

import useStore from "../store/store";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import UserProfile from "../components/UserProfile";

const Tab1: React.FC = () => {
  const { data, banksIds, error, getData, geDatatById, getBanks } = useStore();

  const updateData = (id: number) => {
    geDatatById("https://brasilapi.com.br/api/banks/v1", id);
  };
  useEffect(() => {
    getData("https://brasilapi.com.br/api/banks/v1/1");
    getBanks("https://brasilapi.com.br/api/banks/v1");
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Get Data Based on Select value</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonRow>
          <IonList>
            {data?.code ? (
              <IonItem>
                <h6>{data?.fullName}</h6>
              </IonItem>
            ) : data?.message ? (
              <IonItem>
                <h6>{data?.message}</h6>
              </IonItem>
            ) : (
              ""
            )}
          </IonList>
        </IonRow>
        <IonRow>
          <IonSelect
            label="Default label"
            placeholder="Select Bank Id"
            interface="action-sheet"
            onIonChange={(e) => updateData(e.target.value)}
          >
            {banksIds?.map((bankId) => {
              return (
                <IonSelectOption key={bankId} value={bankId}>
                  Bank {bankId}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonRow>

        <UserProfile />
        <LoginButton />
        <LogoutButton />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

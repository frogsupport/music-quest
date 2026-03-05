import { useSetAccessToken } from "../../hooks/useSetAccessToken";
import "./Auth.css";
import { useNavigateToLoginOnTimeout } from "../../hooks/useNavigateToLoginOnTimeout";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

const threeSeconds = 3 * 1000;

export default function Auth() {
  useSetAccessToken();
  useNavigateToLoginOnTimeout({ delay: threeSeconds });

  return <LoadingScreen />;
}

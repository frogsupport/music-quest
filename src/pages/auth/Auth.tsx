import { Spinner } from "../../components/spinner/Spinner";
import { useSetAccessToken } from "../../hooks/useSetAccessToken";
import "./Auth.css";
import { useNavigateToLoginOnTimeout } from "../../hooks/useNavigateToLoginOnTimeout";

const threeSeconds = 3 * 1000;

export default function Auth() {
  useSetAccessToken();
  useNavigateToLoginOnTimeout({ delay: threeSeconds });

  return (
    <div>
      <div className="auth">
        <Spinner size={120} />
      </div>
    </div>
  );
}

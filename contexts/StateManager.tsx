import ModalContext from "./ModalContext";
import SearchBarContext from "./SearchBarContext";

interface StateManagerProps {
  children: React.ReactNode;
}

const StateManager = ({ children }: StateManagerProps) => {
  return (
    <SearchBarContext>
      <ModalContext>{children}</ModalContext>
    </SearchBarContext>
  );
};

export default StateManager;

import SearchBarContext from "./SearchBarContext";

interface StateManagerProps {
  children: React.ReactNode;
}

const StateManager = ({ children }: StateManagerProps) => {
  return <SearchBarContext>{children}</SearchBarContext>;
};

export default StateManager;

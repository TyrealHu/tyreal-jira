import { IdSelect } from "./id-select";
import { useUsers } from "../screens/project-list/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};

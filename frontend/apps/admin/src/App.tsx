import { AdminContent, AdminFooter, AdminHeader, AdminWrapper } from "./styled";

const AdminApp = () => {
  return (
    <AdminWrapper>
      <AdminHeader>Admin application test</AdminHeader>
      <AdminContent>
        Admin panel shares footer with main app. 
        Auto reload ensures that components can be modified in real time.
        Components can be versioned. 
        This solution adheres to separation of concerns principles, ensures granuality 
        and makes it possible for a whole team to work independly on the project 

      </AdminContent>
      <AdminFooter />
    </AdminWrapper>
  );
};

export default AdminApp;

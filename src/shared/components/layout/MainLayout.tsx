import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed header with full width background */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </div>

      {/* Main content with max-width */}
      <main className="flex-1 mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

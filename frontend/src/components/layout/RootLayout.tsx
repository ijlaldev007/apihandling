import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">API Handling Project</h1>
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:underline">
                    Products API
                  </Link>
                </li>
                {/* Add more API links here as they are implemented */}
                <li>
                  <Link to="/hierarchical" className="hover:underline">
                    Hierarchical API
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:underline">
                    Events API
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          API Handling Learning Project &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

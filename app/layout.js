
import "./globals.css";


import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
      <Navbar className="sticky top-0 z-50"></Navbar>


       <div className="py-9 flex">
          
          <Sidebar />
          <main className="ml-60 flex-1 px-6">


        {children}
          </main>

        </div>
      </body>
    </html>
  );
}

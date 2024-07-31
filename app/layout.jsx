"use client";
import "public/style/globals.scss";
import dynamic from 'next/dynamic'
const AuthWrapper = dynamic(() => import("protectedRouting"), { ssr: false });
import { Provider } from "react-redux";
import { store } from "services/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthWrapper>{children}</AuthWrapper>
        </Provider>
      </body>
    </html>
  );
}

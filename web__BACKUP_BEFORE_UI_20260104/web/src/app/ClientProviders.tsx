"use client";

import {NextIntlClientProvider} from "next-intl";
import type {ReactNode} from "react";

export default function ClientProviders({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

import Head from "next/head";

interface IProps {
  title?: string;
  description?: string;
  structuredData?: any;
}

export default function Meta({ title, description }: IProps) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
      />

      <title>{title || "stockspec"}</title>
      <meta
        name="description"
        content={description || "A live map of what is going on"}
      />
    </Head>
  );
}

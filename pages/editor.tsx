import Head from "next/head";
import Editor from "../components/Editor";
import { textContent } from "../constants";

export default function App() {
  return (
    <>
      <Head>
        <title>{textContent.app.title}</title>
      </Head>
      <div className="w-full">
          <Editor />
      </div>
    </>
  );
}

import Head from "next/head";
import Editor from "../components/Editor";
import { textContent } from "../constants";
import { EditorProvider } from "../contexts/editor";

export default function App() {
  return (
    <>
      <Head>
        <title>{textContent.app.title}</title>
      </Head>
      <div className="w-full">
        <EditorProvider>
          <Editor />
        </EditorProvider>
      </div>
    </>
  );
}

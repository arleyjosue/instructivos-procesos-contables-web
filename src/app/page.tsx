import { getInstructivos } from "../services/getInstructivos";
import { ContentPage } from "../components/ContentPage";

export default async  function Home() {


  const instructivos = await getInstructivos();
  console.log(instructivos.map((block) => block.body.map((child) => child.children?.map((grandchild) => grandchild)).join("\n")).join("\n"));
  return (
    <>
    <ContentPage content={instructivos}/>
    </>
  );
}

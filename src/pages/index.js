import { Discover } from '../components';
import fs from 'fs/promises';
import path from 'path';

function App(props) {
  const {data} = props;

  return (
    <Discover data= {data}/>
  )
}

export default App;

export async function getStaticProps() {

  const filePath = path.join(process.cwd(),'public', 'db' , 'music_db.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return{
    props: {
      data: data.results
    }
  }
}